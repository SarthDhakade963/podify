// hooks/usePodcasts.ts
import { useEffect, useState } from "react";
import { fetchWithToken } from "@/lib/fetchWithToken";
import { Podcast } from "@/types/type";

export function usePodcasts() {
  const [data, setData] = useState<Record<string, Podcast[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithToken("/podcasts") // calls your Spring Boot endpoint
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
