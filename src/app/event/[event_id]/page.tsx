import Link from "next/link";
import { redirect } from "next/navigation";

import { asc, eq } from "drizzle-orm";
import { Check, ChevronLeft } from "lucide-react";

import AttendEventButton from "@/components/AttendEventButton";
import CommentInput from "@/components/CommentInput";
import LeaveEventButton from "@/components/LeaveEventButton";
import When2Meet from "@/components/When2Meet";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/db";
import { attendeesTable, commentsTable, eventsTable } from "@/db/schema";

type EventPageProps = {
  params: Promise<{
    event_id: string;
  }>;
  searchParams: Promise<{
    username: string;
    handle: string;
  }>;
};

// these two fields are always available in the props object of a page component
export default async function eventPage(props: EventPageProps) {
  const searchParams = await props.searchParams;

  const { handle } = searchParams;

  const params = await props.params;

  const { event_id } = params;

  const errorRedirect = () => {
    const params = new URLSearchParams();
    if (handle) {
      params.set("handle", handle);
    }
    redirect(`/?${params.toString()}`);
  };

  const event_id_num = parseInt(event_id);
  if (isNaN(event_id_num)) {
    errorRedirect();
  }
  if (!handle) {
    errorRedirect();
  }

  const attendees = await db
    .select({ handle: attendeesTable.handle })
    .from(attendeesTable)
    .where(eq(attendeesTable.eventId, event_id_num))
    .execute();
  const attendeeHandles = attendees.map((data) => data.handle);
  const userAttend = attendeeHandles.includes(handle ?? "");
  const [event] = await db
    .select({
      id: eventsTable.id,
      title: eventsTable.title,
      startTime: eventsTable.startTime,
      endTime: eventsTable.endTime,
    })
    .from(eventsTable)
    .where(eq(eventsTable.id, event_id_num))
    .execute();
  if (!event) errorRedirect();

  const comments = await db
    .select({
      id: commentsTable.id,
      handle: commentsTable.handle,
      content: commentsTable.content,
    })
    .from(commentsTable)
    .where(eq(commentsTable.eventId, event_id_num))
    .orderBy(asc(commentsTable.createdAt))
    .execute();

  return (
    <>
      <div className="flex">
        <Link
          href={{
            pathname: `/`,
            query: { handle },
          }}
          className="h-10"
        >
          <ChevronLeft className="mr-2 h-10 w-10" />
        </Link>
        <Card className="mr-5 w-full">
          <CardContent className="p-5">
            <div className="flex text-xl">
              <h1 className="w-3/4 break-all">{event.title}</h1>
              {userAttend && (
                <Check className="ml-auto h-auto" color="#15c618" />
              )}
              <p className="ml-auto"> {attendeeHandles.length} 人參加</p>
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex text-lg">
              <p>
                From {event.startTime} to {event.endTime}
              </p>
            </div>
          </CardFooter>
        </Card>
        {userAttend ? (
          <LeaveEventButton eventId={event_id_num} handle={handle} />
        ) : (
          <AttendEventButton eventId={event_id_num} handle={handle} />
        )}
      </div>
      <div className="my-2">
        {userAttend ? (
          <CommentInput eventId={event_id_num} handle={handle} />
        ) : (
          <Input disabled placeholder="參加活動來加入討論吧" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        {comments.map((comment) => (
          <Card key={comment.id} className="w-full">
            <CardContent className="p-5">
              <h1 className="break-all text-xl">
                {comment.handle}: {comment.content}
              </h1>
            </CardContent>
          </Card>
        ))}
      </div>
      <When2Meet
        eventId={event_id_num}
        handle={handle}
        readonly={!userAttend}
        startTime={event.startTime}
        endTime={event.endTime}
      />
    </>
  );
}
