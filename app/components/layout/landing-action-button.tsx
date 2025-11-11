"use client";
import { Button } from "../ui/Button";
import { Search, Plus, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PAGE, TAB } from "@/constant/app";
import { useRouter } from "next/navigation";
import {
  BANK_CREATE_RELATIVE_PARAMS,
  DEPARTMENT_CREATE_RELATIVE_PARAMS,
  EMPLOYEE_CREATE_RELATIVE_PARAMS,
  SHIFT_CREATE_RELATIVE_PARAMS,
} from "@/constant/params";

export default function LandingActionButton({ title }: { title: string }) {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching...");
  };

  const handleClick = (tab: string) => {
    if (tab === PAGE.MASTER_DATA.BANK.LANDING) {
      router.push(BANK_CREATE_RELATIVE_PARAMS);
    } else if (tab === PAGE.MASTER_DATA.SHIFT.LANDING) {
      router.push(SHIFT_CREATE_RELATIVE_PARAMS);
    } else if (tab === PAGE.MASTER_DATA.DEPARTMENT.LANDING) {
      router.push(DEPARTMENT_CREATE_RELATIVE_PARAMS);
    } else if (tab === PAGE.MASTER_DATA.EMPLOYEE.LANDING) {
      router.push(EMPLOYEE_CREATE_RELATIVE_PARAMS);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full items-center">
      <form
        onSubmit={handleSearch}
        className="relative flex-1 max-w-2xl w-full"
      >
        <div className="relative flex items-center">
          <Input
            type="search"
            placeholder="Cari Data..."
            className="w-full pl-3 pr-10 h-9 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" className="absolute right-0 h-9 w-9 p-0 ">
            <Search className="h-3.5 w-3.5" color="white" />
          </Button>
        </div>
      </form>
      <Button
        onClick={() => handleClick(title)}
        className="text-white whitespace-nowrap h-9 px-3 text-sm"
      >
        {title === TAB.ABSENCE ? (
          <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
        ) : (
          <Plus className="mr-1.5 h-3.5 w-3.5" />
        )}
        {title === TAB.ABSENCE ? "Input Absensi" : title}
      </Button>
    </div>
  );
}
