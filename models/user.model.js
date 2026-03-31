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

/**
 *   This is going to be an instance method for the user, to compare a password
 *    with the stored encypted password.
 * @param {*} plainPassword  -> input password given by the user in sign in request.
 * @returns  boolean denoting wheather passwords are same or not.
 */
UserSchema.methods.isValidPassword = async function (plainPassword) {
  const currentUser = this;
  const compare = await bcrypt.compare(plainPassword, currentUser.password);
  return compare;
};

export const User = mongoose.model('User', UserSchema);
