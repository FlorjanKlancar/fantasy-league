import { TRPCError } from "@trpc/server";
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
          include: {
            users_on_tournament: {
              include: {
                user_data: true,
              },
            },
          },
        });

        return response;
      } catch {
        (e: unknown) => console.error(e);
      }
    }),
  getTournamentTypes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.tournament_types.findMany();
  }),

  checkTournamentName: publicProcedure
    .input(
      z.object({
        tournamentName: z.string().min(3).max(20),
      })
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.tournamentName.length) return;

        return ctx.prisma.tournaments.count({
          where: {
            name: {
              contains: input.tournamentName,
            },
          },
        });
      } catch {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "Could not find tournament for provided id, please try again.",
        });
      }
    }),
});
