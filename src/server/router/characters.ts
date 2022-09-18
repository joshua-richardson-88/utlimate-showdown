import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { upload } from '../../utils/cloudinary'
import { createRouter } from './context'

const Style = z.enum(['defender', 'striker', 'leader', 'controller'])
const CreateCharacterSchema = z.object({
  name: z.string(),
  isHero: z.boolean().default(true),
  style_1: Style,
  style_2: Style,
  health: z.number().min(1),
  image_back: z.string(),
  icon: z.string(),
  bg_color: z.string(),
  bg_border: z.string(),
})

export const characterRouter = createRouter()
  .query('getAll', {
    resolve: async ({ ctx }) =>
      await ctx.prisma.character.findMany({ orderBy: { name: 'asc' } }),
  })
  .mutation('addNew', {
    input: CreateCharacterSchema,
    resolve: async ({ ctx, input }) => {
      const imageToLoad = input.image_back
      const iconToLoad = input.icon

      const image = await upload(imageToLoad)
      const icon = await upload(iconToLoad)

      if (image == null || icon == null)
        throw new TRPCError({
          message: 'Unable to upload images',
          code: 'BAD_REQUEST',
        })

      const newChar = await ctx.prisma.character.create({
        data: { ...input, image_back: image, icon: icon },
      })
      return newChar
    },
  })
