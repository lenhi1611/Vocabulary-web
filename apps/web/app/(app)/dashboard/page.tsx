import type { Metadata } from "next";
import DashboardPage from "@/features/dashboard/container/DashboardPage";

export const metadata: Metadata = {
  title: "Dashboard — Lexi",
  description: "Your decks, streak and daily review queue.",
};

export default function Dashboard() {
  return (
    <DashboardPage/>
  );
}
