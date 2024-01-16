import { formatDistanceToNow, parse } from "date-fns";
import Link from "next/link";
import { BsCalendar2Event } from "react-icons/bs";
import { type ItemType } from "~/types";

export default function ItemCard({
  item,
  listId,
}: {
  item: ItemType;
  listId: string;
}) {
  const nextDueDate = parse(item.nextDue, "yyyy-MM-dd", new Date());

  return (
    <Link
      href={`/lists/${listId}/items/${item.id}`}
      className="flex min-h-[130px] w-full flex-col rounded border border-accent p-2">
      {item.name}
      <span className="text-sm font-thin">{item.description}</span>

      <div className="flex flex-col">
        <span className="relative flex items-center gap-2">
          <BsCalendar2Event className="text-2xl" />
          {/* <span className="absolute left-1 top-1">
          {getDate(parse(item.nextDue, "yyyy-MM-dd", new Date()))}
        </span> */}
          {item.nextDue}
        </span>

        <div className="relative my-2 h-6 w-full rounded-lg border border-primary">
          <span className="absolute inset-0 z-10 flex justify-center">
            {formatDistanceToNow(nextDueDate, { addSuffix: true })}
          </span>
          <div className="absolute h-6 w-3/4 rounded-l-lg bg-primary"></div>
        </div>
      </div>
    </Link>
  );
}
