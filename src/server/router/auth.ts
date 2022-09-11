import { createRouter } from './context'
import { z } from 'zod'
import { TRPCError } from '@trpc/server'

export const authRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.isAuthenticated) {
      const token = ctx.req?.cookies['psg_auth_token']
      if (token == null)
        throw new TRPCError({ message: 'no cookie found', code: 'FORBIDDEN' })

      const id = await ctx.passage.validAuthToken(token)
      if (id == null)
        throw new TRPCError({ message: 'not authenticated', code: 'FORBIDDEN' })

      return next({
        ctx: {
          ...ctx,
          isAuthenticated: true,
          id,
        },
      })
    }
    return next()
  })
  .query('isAuthenticated', {
    resolve: async ({ ctx }) => ctx.isAuthenticated ?? false,
  })
  .query('getUserData', {
    async resolve({ ctx }) {
      if (!ctx.isAuthenticated)
        throw new TRPCError({ message: 'No user', code: 'FORBIDDEN' })
      if (ctx.id === '')
        throw new TRPCError({
          message: 'bad middleware',
          code: 'INTERNAL_SERVER_ERROR',
        })

      return await ctx.passage.user.get(ctx.id)
    },
  })
