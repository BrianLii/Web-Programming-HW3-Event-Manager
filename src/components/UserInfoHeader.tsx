"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import useUserInfo from "@/hooks/useUserInfo";

import NameDialog from "./NameDialog";

export default function UserInfoHeader() {
  const { handle } = useUserInfo();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <div className=".h-8 mx-auto my-5 flex w-full justify-between">
        <p className="text-4xl text-gray-700">{handle ?? "guest"}</p>
        <Button
          className="h-full text-xl text-gray-700"
          variant="outline"
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          切換使用者
        </Button>
      </div>
      <NameDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </>
  );
}
