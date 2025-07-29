import { Skeleton } from "@mui/material";

export const MiniCardSkeleton = ({className}) => {
  return (
    <div className={`rounded-lg shadow p-4 text-center overflow-hidden ${className}`}>
      <div className="flex gap-4">
        <div className="mt-4 w-[40%] flex flex-col items-center justify-center">
          <Skeleton className="h-6 w-full mx-auto mt-4 rounded-md skeleton-bg" />
          <Skeleton className="h-4 w-full mx-auto mt-2 rounded-md skeleton-bg" />
          <Skeleton className="h-4 w-full mx-auto mt-2 rounded-md skeleton-bg" />
          <Skeleton className="h-4 w-full mx-auto mt-2 rounded-md skeleton-bg" />
          <div className="flex justify-center gap-2 mt-4">
            <Skeleton className="h-6 w-16 rounded-xl skeleton-bg-dark" />
            <Skeleton className="h-6 w-16 rounded-xl skeleton-bg-dark" />
          </div>
        </div>
        <Skeleton className="flex-1 h-1/2" />
      </div>
    </div>
  );
};