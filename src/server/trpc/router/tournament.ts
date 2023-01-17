import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { TournamentFormSchema } from "../../../types/tournamentFormTypes";
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

        return ctx.prisma.tournaments.findFirst({
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

  createNewTournament: publicProcedure
    .input(TournamentFormSchema.extend({ tournamentOwnerId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const tournament = await ctx.prisma.tournaments.create({
          data: {
            name: input.tournamentName,
            description: input.tournamentDescription,
            lockInDate: input.tournamentEndDate,
            typeId: input.tournamentType,
            tournamentOwner: input.tournamentOwnerId,
          },
        });

        if (!tournament) {
          throw new Error("Creating tournament failed!");
        }

        await ctx.prisma.users_on_tournament.create({
          data: {
            userId: input.tournamentOwnerId,
            tournamentId: tournament.id,
            userStatus: "Picking",
          },
        });

        return tournament;
      } catch {
        (e: unknown) => console.error(e);
      }
    }),

  deleteTournament: publicProcedure
    .input(
      z.object({
        tournamentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.users_on_tournament.deleteMany({
          where: { tournamentId: input.tournamentId },
        });

        await ctx.prisma.user_notifications.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        });

        await ctx.prisma.users_LEC_predictions.deleteMany({
          where: {
            tournamentId: input.tournamentId,
          },
        });

        await ctx.prisma.tournaments.delete({
          where: {
            id: input.tournamentId,
          },
        });

        return true;
      } catch {
        (e: unknown) => console.error(e);
      }
    }),
});
