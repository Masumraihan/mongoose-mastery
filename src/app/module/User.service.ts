import { TOrders, TUpdateUserInfo, TUser } from './User.interface';
import { UserModel } from './User.medel';

const createUserIntoDb = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await UserModel.find().select({
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    address: 1,
  });
  return result;
};

const getSingleUserFromDb = async (userId: string) => {
  const result = await UserModel.findOne({ userId }, { password: 0 });
  return result;
};

const UpdateUserIntoDb = async (userId: string, userInfo: TUpdateUserInfo) => {
  const result = await UserModel.findOneAndUpdate({ userId }, userInfo, {
    returnOriginal: false,
  });
  return result;
};

const deleteUserFromDb = async (userId: string) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const addOrderIntoDb = async (userId: string, orderInfo: TOrders) => {

  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { orders: orderInfo } },
  );
  return result;
};

const getUserAllOrders = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: Number(userId) } },
    { $unwind: '$orders' },
    { $project: { orders: 1 } },
  ]);
  return result;
};

const getTotalPriceOfOrders = async (userId: string) => {
  const result = await UserModel.aggregate([
    { $match: { userId: Number(userId) } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0 } },
  ]);
  return result[0];
};

export const UserServices = {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  UpdateUserIntoDb,
  deleteUserFromDb,
  addOrderIntoDb,
  getUserAllOrders,
  getTotalPriceOfOrders,
};
