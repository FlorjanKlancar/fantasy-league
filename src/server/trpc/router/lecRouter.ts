import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const lecRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.lEC_teams.findMany();
  }),
  getById: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    return ctx.prisma.lEC_teams.findFirst({
      where: {
        id: input,
      },
    });
  }),
  submitLECTournamentPrediction: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        userId: z.string(),
        predictions: z.array(
          z.object({ id: z.number(), teamId: z.bigint(), teamName: z.string() })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      function toJson(data: unknown) {
        return JSON.stringify(data, (_, v) =>
          typeof v === "bigint" ? `${v}n` : v
        ).replace(/"(-?\d+)n"/g, (_, a) => a);
      }
      const response = await ctx.prisma.users_LEC_predictions.create({
        data: {
          tournamentId: input.tournamentId,
          userId: input.userId,
          prediction: toJson(input.predictions),
        },
      });

      return response;
    }),
});
