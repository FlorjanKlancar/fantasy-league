import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tournamentRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tournaments.findMany();
  }),
  getById: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.tournamentId.length) return;

        const response = ctx.prisma.tournaments.findFirst({
          where: {
            id: input?.tournamentId,
          },
        });

        return response;
      } catch {
        (e: any) => console.error(e);
      }
    }),
});
