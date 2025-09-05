"use client";
import dynamic from "next/dynamic";
import React from "react";

const TopicPage = dynamic(() => import("@/component/TopicPage"), {
  ssr: false,
});

const page = () => {
  return <TopicPage />;
};

export default page;
