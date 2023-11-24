import { TUser } from './User.interface';
import { UserModel } from './User.medel';

const createUserIntoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};
export const UserServices = {
  createUserIntoDb,
};
