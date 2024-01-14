import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { listFormSchema } from "~/types";

export const listRouter = createTRPCRouter({
  create: publicProcedure
    .input(listFormSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.list.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
  readAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.list.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        _count: { select: { items: true } },
      },
    });
  }),
  readOne: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ input, ctx }) => {
      return ctx.db.list.findUnique({
        where: {
          id: input.id,
        },
        include: {
          items: true,
        },
      });
    }),
  update: publicProcedure
    .input(listFormSchema)
    .mutation(async ({ ctx, input }) => {
      if (!input.id) {
        throw new Error("Unable to update without id");
      }

      return ctx.db.list.update({
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
      return ctx.db.list.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
