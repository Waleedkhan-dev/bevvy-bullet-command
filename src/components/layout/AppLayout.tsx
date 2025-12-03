import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-background grid-pattern">
      <Sidebar />
      <div className="ml-[260px] transition-all duration-200">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
