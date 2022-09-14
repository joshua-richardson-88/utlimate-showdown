import { createRouter } from './context'

export const characterRouter = createRouter().query('getAll', {
  resolve: async ({ ctx }) =>
    await ctx.prisma.character.findMany({
      select: {
        id: true,
        name: true,
        type: true,
        health: true,
        icon: true,
        bg_border: true,
        bg_color: true,
      },
      orderBy: { name: 'asc' },
    }),
})
