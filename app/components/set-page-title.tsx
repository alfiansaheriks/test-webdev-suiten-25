"use client";

import { usePageTitleStore } from "@/stores/page-titles";
import { useEffect } from "react";

export function SetPageTitle({
  title,
  action,
  alsoDocument,
}: {
  title: string;
  action: string;
  alsoDocument?: boolean;
}) {
  const { setTitle, reset, setAction } = usePageTitleStore();

  useEffect(() => {
    setTitle(title);
    if (alsoDocument) document.title = title;
    if (action) setAction(action);
    return () => reset();
  }, [title, alsoDocument, setTitle, reset, action, setAction]);

  return null;
}
