import { router } from "../trpc";
import { lecRouter } from "./lecRouter";
import { tournamentRouter } from "./tournamentRouter";
import { usersRouter } from "./users";

export const appRouter = router({
  tournament: tournamentRouter,
  lec: lecRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
