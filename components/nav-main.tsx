"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useCallback, useMemo, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isCollapsible?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}

export interface NavMainProps {
  items: NavItem[];
  groupLabel?: string;
  className?: string;
}

export function NavMain({
  items,
  groupLabel = "Platform",
  className,
}: NavMainProps) {
  const pathname = usePathname();

  const openItems = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc[item.title] = false;

        if (
          pathname === item.url ||
          (item.url !== "/" && pathname?.startsWith(`${item.url}/`))
        ) {
          acc[item.title] = true;
        }

        if (item.items) {
          const hasActiveChild = item.items.some(
            (subItem) =>
              pathname === subItem.url ||
              (subItem.url !== "/" && pathname?.startsWith(`${subItem.url}/`)),
          );

          if (hasActiveChild) {
            acc[item.title] = true;
          }
        }

        return acc;
      },
      {} as Record<string, boolean>,
    );
  }, [items, pathname]);

  const [localOpenItems, setLocalOpenItems] =
    useState<Record<string, boolean>>(openItems);

  useEffect(() => {
    setLocalOpenItems(openItems);
  }, [openItems]);

  const handleOpenChange = useCallback((title: string, isOpen: boolean) => {
    setLocalOpenItems((prev) => ({
      ...prev,
      [title]: isOpen,
    }));
  }, []);

  const isMenuItemActive = useCallback(
    (url: string) => {
      if (!pathname) return false;
      if (url === "/") return pathname === "/";
      return (
        pathname === url || (url !== "/" && pathname.startsWith(`${url}/`))
      );
    },
    [pathname],
  );

  const NavSubItem = ({
    item,
    isActive,
  }: {
    item: { title: string; url: string; icon?: LucideIcon };
    isActive: boolean;
  }) => (
    <SidebarMenuSubItem className="w-full">
      <SidebarMenuSubButton asChild className="w-full">
        <Link
          href={item.url}
          aria-current={isActive ? "page" : undefined}
          className={cn(
            "flex w-full items-center rounded-md px-4 py-4 text-sm transition-colors",
            "text-[#2970FF] hover:bg-[#F1F5F9] hover:text-[#2970FF]",
            isActive && "bg-[#EFF6FF] text-[#2970FF] font-medium",
          )}
        >
          {item.icon && <item.icon className="w-4 h-4 mr-2" />}
          <span className="truncate text-[#2970FF]">{item.title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );

  return (
    <SidebarGroup className={className}>
      {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <div key={item.title} className="relative">
            {item.isCollapsible !== false && item.items ? (
              <Collapsible
                asChild
                open={localOpenItems[item.title] || false}
                className="group/collapsible"
                onOpenChange={(isOpen) => handleOpenChange(item.title, isOpen)}
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      asChild={!item.items?.length}
                      tooltip={item.title}
                      className={cn(
                        "data-[state=open]:text-[#2970FF] text-[#697586] font-medium",
                        isMenuItemActive(item.url) && "text-[#2970FF]",
                      )}
                    >
                      {item.items?.length ? (
                        <>
                          {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                          <span className="flex-1 text-left">{item.title}</span>
                          <ChevronRight
                            className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                            size={16}
                          />
                        </>
                      ) : (
                        <Link
                          href={item.url}
                          className="flex items-center w-full"
                        >
                          {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                          <span>{item.title}</span>
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length > 0 && (
                    <CollapsibleContent>
                      <SidebarMenuSub className="px-0 text-[#697586]">
                        {item.items.map((subItem) => (
                          <NavSubItem
                            key={subItem.title}
                            item={subItem}
                            isActive={isMenuItemActive(subItem.url)}
                          />
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className={cn(
                    "text-[#697586] font-medium hover:text-[#2970FF]",
                    isMenuItemActive(item.url) && "text-[#2970FF]",
                  )}
                >
                  <Link href={item.url} className="flex items-center w-full">
                    {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </div>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
