import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please enter valid email ',
      ],
      lowecase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    userRole: {
      type: String,
      required: true,
      default: 'CUSTOMER',
    },
    userStatus: {
      type: String,
      required: true,
      default: 'APPROVED',
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

export const User = mongoose.model('User', UserSchema);
