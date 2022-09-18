import { UploadApiOptions, v2 as cloudinary } from 'cloudinary'
import { env } from '../env/server.mjs'

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
})

export const upload = async (img: string) => {
  const options: UploadApiOptions = {
    format: 'webp',
  }

  try {
    const result = await cloudinary.uploader.upload(img, options)
    return result.secure_url
  } catch (error) {
    console.error(error)
  }
}
