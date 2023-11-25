import { TUser } from './User.interface';
import { UserModel } from './User.medel';

const createUserIntoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId });
  return result;
};

const UpdateUserIntoDb = async (userId: string, userInfo: TUser) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userInfo, {
    returnOriginal: false,
  });
  return result;
};

const deleteUserFromDb = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  UpdateUserIntoDb,
  deleteUserFromDb,
};
