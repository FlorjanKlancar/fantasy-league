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

        return ctx.prisma.users_on_tournament.findMany({
          where: {
            tournamentId: input.tournamentId,
          },
          include: {
            user_data: true,
            tournaments: true,
          },
        });
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
    .query(async ({ ctx, input }) => {
      try {
        if (!input.userId.length) return;

        const response = await ctx.prisma.users_on_tournament.findMany({
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

  toggleUserPickStatus: publicProcedure
    .input(
      z.object({
        userOnTournamentId: z.bigint(),
        userStatus: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.users_on_tournament.update({
          where: {
            id: input.userOnTournamentId,
          },
          data: {
            userStatus: input.userStatus,
          },
        });
      } catch {
        (e: any) => console.error(e);
      }
    }),

  getUserByName: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user_data.findMany();
    } catch {
      (e: any) => console.error(e);
    }
  }),
});
