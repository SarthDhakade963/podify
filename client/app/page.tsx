"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Put any navigation logic here — *after* the component mounts
    const shouldRedirect = true; // your condition

    if (shouldRedirect) {
      router.push("/home");
    }
  }, [router]);
}


// /*
// // "use client";

// const PodcastCard = dynamic(() => import("@/component/PodcastCard"), {
//   ssr: false,
// });

// const VideoPlayer = dynamic(() => import("@/component/VideoPlayer"), {
//   ssr: false,
// });

// const Sidebar = dynamic(() => import("@/component/Sidebar"), {
//   ssr: false,
// });

// import { Button } from "@/components/ui/button";
// import { fetchWithToken } from "@/lib/fetchWithToken";
// import { Podcast } from "@/types/type";
// import {
//   HistoryIcon,
//   Home,
//   List,
//   LucideIcon,
//   Menu,
//   Settings,
// } from "lucide-react";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";

// interface SidebarItems {
//   id: string;
//   label: string;
//   icon: LucideIcon;
// }

// export default function Dashboard() {
//   const [podcasts, setPodcasts] = useState<Record<string, Podcast[]>>({});
//   const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar overlay state
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Desktop sidebar collapsed state
//   const [activeTab, setActiveTab] = useState("home");

//   useEffect(() => {
//     const fetchingPodcast = async () => {
//       try {
//         const res = await fetchWithToken("/podcasts", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) {
//           console.error("Failed to fetch podcasts", res.status);
//           return;
//         }

//         const data: Record<string, Podcast[]> = await res.json();
//         console.log(data);
//         setPodcasts(data);
//       } catch (error) {
//         console.error("Error fetching podcasts:", error);
//       }
//     };

//     fetchingPodcast();
//   }, []);

//   // Handle window resize to manage sidebar states
//   useEffect(() => {
//     const handleResize = () => {
//       // Close mobile sidebar when resizing to desktop
//       if (window.innerWidth >= 1024) {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const sidebarItems: SidebarItems[] = [
//     { id: "home", label: "Home", icon: Home },
//     { id: "playlist", label: "Playlist", icon: List },
//     { id: "history", label: "Watch History", icon: HistoryIcon },
//     { id: "settings", label: "Settings", icon: Settings },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white">
//       {/* Background decorative elements */}
//       <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
//       <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
//       <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>

//       {/* Sidebar */}
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//         sidebarCollapsed={sidebarCollapsed}
//         setSidebarCollapsed={setSidebarCollapsed}
//       />

//       {/* Main Content */}
//       <div
//         className={`relative z-10 transition-all duration-300 ease-in-out ${
//           sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
//         }`}
//       >
//         {/* Top Bar */}
//         <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800/50">
//           <div className="flex items-center gap-4">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden text-gray-400 hover:text-white transition-colors"
//               aria-label="Open mobile sidebar"
//             >
//               <Menu className="w-6 h-6" />
//             </button>

//             {/* Desktop Sidebar Toggle Button */}
//             <button
//               onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//               className="hidden lg:block text-gray-400 hover:text-white transition-colors"
//               aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               <Menu className="w-6 h-6" />
//             </button>

//             <h2 className="text-xl sm:text-2xl font-bold">
//               {activeTab === "home" && "Discover Podcasts"}
//               {activeTab === "playlist" && "My Playlists"}
//               {activeTab === "history" && "Watch History"}
//               {activeTab === "settings" && "Settings"}
//             </h2>
//           </div>

//           <div className="text-xs sm:text-sm text-gray-400 hidden sm:block">
//             {Object.values(podcasts).flat().length} podcasts available
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="p-4 sm:p-6">
//           {activeTab === "home" && (
//             <>
//               {/* Player Section */}
//               {currentPodcast?.videoUrl ? (
//                 <div className="mb-8">
//                   <h3 className="text-lg sm:text-xl font-semibold mb-4 text-orange-400">
//                     Now Playing
//                   </h3>
//                   <div className="max-w-4xl mx-auto">
//                     <VideoPlayer videoId={currentPodcast.id} />
//                   </div>
//                   <div className="text-center mt-4">
//                     <h4 className="text-base sm:text-lg font-semibold text-white mb-1">
//                       {currentPodcast.title}
//                     </h4>
//                     <p className="text-gray-400 text-sm sm:text-base">
//                       {currentPodcast.channel}
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 sm:py-12 mb-8 border-2 border-dashed border-gray-700 rounded-2xl">
//                   <div className="text-4xl sm:text-6xl mb-4">🎧</div>
//                   <p className="text-lg sm:text-xl text-gray-400">
//                     Select a podcast to start playing
//                   </p>
//                   <p className="text-gray-500 mt-2 text-sm sm:text-base">
//                     Your audio adventure awaits!
//                   </p>
//                 </div>
//               )}

//               {/* Podcasts by Topic */}
//               {Object.entries(podcasts).map(([topic, list]) => (
//                 <div key={topic} className="mb-8 sm:mb-12">
//                   <div className="flex items-center gap-3 mb-4 sm:mb-6">
//                     <h2 className="text-xl sm:text-2xl font-bold text-white">
//                       {topic}
//                     </h2>
//                     <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
//                   </div>
                  
//                   {/* Dynamic Grid Layout Based on Sidebar State */}
//                   <div className={`grid gap-4 sm:gap-6 transition-all duration-300 ${
//                     sidebarCollapsed 
//                       ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6' 
//                       : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
//                   }`}>
//                     {list.map((podcast) => (
//                       <PodcastCard
//                         key={podcast.id}
//                         podcast={podcast}
//                         onPlayClick={(p) => setCurrentPodcast(p)}
//                         onAddToPlaylist={(p) =>
//                           console.log("Add to playlist:", p)
//                         }
//                       />
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}

//           {activeTab === "playlist" && (
//             <div className="text-center py-8 sm:py-12">
//               <div className="text-4xl sm:text-6xl mb-4">📝</div>
//               <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
//                 Your Playlists
//               </h3>
//               <p className="text-gray-400 text-sm sm:text-base mb-6">
//                 Create and manage your podcast collections
//               </p>
//               <Button className="mt-2 sm:mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-semibold hover:from-orange-400 hover:to-orange-500 px-6 py-2">
//                 Create New Playlist
//               </Button>
//             </div>
//           )}

//           {activeTab === "history" && (
//             <div className="text-center py-8 sm:py-12">
//               <div className="text-4xl sm:text-6xl mb-4">📚</div>
//               <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
//                 Watch History
//               </h3>
//               <p className="text-gray-400 text-sm sm:text-base">
//                 Keep track of all the podcasts you&apos;ve enjoyed
//               </p>
//             </div>
//           )}

//           {activeTab === "settings" && (
//             <div className="text-center py-8 sm:py-12">
//               <div className="text-4xl sm:text-6xl mb-4">⚙️</div>
//               <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
//                 Settings
//               </h3>
//               <p className="text-gray-400 text-sm sm:text-base">
//                 Customize your Podify experience
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// } 
