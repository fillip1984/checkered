"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { api } from "~/trpc/react";
import { itemFormSchema, type ItemType } from "~/types";

export default function ItemPage({
  params,
}: {
  params: { id: string; itemId: string };
}) {
  const router = useRouter();
  const isNew = params.itemId === "new";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemType>({
    resolver: zodResolver(itemFormSchema),
  });

  const existingItem = api.item.readOne.useQuery(
    { id: params.id },
    { enabled: !!params.itemId && !isNew, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (!isNew && existingItem.data) {
      reset(existingItem.data as ItemType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingItem.data]);

  const utils = api.useUtils();
  const createItemMutator = api.item.create.useMutation({
    onSuccess: async () => {
      await utils.item.invalidate();
      router.push(`/lists/${params.id}`);
    },
  });

  const updateItemMutator = api.item.update.useMutation({
    onSuccess: async () => {
      await utils.item.invalidate();
      router.push(`/lists/${params.id}`);
    },
  });

  const deleteItemMutator = api.item.delete.useMutation({
    onSuccess: async () => {
      await utils.item.invalidate();
      router.push(`/lists/${params.id}`);
    },
  });

  const onSubmit: SubmitHandler<ItemType> = (formData) => {
    if (isNew) {
      createItemMutator.mutate({ ...formData, listId: params.id });
    } else {
      updateItemMutator.mutate(formData);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <label>
          Name
          <input type="text" {...register("name")} />
        </label>

        <label>
          Description
          <TextareaAutosize minRows={3} {...register("description")} />
        </label>

        <div className="buttons-container">
          <button type="submit" className="btn-primary">
            Save
          </button>
          <Link href={`/lists/${params.id}`} className="btn-secondary">
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => deleteItemMutator.mutate({ id: params.itemId })}
            className="btn-danger ml-auto">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
