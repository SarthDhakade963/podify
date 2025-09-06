"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  X,
  Home,
  List,
  History as HistoryIcon,
  Search,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react";
import { SidebarProps } from "@/types/type";

export type SidebarItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  dest: string;
};

export const sidebarItems: SidebarItem[] = [
  { id: "home", label: "Home", icon: Home, dest: "/dashboard" },
  { id: "playlist", label: "Playlist", icon: List, dest: "/playlist" },
  {
    id: "history",
    label: "Watch History",
    icon: HistoryIcon,
    dest: "/history",
  },
];

const Sidebar = ({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
}: SidebarProps) => {
  const router = useRouter();
  // Close sidebar on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-black/90 backdrop-blur-xl border-r border-gray-800 z-50 transform transition-all duration-300 ease-in-out ${
          // Mobile behavior
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${
          // Desktop width based on collapse state
          sidebarCollapsed ? "w-16" : "w-64"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`border-b border-gray-800/50 transition-all duration-300 
                ${sidebarCollapsed ? "lg:p-2" : "p-4 sm:p-6"}`}
          >
            {/* Logo and Close Button */}
            <div className="flex items-center justify-between mb-4 sm:mb-8">
              <h1
                className={`font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent transition-all duration-300 ${
                  sidebarCollapsed
                    ? "lg:text-lg lg:text-center lg:w-full"
                    : "text-xl sm:text-2xl"
                }`}
              >
                {sidebarCollapsed ? (
                  <span className="hidden lg:block">🎧</span>
                ) : (
                  "🎧 Podify"
                )}
              </h1>

              {/* Mobile close button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Collapse Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className={`hidden lg:flex items-center justify-center w-8 h-8 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200 absolute top-4 ${
                sidebarCollapsed ? "right-2" : "right-4"
              }`}
              aria-label={
                sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
              }
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>

            {/* Search - Hidden when collapsed */}
            {!sidebarCollapsed && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search podcasts..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-sm"
                  onFocus={(e) => e.target.select()}
                />
              </div>
            )}
          </div>

          {/* Navigation */}
          <div
            className={`flex-1 transition-all duration-300 ${
              sidebarCollapsed ? "lg:p-2" : "p-4 sm:p-6"
            }`}
          >
            <nav className="space-y-2" role="list">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                      router.push(item.dest);
                    }}
                    className={`w-full flex items-center rounded-xl transition-all duration-200 text-left relative group mb-4 ${
                      sidebarCollapsed
                        ? "lg:justify-center lg:p-3"
                        : "gap-3 px-4 py-3"
                    } ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold shadow-lg shadow-orange-500/25"
                        : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                    }`}
                    role="listitem"
                    aria-current={activeTab === item.id ? "page" : undefined}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {/* Tooltip for collapsed state */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User Profile */}
          <div
            className={`border-t border-gray-800 transition-all duration-300 ${
              sidebarCollapsed ? "lg:p-2" : "p-4 sm:p-6"
            }`}
          >
            <div
              className={`flex items-center ${
                sidebarCollapsed ? "lg:justify-center" : "gap-3"
              }`}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-black flex-shrink-0">
                U
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    User Name
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    Premium Member
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
