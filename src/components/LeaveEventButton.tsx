"use client";

import { Button } from "@/components/ui/button";
import useAttend from "@/hooks/useAttend";

type LeaveEventButtonProp = {
  eventId: number;
  handle: string;
};

export default function LeaveEventButton({
  eventId,
  handle,
}: LeaveEventButtonProp) {
  const { leaveEvent, loading } = useAttend();
  const handleLeave = () => {
    leaveEvent({ eventId: eventId, handle: handle });
  };

  return (
    <>
      <Button
        className="w-15 h-auto rounded-lg bg-lime-500 text-xl text-stone-900 hover:bg-lime-600"
        variant="outline"
        onClick={handleLeave}
        disabled={loading}
      >
        我已參加
      </Button>
    </>
  );
}
