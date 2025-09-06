import React from "react";

interface LoadingPageProps {
  title: string;
}

const LoadingPage = ({ title }: LoadingPageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-300">{title}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
