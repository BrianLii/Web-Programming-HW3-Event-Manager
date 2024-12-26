"use client";

import { Button } from "@/components/ui/button";
import useAttend from "@/hooks/useAttend";

type AttendEventButtonProp = {
  eventId: number;
  handle: string;
};

export default function AttendEventButton({
  eventId,
  handle,
}: AttendEventButtonProp) {
  const { attendEvent, loading } = useAttend();
  const handleAttend = () => {
    attendEvent({ eventId: eventId, handle: handle });
  };
  return (
    <>
      <Button
        className="w-15 h-auto rounded-lg text-xl text-gray-700"
        variant="outline"
        onClick={handleAttend}
        disabled={loading}
      >
        我要參加
      </Button>
    </>
  );
}
