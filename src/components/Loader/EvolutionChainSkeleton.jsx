import { Skeleton } from "@/components/ui/skeleton";
import { FaArrowRight } from "react-icons/fa";

function EvolutionChainSkeleton() {
  return (
    <div className="flex flex-col gap-4 justify-center mt-4 w-full h-fit px-6 py-5 rounded-lg bg-muted/40">
      <h1 className="text-3xl font-bold text-muted-foreground">
        Evolution Chain
      </h1>
      <div className="flex items-center gap-8 justify-center flex-wrap px-10">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="w-24 h-24 rounded-full" />
              <Skeleton className="w-20 h-4 rounded-md" />
            </div>

            {index < 2 && (
              <span className="text-muted-foreground text-2xl">
                <FaArrowRight />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EvolutionChainSkeleton;
