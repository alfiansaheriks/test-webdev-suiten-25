"use client";

import { Button } from "@/app/components/ui/Button";
import { Trash2 } from "lucide-react";
import { useShiftStore } from "@/stores/master-data/shiftStore";

interface ActionCellProps {
  id: string;
}

export function ActionCell({ id }: ActionCellProps) {
  const { remove } = useShiftStore();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      remove(id);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
}
