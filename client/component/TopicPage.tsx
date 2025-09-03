"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Topic } from "@/types/type";
import { useSession } from "next-auth/react";
import { fetchWithToken } from "@/lib/fetchWithToken";

const topicsList: Topic[] = [
  { name: "Technology", emoji: "💻", description: "AI, gadgets, innovation" },
  { name: "Health", emoji: "🏥", description: "Wellness, fitness, medicine" },
  {
    name: "Business",
    emoji: "💼",
    description: "Entrepreneurship, finance, leadership",
  },
  {
    name: "Education",
    emoji: "📚",
    description: "Learning, teaching, academia",
  },
  { name: "Entertainment", emoji: "🎭", description: "Movies, music, culture" },
  {
    name: "Sports",
    emoji: "⚽",
    description: "Athletics, competitions, teams",
  },
  {
    name: "Science",
    emoji: "🔬",
    description: "Research, discoveries, experiments",
  },
  {
    name: "History",
    emoji: "📜",
    description: "Past events, civilizations, stories",
  },
];

const TopicPage = () => {
  const { data: session, status } = useSession();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // 🔍 On mount, check if user already has topics saved
  useEffect(() => {
    const checkUserTopics = async () => {
      if (status !== "authenticated") return;

      try {
        const res = await fetchWithToken("/topic", {
          // 👈 your backend should return user's topics
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            router.push("/dashboard"); // 👈 already has topics → redirect
            return;
          }
        }
      } catch (err) {
        console.error("Error checking topics:", err);
      } finally {
        setLoading(false);
      }
    };

    checkUserTopics();
  }, [status, router]);

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleContinue = async () => {
    if (selectedTopics.length < 3) {
      alert(
        "Please select at least 3 topics to get personalized recommendations."
      );
      return;
    }

    const topicsToSend = selectedTopics.map((topicName) => {
      const topic = topicsList.find((t) => t.name === topicName);
      return {
        name: topic?.name,
        description: topic?.description,
      };
    });

    const res = await fetchWithToken("/topic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicsToSend),
      credentials: "include",
    });

    if (!res.ok) {
      console.error("Failed to save topics");
      return;
    }

    const data = await res.text();

    if (data.startsWith("Topic saved")) {
      router.push("/dashboard");
    }
  };

  // 🌀 While checking topics, show a loader (prevents flicker)
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white">
        {/* Spinner */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 border-gray-700 animate-spin"></div>
        </div>

        {/* Animated Text */}
        <p className="text-lg font-medium text-gray-300 animate-pulse">
          Checking your preferences...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-40 h-40 bg-orange-400 rounded-full opacity-5 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-600 rounded-full opacity-8 blur-lg"></div>
      <div className="absolute bottom-20 left-1/3 w-36 h-36 bg-orange-300 rounded-full opacity-3 blur-2xl"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              🎧 Choose Your Vibe
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl leading-relaxed font-light">
            Select your favorite topics to get
            <span className="text-orange-400 font-medium"> personalized </span>
            podcast recommendations
          </p>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-gray-400">Selected:</span>
            <span className="text-orange-400 font-semibold text-lg">
              {selectedTopics.length}/8
            </span>
            <span className="text-gray-500 text-sm">(minimum 3 required)</span>
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl mb-12">
          {topicsList.map((topic) => (
            <Card
              key={topic.name}
              onClick={() => toggleTopic(topic.name)}
              className={`cursor-pointer transition-all duration-300 transform hover:scale-105 group ${
                selectedTopics.includes(topic.name)
                  ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400 shadow-2xl shadow-orange-500/25 scale-105"
                  : "bg-gray-900/40 backdrop-blur-sm border-gray-700 hover:border-orange-500/50 hover:bg-gray-800/60"
              }`}
            >
              <CardHeader className="pb-2">
                <div className="text-center mb-2">
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {topic.emoji}
                  </div>
                  <CardTitle
                    className={`text-lg font-bold ${
                      selectedTopics.includes(topic.name)
                        ? "text-black"
                        : "text-white group-hover:text-orange-400"
                    }`}
                  >
                    {topic.name}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p
                  className={`text-sm text-center mb-3 ${
                    selectedTopics.includes(topic.name)
                      ? "text-black/80"
                      : "text-gray-400"
                  }`}
                >
                  {topic.description}
                </p>
                <div className="flex justify-center">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      selectedTopics.includes(topic.name)
                        ? "bg-black/20 text-black"
                        : "bg-orange-500/20 text-orange-400 group-hover:bg-orange-500/30"
                    }`}
                  >
                    {selectedTopics.includes(topic.name)
                      ? "✓ Selected"
                      : "Click to select"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-8">
          <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 h-full transition-all duration-500 rounded-full"
              style={{ width: `${(selectedTopics.length / 8) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">
            {selectedTopics.length >= 3
              ? "Great! You can continue now"
              : `Select ${3 - selectedTopics.length} more topics to continue`}
          </p>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={selectedTopics.length < 3}
          className={`group px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300 transform min-w-[200px] ${
            selectedTopics.length >= 3
              ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black hover:from-orange-400 hover:to-orange-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
              : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          <span className="flex items-center gap-2">
            Continue to Dashboard
            {selectedTopics.length >= 3 && (
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            )}
          </span>
        </Button>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm max-w-md">
            Don&apos;t worry, you can always change your preferences later in
            your dashboard settings.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
