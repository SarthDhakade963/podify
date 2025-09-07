"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Sidebar = dynamic(() => import("@/component/Sidebar"), {
  ssr: false,
});

export default function PlaylistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState("playlist");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const pathname = usePathname();

  // Reset or adjust sidebar state when route changes
  useEffect(() => {
    if (pathname.startsWith("/playlist")) {
      // Example logic: For specific pages, open or collapse sidebar as needed
      setSidebarOpen(true);
      setSidebarCollapsed(false);
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out overflow-auto ${
          sidebarOpen ? (sidebarCollapsed ? "lg:ml-16" : "lg:ml-64") : "lg:ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}