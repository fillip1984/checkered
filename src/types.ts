import { z } from "zod";

export const itemFormSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(2),
  description: z.string().min(2),
  progressType: z.string().min(1, { message: "Field is required" }),
  nextDue: z.string(),
  interval: z.string().min(1, { message: "Field is required" }),
  everyXDays: z.number().nullish(),
  listId: z.string().nullish(),
});

export type ItemType = z.infer<typeof itemFormSchema>;

export const listFormSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(2),
  description: z.string().min(2),
  items: z.array(itemFormSchema).nullish(),
  _count: z
    .object({
      items: z.number(),
    })
    .nullish(),
});

export type ListType = z.infer<typeof listFormSchema>;
