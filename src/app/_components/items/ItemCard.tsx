import Link from "next/link";
import React from "react";
import { type ItemType } from "~/types";

export default function ItemCard({
  item,
  listId,
}: {
  item: ItemType;
  listId: string;
}) {
  return (
    <Link
      href={`/lists/${listId}/items/${item.id}`}
      className="flex min-h-[130px] w-full flex-col rounded border border-accent p-2">
      {item.name}
      <span className="text-sm font-thin">{item.description}</span>
    </Link>
  );
}
