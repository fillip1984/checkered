"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { api } from "~/trpc/react";
import { listFormSchema, type ListType } from "~/types";

export default function ListPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ListType>({
    resolver: zodResolver(listFormSchema),
  });

  const existingList = api.list.readOne.useQuery(
    { id: params.id },
    { enabled: !!params.id && !isNew, refetchOnWindowFocus: false },
  );

  useEffect(() => {
    if (!isNew && existingList.data) {
      reset(existingList.data as ListType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingList.data]);

  const utils = api.useUtils();
  const createListMutator = api.list.create.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      router.push("/");
    },
  });

  const updateListMutator = api.list.update.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      router.push("/");
    },
  });

  const deleteListMutator = api.list.delete.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
      router.push("/");
    },
  });

  const onSubmit: SubmitHandler<ListType> = (formData) => {
    if (isNew) {
      createListMutator.mutate(formData);
    } else {
      updateListMutator.mutate(formData);
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
          <Link href="/" className="btn-secondary">
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => deleteListMutator.mutate({ id: params.id })}
            className="btn-danger ml-auto">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
