import User from "../models/user.js";
const userService = {};

userService.get = async (telegram_id) => {
  const user = await User.findOne({ telegram_id });
  if (!user) return 0;
  return user;
};

userService.update = async ({
  _id,
  name,
  email,
  favoritecoins,
  basecurrency,
}) => {
  if (!_id) throw new Error("id user undefine");

  const filter = { _id };
  const update = { name, email, favoritecoins, basecurrency };
  if (update.hasOwnProperty("favoritecoins")) {
    update.$addToSet = { favoritecoins: update.favoritecoins };
    delete update.favoritecoins;
  }
  const user = await User.findOneAndUpdate(filter, update, {
    new: true,
  }).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

userService.delete = async (user) => {

};

userService.changePassword = async ({ id, password, newPassword }) => {};

export default userService;
