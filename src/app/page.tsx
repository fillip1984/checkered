"use client";

import Link from "next/link";
import { api } from "~/trpc/react";
import ListCard from "./_components/lists/ListCard";
import { BsPlusLg } from "react-icons/bs";

export default function Home() {
  // server side???
  const listQuery = api.list.readAll.useQuery();

  return (
    <main className="container m-auto">
      <div className="my-2 flex gap-2">
        {listQuery.data?.map((list) => <ListCard key={list.id} list={list} />)}
        <Link
          href="/lists/new"
          className="flex min-h-[130px] min-w-[150px] flex-col items-center justify-center gap-3 rounded border border-accent p-1">
          New List
          <BsPlusLg className="text-4xl" />
        </Link>
      </div>
    </main>
  );
}
