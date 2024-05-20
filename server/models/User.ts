import mongoose from 'mongoose'
const { Schema } = mongoose

export type Session = { _id: string; createdAt: Date }
export interface UserSchema {
  nickname: string
  password: string
  email: string
  sessions: Session[]
}

export const userSchema = new Schema<UserSchema>(
  {
    nickname: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    sessions: {
      type: [
        {
          createdAt: { type: Date, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
)

const UserModel = mongoose.model('User', userSchema, 'users')
export default UserModel
