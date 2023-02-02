import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const tenisRouter = router({
  getAllTenisPlayers: publicProcedure
    .input(
      z.object({
        maxPlayers: z.number().nullish(),
      })
    )
    .query(({ ctx, input }) => {
      try {
        return ctx.prisma.tenis_players.findMany({
          orderBy: [
            {
              rank: "asc",
            },
          ],
          ...(input.maxPlayers && { take: input.maxPlayers }),
        });
      } catch {
        (e: unknown) => console.error(e);
      }
    }),
});
