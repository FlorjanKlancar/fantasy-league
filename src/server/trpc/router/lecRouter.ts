import { TRPCError } from "@trpc/server";
import dayjs from "dayjs";
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
        userOnTournamentId: z.bigint(),
        predictionId: z.bigint().nullish(),
        tournamentLockInDate: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      function toJson(data: unknown) {
        return JSON.stringify(data, (_, v) =>
          typeof v === "bigint" ? `${v}n` : v
        ).replace(/"(-?\d+)n"/g, (_, a) => a);
      }

      try {
        if (dayjs(input.tournamentLockInDate) < dayjs()) return;

        return await ctx.prisma.user_predictions.upsert({
          where: { id: input.predictionId ? input.predictionId : 0 },
          update: {
            prediction: toJson(input.predictions),
          },
          create: {
            tournamentId: input.tournamentId,
            userId: input.userId,
            prediction: toJson(input.predictions),
          },
        });
      } catch (e: unknown) {
        console.error(e);
        return;
      }
    }),
  getLECTournamentPredictionsForUser: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.userId || !input.tournamentId) return;

      try {
        return await ctx.prisma.user_predictions.findFirst({
          where: { userId: input.userId, tournamentId: input.tournamentId },
        });
      } catch (e: unknown) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find user for provided id, please try again.",
        });
      }
    }),
});
