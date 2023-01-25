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
        (e: unknown) => console.error(e);
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
          orderBy: [
            {
              created_at: "desc",
            },
          ],
        });

        return response;
      } catch {
        (e: unknown) => console.error(e);
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
        (e: unknown) => console.error(e);
      }
    }),

  getUserByName: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user_data.findMany();
    } catch {
      (e: unknown) => console.error(e);
    }
  }),
  userJoinsTournament: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        tournamentId: z.string(),
        notificationId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.users_on_tournament.create({
          data: {
            userId: input.userId,
            tournamentId: input.tournamentId,
            userStatus: "Picking",
          },
        });
        await ctx.prisma.user_notifications.update({
          where: {
            id: input.notificationId,
          },
          data: {
            isNew: false,
          },
        });
        return;
      } catch {
        (e: unknown) => console.error(e);
      }
    }),

  sendInviteToUsers: publicProcedure
    .input(
      z.object({
        users: z.string().array(),
        tournamentId: z.string(),
        sentFromUser: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.user_notifications.createMany({
          data: input.users.map((user) => {
            return {
              type: "Invite",
              sentFromUser: input.sentFromUser,
              sentToUser: user,
              tournamentId: input.tournamentId,
              isNew: true,
            };
          }),
        });
      } catch {
        (e: unknown) => console.error(e);
      }
    }),

  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.user_data.findMany({});
    } catch {
      (e: unknown) => console.error(e);
    }
  }),

  getRecommendedUsersForInvite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const findTournaments = await ctx.prisma.users_on_tournament.findMany({
          where: {
            userId: input.userId,
          },
        });

        if (!findTournaments) return;

        return await ctx.prisma.users_on_tournament.findMany({
          where: {
            AND: [
              {
                tournamentId: {
                  in: findTournaments.map(
                    (tournament) => tournament.tournamentId
                  ),
                },
              },
              { userId: { not: input.userId } },
            ],
          },
          distinct: ["userId"],
          include: {
            user_data: true,
            tournaments: true,
          },
          orderBy: [
            {
              created_at: "desc",
            },
          ],
          take: 4,
        });
      } catch {
        (e: unknown) => console.error(e);
      }
    }),

  removeUserFromTournament: publicProcedure
    .input(
      z.object({
        userOnTournamentId: z.bigint(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.users_on_tournament.delete({
          where: { id: BigInt(input.userOnTournamentId) },
        });
      } catch {
        (e: unknown) => console.error(e);
      }
    }),
});
