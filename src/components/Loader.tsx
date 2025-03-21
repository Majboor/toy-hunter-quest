
import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", message }) => {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2.5 w-2.5",
    lg: "h-4 w-4",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="flex items-center justify-center space-x-2">
        <div className={`${sizeClasses[size]} rounded-full bg-primary loading-dot`}></div>
        <div className={`${sizeClasses[size]} rounded-full bg-primary loading-dot`}></div>
        <div className={`${sizeClasses[size]} rounded-full bg-primary loading-dot`}></div>
      </div>
      {message && (
        <p className="mt-4 text-sm text-muted-foreground animate-pulse">{message}</p>
      )}
    </div>
  );
};

export default Loader;
