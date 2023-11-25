import { z } from 'zod';

export const FullNameValidationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

export const AddressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

export const OrderValidationSchema = z.object({
  productName: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().positive(),
});

const UserValidationSchema = z.object({
  userId: z.number().int().positive(),
  username: z.string().min(1),
  password: z.string().min(8),
  fullName: FullNameValidationSchema,
  age: z.number().int().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
