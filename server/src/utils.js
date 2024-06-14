const renameIdToUserId = (userInfo) => {
  if (userInfo) {
    const user = { userId: userInfo._id, ...userInfo };
    delete user._id;
    return user;
  }
};

module.exports = {
  renameIdToUserId,
};