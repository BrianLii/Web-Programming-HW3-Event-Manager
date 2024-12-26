import Link from "next/link";

import { eq } from "drizzle-orm";
import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { attendeesTable, eventsTable } from "@/db/schema";

type EventDigestProp = {
  id: number;
  handle?: string;
};

export default async function EventDigest({ id, handle }: EventDigestProp) {
  const attendees = await db
    .select({ handle: attendeesTable.handle })
    .from(attendeesTable)
    .where(eq(attendeesTable.eventId, id))
    .execute();
  const attendeeHandles = attendees.map((data) => data.handle);
  const userAttend = attendeeHandles.includes(handle ?? "");
  const [event] = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, id))
    .execute();

  return (
    <Link
      href={{
        pathname: `/event/${id}`,
        query: { handle },
      }}
    >
      <Card className="w-full">
        <CardContent className="p-0">
          <div className="flex h-auto py-5 text-xl">
            <h1 className="my-auto ml-4 h-auto w-3/4 break-all">
              {event.title}
            </h1>
            <div className="ml-auto flex">
              {userAttend && (
                <Check className="mr-4 h-auto w-10" color="#15c618" />
              )}
              <p className="my-auto mr-4 h-auto"> {attendees.length} 人參加</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
