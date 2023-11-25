import { Request, Response } from 'express';
import { UserServices } from './User.service';
import UserValidationSchema from './User.validation';
import UpdateUserInfoValidationSchema from './UpdatedUserData.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const data = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDb(data);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'User not created please check your input',
      data: error,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDb();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something want wrong',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDb(userId);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Users fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userInfo = req.body;

    //VALIDATE UPDATED USER INFO USING ZOD
    const validateUpdateUserInfo =
      UpdateUserInfoValidationSchema.parse(userInfo);

    const result = await UserServices.UpdateUserIntoDb(
      userId,
      validateUpdateUserInfo,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Users Updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDb(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const addOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderInfo = req.body;
    await UserServices.addOrderIntoDb(userId, orderInfo);
    res.status(200).json({
      message: {
        success: true,
        message: 'Order created successfully!',
        data: null,
      },
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result: any = await UserServices.getUserAllOrders(userId);
    if (result) {
      res.status(200).json({
        message: {
          success: true,
          message: 'Order created successfully!',
          data: result,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

const totalOrdersPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result: any = await UserServices.getTotalPriceOfOrders(userId);
    if (result) {
      res.status(200).json({
        message: {
          success: true,
          message: 'Order created successfully!',
          data: result,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addOrder,
  getOrders,
  totalOrdersPrice,
};
