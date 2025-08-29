import { getSession } from "next-auth/react";

export async function fetchWithToken(input: RequestInfo, init?: RequestInit) {
  const session = await getSession();
  const token = session?.accessToken;
  const headers = new Headers(init?.headers as HeadersInit);

  if (token) headers.set("Authorization", `Bearer ${token}`);

  headers.set("Content-Type", "application/json");

  const res = await fetch(`${process.env.SPRING_BASE_URL}${input}`, {
    ...init,
    headers,
  });

  if (!res.ok) throw new Error(await res.text());

  return res;
}
