import { z } from "zod";

export const TournamentFormSchema = z.object({
  tournamentName: z
    .string()
    .min(3, { message: "Tournament name must be greater than 3 characters!" })
    .max(50, {
      message: "Tournament name must be smaller than 50 characters!",
    }),
  tournamentDescription: z
    .string()
    .max(100, {
      message: "Tournament description must be smaller than 100 characters!",
    })
    .nullable(),
  tournamentEndDate: z.preprocess(
    (a) => new Date(z.string().parse(a)),
    z.date().min(new Date(), { message: "Date should be older than today!" })
  ),
  tournamentType: z
    .number()
    .min(1, { message: "Please select Tournament Type!" }),
});
export type TournamentForm = z.infer<typeof TournamentFormSchema>;
