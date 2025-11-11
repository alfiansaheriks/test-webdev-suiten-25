"use client";

import * as React from "react";
import { Database, Calendar, Home } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import watpaddLogo from "@/assets/wattpad.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Master Data",
      url: "#",
      icon: Database,
      isActive: true,
      items: [
        {
          title: "Pegawai",
          url: "/master-data/employee",
        },
        {
          title: "Bagian",
          url: "/master-data/department",
        },
        {
          title: "Shift",
          url: "/master-data/shift",
        },
        {
          title: "Bank",
          url: "/master-data/bank",
        },
      ],
    },
    {
      title: "Absensi",
      url: "#",
      icon: Calendar,
      items: [
        {
          title: "Input Absensi",
          url: "/absence/input-absence",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 py-8">
          <Image src={watpaddLogo} alt="Wattpad" />
          <h1 className="font-semibold text-xl">PayWiz</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="tracking-wide">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
