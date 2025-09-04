import { useEffect, useState } from "react";
import PodcastCard from "../components/PodcastCard";

interface Podcast {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
}

export default function Dashboard() {
  const [podcastsByTopic, setPodcastsByTopic] = useState<Record<string, Podcast[]>>({});

  // fetch the topics from db
  useEffect(() => {
    // // Fetch user-selected topics from backend
    // axios.get("/api/users/topics").then(res => {
    //   const topics: string[] = res.data;

    //   // Fetch podcasts for each topic
    //   axios
    //     .get("/api/podcasts", { params: { topics, limit: 3 } })
    //     .then(res => setPodcastsByTopic(res.data));
    // });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

      {Object.entries(podcastsByTopic).map(([topic, podcasts]) => (
        <section key={topic} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{topic}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {podcasts.map(podcast => (
              <PodcastCard key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
