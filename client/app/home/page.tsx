"use client";
import dynamic from "next/dynamic";
import React from "react";

const HomePage = dynamic(() => import("@/component/HomePage"), {
  ssr: false,
});

const page = () => {
  return <HomePage />;
};

export default page;
