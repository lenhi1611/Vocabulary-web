"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Gamepad2,
  LayoutDashboard,
  Layers,
  LogOut,
  RotateCcw,
  Settings,
  User,
} from "lucide-react";

import { Brand } from "@/shared/components/brand/Brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { logout, selectCurrentUser } from "@/features/auth/store/auth.slice";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks";
import { getInitials } from "@/shared/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/decks", label: "My Deck", icon: Layers },
  { href: "/games", label: "Games", icon: Gamepad2 },
  { href: "/reviews", label: "Reviews", icon: RotateCcw },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectCurrentUser);
  const { open, isMobile } = useSidebar();

  const displayName = authUser?.fullName || authUser?.email || "Guest";
  const initials = getInitials(displayName);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push("/signin");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Brand className="px-0 py-1.5" showText={open} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem className="mb-1" key={item.href}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    render={<Link href={item.href} />}
                    className={open ? "justify-start" : "justify-center"}
                  >
                    <item.icon className="size-5" />
                    {open && (
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.label}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton size="lg" tooltip={displayName} />
                }
              >
                <Avatar className="size-6">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <span className="truncate font-medium group-data-[collapsible=icon]:hidden">
                  {displayName}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
                className="w-56"
              >
                <DropdownMenuItem render={<Link href="/dashboard/profile" />}>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
