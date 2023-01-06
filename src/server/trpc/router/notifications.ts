import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const notificationsRouter = router({
  getAllNotificationsForUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        if (!input.userId.length) return;

        return ctx.prisma.user_notifications.findMany({
          where: { sentToUser: input.userId },
          include: {
            user_data_user_notifications_sentFromUserTouser_data: true,
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

  markAllAsRead: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        if (!input.userId.length) return;

        return await ctx.prisma.user_notifications.updateMany({
          where: {
            sentToUser: input.userId,
          },
          data: {
            isNew: false,
          },
        });
      } catch {
        (e: unknown) => console.error(e);
      }
    }),
});
