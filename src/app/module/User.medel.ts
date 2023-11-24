import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser } from './User.interface';

const FullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
  },
});

const AddressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street is required'], trim: true },
  city: { type: String, required: [true, 'City is required'], trim: true },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

const OrderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    required: [true, 'Product Name is required'],
    trim: true,
  },
  price: { type: Number, required: [true, 'Product Price is required'] },
  quantity: { type: Number, required: [true, 'Product Quantity is required'] },
});

const UserSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User User ID is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User Username is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    trim: true,
  },
  fullName: {
    type: FullNameSchema,
    required: [true, 'User Full Name is required'],
    trim: true,
  },
  age: { type: Number, required: [true, 'User Age is required'] },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    trim: true,
  },
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
  orders: [OrderSchema],
});

export const UserModel = model<TUser>('User', UserSchema);
