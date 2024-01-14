import Link from "next/link";
import React from "react";
import { type ListType } from "~/types";

export default function ListCard({ list }: { list: ListType }) {
  return (
    <Link
      href={`lists/${list.id}`}
      className="min-w-[150px] rounded border border-accent p-1">
      <span className="text-xl">{list.name}</span>
    </Link>
  );
}
