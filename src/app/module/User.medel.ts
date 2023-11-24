import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './User.interface';

const FullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First Name is required'] },
  lastName: { type: String, required: [true, 'Last Name is required'] },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'] },
  city: { type: String, required: [true, 'City is required'] },
  country: { type: String, required: [true, 'Country is required'] },
});

const OrderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
  },
  price: { type: Number, required: [true, 'Product Price is required'] },
  quantity: { type: Number, required: [true, 'Product Quantity is required'] },
});

const UserSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, 'User User ID is required'] },
  username: { type: String, required: [true, 'User Username is required'] },
  password: { type: String, required: [true, 'User Password is required'] },
  fullName: {
    type: FullNameSchema,
    required: [true, 'User Full Name is required'],
  },
  age: { type: Number, required: [true, 'User Age is required'] },
  email: { type: String, required: [true, 'User Email is required'] },
  isActive: {
    type: Boolean,
    required: [true, 'User IsActive is required'],
    default: false,
  },
  hobbies: { type: [String], required: [true, 'User Hobbies is required'] },
  address: {
    type: AddressSchema,
    required: [true, 'User Address is required'],
  },
  orders: OrderSchema,
});

export const UserModel = model<TUser>('User', UserSchema);
