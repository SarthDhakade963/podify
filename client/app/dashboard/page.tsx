// app/dashboard/page.tsx
"use client";
import React from "react";
import { Search, Headphones, UserCircle, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Dashboard = () => {
  const user = {
    name: "Sarthak",
    email: "sarthak@podify.com",
    avatar: "/avatar.png", // replace with OAuth image
  };

  const podcasts = [
    { id: 1, title: "Tech Talk Daily", author: "John Doe" },
    { id: 2, title: "Mindful Moments", author: "Sophia Lee" },
    { id: 3, title: "StartUp Stories", author: "Alex Martin" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">🎧 Podify Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserCircle className="w-8 h-8 text-gray-600" />
            <span className="font-medium">{user.name}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/home" })}
          >
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      {/* Search */}
      <div className="flex items-center bg-white rounded-2xl px-4 py-2 shadow-sm mb-6">
        <Search className="text-gray-500 w-5 h-5 mr-2" />
        <input
          type="text"
          placeholder="Search podcasts..."
          className="flex-1 outline-none bg-transparent"
        />
      </div>

      {/* Recommendations */}
      <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {podcasts.map((pod) => (
          <Card
            key={pod.id}
            className="rounded-2xl shadow hover:shadow-lg transition"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Headphones className="w-8 h-8 text-indigo-500" />
                <div>
                  <h3 className="font-semibold">{pod.title}</h3>
                  <p className="text-sm text-gray-500">by {pod.author}</p>
                </div>
              </div>
              <Button className="w-full">Play</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
