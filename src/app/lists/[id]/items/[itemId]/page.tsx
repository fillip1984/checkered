"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ItemType, itemFormSchema } from "~/types";

export default function ItemPage({
  params,
}: {
  params: { id: string; itemId: string };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ItemType>({
    resolver: zodResolver(itemFormSchema),
  });
  return <div>ItemPage</div>;
}
