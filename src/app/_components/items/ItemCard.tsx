import { differenceInCalendarDays, parse } from "date-fns";
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
  const lastDueDate = item.lastDue
    ? parse(item.lastDue, "yyyy-MM-dd", new Date())
    : item.createdAt ?? new Date();
  const nextDueDate = parse(item.nextDue, "yyyy-MM-dd", new Date());

  const totalDays = differenceInCalendarDays(nextDueDate, lastDueDate);
  const daysRemaining = differenceInCalendarDays(nextDueDate, new Date());
  const percent = 100 - (daysRemaining / totalDays) * 100;

  const overdue = daysRemaining <= 0;
  const today = daysRemaining === 0;
  console.log({
    today,
    overdue,
    name: item.name,
    daysRemaining,
    totalDays,
    percent,
  });

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

        <div className="relative mt-4 h-8 w-full rounded-lg border border-primary">
          <span className="absolute inset-0 z-10 flex justify-center text-xl font-bold">
            {today
              ? "Today"
              : overdue
                ? daysRemaining * -1 + " days overdue"
                : daysRemaining + " days remaining"}
          </span>
          <div
            className={`absolute -z-0 h-8 ${percent >= 100 ? "rounded-lg" : "rounded-l-lg"} ${!today && overdue ? "bg-danger" : "bg-primary"}`}
            style={{ width: `${overdue ? "100" : percent}%` }}></div>
        </div>
      </div>
    </Link>
  );
}
