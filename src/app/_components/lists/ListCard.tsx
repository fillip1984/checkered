import Link from "next/link";
import React from "react";
import { type ListType } from "~/types";
import { BsPencil } from "react-icons/bs";
import { useRouter } from "next/navigation";

export default function ListCard({ list }: { list: ListType }) {
  const router = useRouter();
  return (
    <Link
      href={`lists/${list.id}`}
      className="flex min-h-[130px] w-full flex-col rounded border border-accent p-2">
      <span className="text-xl">{list.name}</span>
      <p className="text-sm font-thin">{list.description}</p>

      <div className="mt-auto flex justify-between">
        <span className="rounded bg-accent p-1 text-dark">
          {list._count?.items} items
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`lists/${list.id}/edit`);
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary transition-colors hover:bg-secondary hover:text-dark">
          <BsPencil />
        </button>
      </div>
    </Link>
  );
}
