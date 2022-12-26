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
});
