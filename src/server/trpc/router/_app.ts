import { router } from "../trpc";
import { lecRouter } from "./lecRouter";
import { notificationsRouter } from "./notifications";
import { tenisRouter } from "./tenis";
import { tournamentRouter } from "./tournament";
import { usersRouter } from "./users";

export const appRouter = router({
  tournament: tournamentRouter,
  lec: lecRouter,
  users: usersRouter,
  notifications: notificationsRouter,
  tenis: tenisRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
