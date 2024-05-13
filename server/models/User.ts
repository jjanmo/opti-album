import mongoose from 'mongoose'
const { Schema } = mongoose

export interface UserSchema {
  nickname: string
  password: string
  email: string
}

export const userSchema = new Schema<UserSchema>(
  {
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema, 'users')
export default UserModel
