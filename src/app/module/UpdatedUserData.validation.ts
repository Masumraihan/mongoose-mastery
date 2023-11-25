import { z } from 'zod';
import {
  AddressValidationSchema,
  FullNameValidationSchema,
} from './User.validation';

const UpdateUserInfoValidationSchema = z.object({
  userId: z.number().min(1),
  username: z.string().min(1),
  fullName: FullNameValidationSchema,
  age: z.number().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
});

export default UpdateUserInfoValidationSchema;
