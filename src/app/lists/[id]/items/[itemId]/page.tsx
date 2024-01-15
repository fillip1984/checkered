"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
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
    watch,
  } = useForm<ItemType>({
    resolver: zodResolver(itemFormSchema),
  });

  const existingItem = api.item.readOne.useQuery(
    { id: params.itemId },
    { enabled: !!params.itemId && !isNew, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (!isNew && existingItem.data) {
      reset(existingItem.data as ItemType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingItem.data]);

  const utils = api.useUtils();
  const onSuccess = async () => {
    void utils.item.invalidate();
    router.push(`/lists/${params.id}`);
  };
  const createItemMutator = api.item.create.useMutation({
    onSuccess,
  });

  const updateItemMutator = api.item.update.useMutation({
    onSuccess,
  });

  const deleteItemMutator = api.item.delete.useMutation({
    onSuccess,
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

        <label>
          Progress Type
          <select {...register("progressType")}>
            <option value="">&lt;Please make a selection&gt;</option>
            <option value="Count down">Count down</option>
            <option value="Count up">Count up</option>
          </select>
        </label>

        {/* {watch("progressType") === "Count up" && <div>Up</div>} */}

        {/* {watch("progressType") === "Count down" && <div>Down</div>} */}

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
