"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import ListCard from "./_components/lists/ListCard";
import { BsPlusLg } from "react-icons/bs";
import LoadingAndRetry from "./_components/navigation/LoadingAndRetry";

export default function Home() {
  const listQuery = api.list.readAll.useQuery();

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
        <div className="container m-auto">
          <div className="my-2 flex flex-col gap-2 p-2 md:flex-row">
            {listQuery.data?.map((list) => (
              <ListCard key={list.id} list={list} />
            ))}
            <Link
              href="/lists/new/edit"
              className="flex min-h-[130px] w-full flex-col items-center justify-center gap-3 rounded border border-accent p-2">
              <span className="text-xl">New List</span>
              <BsPlusLg className="text-4xl" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
