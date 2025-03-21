
import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = "md", message, fullScreen = false }) => {
  const sizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2.5 w-2.5",
    lg: "h-4 w-4",
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center z-50">
        <div className="bg-card border border-border rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className={`h-6 w-6 rounded-full bg-primary loading-dot`}></div>
            <div className={`h-6 w-6 rounded-full bg-primary loading-dot`}></div>
            <div className={`h-6 w-6 rounded-full bg-primary loading-dot`}></div>
          </div>
          {message && (
            <p className="text-lg font-medium text-foreground">{message}</p>
          )}
        </div>
      </div>
    );
  }

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
