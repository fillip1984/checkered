"use client";

import Link from "next/link";
import { BsPlusLg } from "react-icons/bs";
import ItemCard from "~/app/_components/items/ItemCard";
import LoadingAndRetry from "~/app/_components/navigation/LoadingAndRetry";
import { api } from "~/trpc/react";

export default function ListDetails({ params }: { params: { id: string } }) {
  const listQuery = api.list.readOne.useQuery({ id: params.id });
  return (
    <>
      {(listQuery.isLoading || listQuery.isError) && (
        <LoadingAndRetry
          isLoading={listQuery.isLoading}
          isError={listQuery.isError}
          retry={listQuery.refetch}
        />
      )}

      {!listQuery.isLoading && !listQuery.isError && (
        <div className="container mx-auto">
          <h2>{listQuery.data?.name}</h2>
          <div className="mt-2 flex flex-col gap-2">
            {listQuery.data?.items.map((item) => (
              <ItemCard key={item.id} item={item} listId={params.id} />
            ))}
            <Link
              href={`/lists/${params.id}/items/new`}
              className="flex min-h-[130px] flex-col items-center justify-center rounded border border-accent p-2">
              <span className="text-xl">New Item</span>
              <BsPlusLg className="text-4xl" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
