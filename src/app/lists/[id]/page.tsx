"use client";

import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import { api } from "~/trpc/react";

export default function ListDetails({ params }: { params: { id: string } }) {
  const listQuery = api.list.readOne.useQuery({ id: params.id });
  return (
    <div className="container mx-auto">
      <h2>{listQuery.data?.name}</h2>
      <div className="mt-2 flex flex-col gap-2">
        {listQuery.data?.items.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
        <Link
          href={`/lists/${params.id}/items/new`}
          className="flex items-center rounded border border-accent p-2">
          New Item
          <BsPlusLg className="text-2xl" />
        </Link>
      </div>
    </div>
  );
}
