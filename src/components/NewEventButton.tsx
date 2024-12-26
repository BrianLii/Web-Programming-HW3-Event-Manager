"use client";

import { useState } from "react";

import NewEventDialog from "@/components/NewEventDialog";
import { Button } from "@/components/ui/button";

export default function NewEventButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <>
      <Button
        className="my-auto ml-auto w-1/12 text-xl text-gray-700"
        variant="outline"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        新增
      </Button>
      <NewEventDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
