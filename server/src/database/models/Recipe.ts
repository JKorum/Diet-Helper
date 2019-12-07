import mongoose, { Document } from 'mongoose'

export interface RecipeDocument extends Document {
  owner: any
  label: string
  image: string
  source: string
  url: string
  yield: number
  dietLabels: string[]
  healthLabels: string[]
  cautions: string[]
  ingredientLines: string[]
  calories: number
  totalWeight: number
  totalTime: number
}

const RecipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    yield: {
      type: Number,
      required: true
    },
    dietLabels: {
      type: [String],
      required: true
    },
    healthLabels: {
      type: [String],
      required: true
    },
    cautions: {
      type: [String],
      required: true
    },
    ingredientLines: {
      type: [String],
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    totalWeight: {
      type: Number,
      required: true
    },
    totalTime: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const Recipe = mongoose.model<RecipeDocument>('Recipe', RecipeSchema)
