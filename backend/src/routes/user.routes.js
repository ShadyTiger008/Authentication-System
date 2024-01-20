import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  changeUserStatus,
  findUserByCreatedAt,
  findUserByLastLogin,
  findUserWithStatus,
  getAllUsers,
  getUserById,
  getUserByNameOrEmail,
  userLogin,
  userLogout,
  userRegistration,
} from "../controllers/user.controllers.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  userRegistration
);

router.route("/login").post(userLogin);
router.route("/logout/:userId").get( userLogout);

//Update user status
router.route("/update-status").post( changeUserStatus)

//Get user by id route
router.route("/get-user/:userId").get( getUserById);

//Get User by name or email route
router.route("/get-user").post(getUserByNameOrEmail)

//Get all user route
router.route("/get-all-users/:userId").get(getAllUsers)

//Get user by status router
router.route("/users-status/:userId").post(findUserWithStatus)

//Get user by created at route
router.route("/created-at-user/:userId").post(findUserByCreatedAt)

//Get user by login time route
router.route("/login-at/:userId").post(findUserByLastLogin)

export default router;
