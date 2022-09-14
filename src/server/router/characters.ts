import { createRouter } from './context'

export const characterRouter = createRouter().query('getAll', {
  resolve: async ({ ctx }) =>
    await ctx.prisma.character.findMany({ orderBy: { name: 'asc' } }),
})
