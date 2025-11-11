"use client";

import { ACTION } from "@/constant/app";
import { usePageTitleStore } from "@/stores/page-titles";
import CreateActionButton from "./create-action-button";
import ActionButton from "./action-button";
import LandingActionButton from "./landing-action-button";

export function HeaderBar() {
  const title = usePageTitleStore((s) => s.title);
  const action = usePageTitleStore((s) => s.action);

  return (
    <div className="flex w-full items-center justify-between border-b border-b-gray-200 shadow">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-medium text-foreground">{title}</h1>
      </div>
      <div className="px-6">
        {action === ACTION.LANDING && <LandingActionButton title={title} />}
        {action === ACTION.CREATE && <CreateActionButton />}
        {action === ACTION.UPDATE && <ActionButton />}
        {action === ACTION.DETAIL && (
          <h1 className="text-lg font-medium text-foreground">Detail</h1>
        )}
      </div>
    </div>
  );
}
