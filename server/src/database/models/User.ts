import mongoose, { Document } from 'mongoose'
import bcrypt from 'bcryptjs'
import chalk from 'chalk'

interface UserDocument extends Document {
  name: string
  email: string
  password: string
}

export interface QueriedUserDocument extends Document {
  name?: string
  email?: string
  password?: string
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

UserSchema.pre<UserDocument>('save', async function() {
  const salt = process.env.SALT
  if (!salt) {
    throw new Error(chalk.black.bgRed('env variable SALT inaccessible'))
  } else if (typeof salt === 'string') {
    const saltNum = +salt
    if (Number.isInteger(saltNum)) {
      const user = this
      const hash = await bcrypt.hash(user.password, saltNum)
      user.password = hash
    } else {
      throw new Error(chalk.black.bgRed('env variable SALT invalid value'))
    }
  }
})

export const User = mongoose.model<UserDocument>('User', UserSchema)
