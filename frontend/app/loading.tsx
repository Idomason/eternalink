import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-accent-1 bg-opacity-80 dark:bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        <span className="mt-4 text-foreground/70 text-sm font-medium">
          Loading...
        </span>
      </div>
    </div>
  );
}
