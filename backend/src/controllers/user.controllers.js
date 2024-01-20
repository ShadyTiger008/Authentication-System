import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

//Generate refresh and access token controller
const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong while generating access token and refresh token"
    );
  }
};

//Refresh access token controller
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingToken) {
      throw new ApiError(404, "Unauthorised request!");
    }

    const decodedToken = jwt.verify(
      incomingToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken._id);

    if (incomingToken !== user?.refreshToken) {
      throw new ApiError(400, "Refresh token is already used or expired!");
    }

    const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
      user?._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        ApiResponse(
          200,
          { accessToken: accessToken, refreshToken: refreshToken },
          "Succesfully refreshed the access token!"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token!");
  }
});

//User registration controller
const userRegistration = asyncHandler(async (req, res) => {
  const { name, email, password, occupation, bio } = req.body;

  if (
    [name, email, password, occupation].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required!");
  }

  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    throw new ApiError(400, "User already exists!");
  }

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  console.log(avatarLocalPath);

  const avatar = avatarLocalPath
    ? await uploadOnCloudinary(avatarLocalPath)
    : null;

  console.log(avatar);

  const user = await User.create({
    name,
    email,
    password,
    occupation,
    avatar: avatar?.url || "",
    bio
  });

  if (!user) {
    throw new ApiError(400, "User registration unsuccessful!");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: createdUser },
        "User registration successful!"
      )
    );
});

//User login controller
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  const correctPassword = user.isPasswordCorrect(password);

  if (!correctPassword) {
    throw new ApiError(403, "Password is incorrect!");
  }

  const { refreshToken, accessToken } = await generateRefreshAndAccessToken(
    user._id
  );

  console.log(refreshToken, accessToken);

  const loggedInUser = await User.findById(user._id).select(
    "-password"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser },
        "User logged in successfully!"
      )
    );
});

//User logout controller
const userLogout = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  await User.findByIdAndUpdate(
    userId,
    {
      $unset: {
        refreshToken: 1 ,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully!"));
});

// Get User by ID controller
const getUserById = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  
  if (!userId) {
    throw new ApiError(404, "No user ID provided!")
  }

  const user = await User.findById(userId).select("-password -refreshToken")

  if (!user) {
    throw new ApiError(403, "No User found!");
  }

  return res.status(200).json(new ApiResponse(200, {user: user}, "Successfully got the user!"))
})

const changeUserStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(405, "User not found!");
  }

  const updatedUser = await User.findByIdAndUpdate(user._id, { status }, { new: true }).select("-password -refreshToken")

  if (!updatedUser) {
    throw new ApiError(404, "Couldn't update user!");
  }
  
  return res.status(201).json(new ApiResponse(200, {updatedUser: updatedUser}, "User status updated successfully!"));
})

const getUserByNameOrEmail = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (name === "" && email === "") {
    throw new ApiError(400, "Name or email required!")
  }

  const user = await User.find({ $or: [ { name }, { email } ], _id: { $ne: req.user?._id } }).select("-password -refreshToken")
  
  res.status(200).json(new ApiResponse(200, {users: user}, "User fetched successfully!"))
  
})

const getAllUsers = asyncHandler(async (req, res) => {
  const {userId} = req.params
  const users = await User.find({ _id: { $ne: userId } }).select("-password -refreshToken")
  
  if (!users) {
    throw new ApiError(400, "No user found!");
  }

  res.status(200).json(new ApiResponse(200, {Allusers: users}, "Successflly got all users"))
})

const findUserWithStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { userId } = req.params;
  console.log("UserId: ",userId);

    if (status === "") {
      return res.status(400).json(new ApiResponse(400, "Invalid status!"));
    }

    const users = await User.find({ status, _id: { $ne: userId } }).select("-password -refreshToken");

    if (!users || users.length === 0) {
      return res.status(200).json(new ApiResponse(200, "No user found with this status!"));
    }

    return res.status(200).json(new ApiResponse(200, { FoundUsers: users }, "Found users successfully!"));
});


//Find user by created at controller
const findUserByCreatedAt = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  const { userId } = req.params;
  
  if (startDate === "" || endDate === "") {
    throw new ApiError(400, "No start date or end date provided!")
  }

  // if (isNaN(startDate) || isNaN(endDate)) {
  //   throw new ApiError(400, "Invalid start date or end date format!")
  // }

  const user = await User.find({
    createdAt:
    {
      $gt: new Date(startDate), $lt: new Date(endDate)
    },
    _id: {
      $ne: userId
    }
  })
    .select("-password -refreshToken")
  
  return res.status(200).json(new ApiResponse(200, { User: user }, "Found user successfully!"));
});

//Find User by last login time controller
const findUserByLastLogin = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.body;
  const { userId } = req.params;

  if (startDate === "" || endDate === "") {
    throw new ApiError(400, "No start date or end date specified!")
  }
  
  // if (isNaN(startDate) || isNaN(endDate)) {
  //   throw new ApiError(400, "Invalid start date or end date format!")
  // }

  const foundUsers = await User.find({
    updatedAt:
    {
      $gt: new Date(startDate), $lt: new Date(endDate)
    },
    _id: {
      $ne: userId
    }
  }).select("-password -refreshToken")

  return res.status(200).json(new ApiResponse(200, { Users: foundUsers }, "Found users succesfully!"))
});

export {
  generateRefreshAndAccessToken,
  refreshAccessToken,
  userRegistration,
  userLogin,
  userLogout,
  getUserById,
  changeUserStatus,
  getUserByNameOrEmail,
  getAllUsers,
  findUserWithStatus,
  findUserByCreatedAt,
  findUserByLastLogin,
};
