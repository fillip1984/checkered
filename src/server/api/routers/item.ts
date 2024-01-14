import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { itemFormSchema } from "~/types";

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.item.create({
        data: {
          name: input.name,
          description: input.description,
          listId: "1",
        },
      });
    }),
  readAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.item.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }),
  readOne: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.item.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  update: publicProcedure
    .input(itemFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Unable to update without id");
      }

      return ctx.db.item.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.item.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
