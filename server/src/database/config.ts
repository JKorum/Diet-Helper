import mongoose from 'mongoose'
import chalk from 'chalk'

const connect = async (url: string, mode: string): Promise<void> => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log(chalk.black.bgGreen(`Connected to Database: ${mode}`))
  } catch (err) {
    console.log(chalk.black.bgRed('Failed to connect to Database'))
    process.exit(1)
  }
}

if (process.env.NODE === 'production') {
  const url = process.env.DB_URL_PROD
  if (!url) {
    console.log(chalk.black.bgRed('env variable DB_URL_PROD inaccessible'))
    process.exit(1)
  }
  if (typeof url === 'string') {
    connect(url, 'production')
  }
} else {
  const url = process.env.DB_URL_DEV
  if (!url) {
    console.log(chalk.black.bgRed('env variable DB_URL_DEV inaccessible'))
    process.exit(1)
  }
  if (typeof url === 'string') {
    connect(url, 'development')
  }
}
