import { Skeleton } from "./ui/skeleton";

export default function GlobalDetailSkeleton() {
  return (
    <div className="m-6 p-6 md:m-10 md:p-10 rounded-2xl shadow-xl bg-muted text-white flex flex-col md:flex-row items-center justify-between gap-6 md:min-w-[1012px] md:min-h-[370px]">
      <div className="w-full md:w-2/5 flex items-center justify-center relative">
        <div className="absolute w-[250px] h-[250px] bg-white/20 rounded-full blur-2xl" />
        <Skeleton className="w-[80%] max-w-[300px] aspect-square rounded-xl z-10 bg-gray-500" />
      </div>
      <div className="flex flex-col w-full md:w-3/5 gap-3 z-10">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-40 rounded bg-gray-500" />
          <Skeleton className="h-8 w-12 rounded bg-gray-500" />
        </div>

        <Skeleton className="h-4 w-24 rounded bg-gray-500" />
        <Skeleton className="h-14 w-full rounded bg-gray-500" />

        <div className="flex gap-2 mt-4">
          <Skeleton className="h-8 w-20 rounded-full bg-gray-500" />
          <Skeleton className="h-8 w-20 rounded-full bg-gray-500" />
        </div>
      </div>
    </div>
  );
}
