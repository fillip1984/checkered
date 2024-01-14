import Link from "next/link";
import { api } from "~/trpc/server";

export default async function Home() {
  // server side???
  const listQuery = await api.list.readAll.query();

  return (
    <main className="container bg-danger">
      <h1>Checkered</h1>
      {listQuery.map((list) => (
        <Link key={list.id} href={`lists/${list.id}`}>
          {list.name}
        </Link>
      ))}
      <Link
        href="/lists/new"
        className="w-48 rounded border border-accent bg-accent"
      >
        New List
      </Link>
    </main>
  );
}
