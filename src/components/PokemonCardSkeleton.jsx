import { Skeleton } from "@/components/ui/skeleton";

function PokemonCardSkeleton() {
  return (
    <div className="relative rounded-xl shadow-md p-5 min-w-[292px] min-h-[357px] text-center border-gray-300 h-fit pb-10 animate-pulse bg-gray-800">
      {/* Image Section */}
      <div className="relative w-full aspect-[4/3] flex items-center justify-center rounded-lg overflow-hidden bg-gray-300">
        <Skeleton className="absolute inset-0 w-full h-full object-cover opacity-30" />
      </div>

      {/* Name */}
      <Skeleton className="h-6 w-2/3 mx-auto mt-4 rounded-md bg-gray-300" />

      {/* ID */}
      <Skeleton className="h-4 w-1/4 mx-auto mt-2 rounded-md bg-gray-300" />

      {/* Types */}
      <div className="flex justify-center gap-2 mt-4">
        <Skeleton className="h-6 w-16 rounded-xl bg-gray-300" />
        <Skeleton className="h-6 w-16 rounded-xl bg-gray-300" />
      </div>
    </div>
  );
}

export default PokemonCardSkeleton;
