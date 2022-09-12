import { TRPCError } from '@trpc/server'
import { createRouter } from './context'

export const characterRouter = createRouter().query('getAll', {
  resolve: async ({ ctx }) => {
    const dbChars = await ctx.prisma.character.findMany({
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
    })
    if (dbChars == null) return []

    return dbChars.map((char) => ({
      ...char,
      icon: `bg-[url(${char.icon})]`,
      bg_border: `border-${char.bg_border}`,
      bg_color: `bg-${char.bg_color}`,
    }))
  },
})
