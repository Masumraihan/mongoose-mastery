import { Request, Response } from 'express';
import { UserServices } from './User.service';

const createUser = async (req: Request, res: Response) => {
    const userData = req.body;
    try {
    const result = await UserServices.createUserIntoDb(userData);
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

export const UserControllers = {
  createUser,
};
