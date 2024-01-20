export const formattedDate = (date) => {
    const formattedDate = new Date(date)
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1;
    const day = formattedDate.getDate();
  
    return `${day}/${month}/${year}`

}

export const formattedDateAndTime = (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  const hour = formattedDate.getHours();
  const minute = formattedDate.getMinutes();
  const second = formattedDate.getSeconds();

  return `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
};

  
