import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const usersRouter = router({
  getUsersOnTournament: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.tournamentId.length) return;

        const response = ctx.prisma.users_on_tournament.findMany({
          where: {
            tournamentId: input.tournamentId,
          },
          include: {
            user_data: true,
            tournaments: true,
          },
        });

        return response;
      } catch {
        (e: any) => console.error(e);
      }
    }),

  getTournamentsByUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.userId.length) return;

        const response = ctx.prisma.users_on_tournament.findMany({
          where: {
            userId: input.userId,
          },
          include: {
            tournaments: {
              include: { tournament_types: true },
            },
          },
        });

        return response;
      } catch {
        (e: any) => console.error(e);
      }
    }),
});
