import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

function PaginationControls({ page, setPage, count }) {
  const maxButtons = 10;
  const startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  const endPage = Math.min(count, startPage + maxButtons - 1);
  const adjustedStartPage = Math.max(1, endPage - maxButtons + 1);
  const pages = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, i) => adjustedStartPage + i
  );

  const handlePrevious = () => page > 1 && setPage((prev) => prev - 1);
  const handleNext = () => page < count && setPage((prev) => prev + 1);

  return (
    <div className="w-4/5 flex items-center justify-around gap-2 flex-wrap">
      <Button
        className="text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={handlePrevious}
        disabled={page <= 1}
      >
        <ChevronLeft />
        Previous
      </Button>
      <div className="gap-5 items-center justify-center hidden md:flex">
        {pages.map((num) => (
          <Button
            key={num}
            className={`text-white px-3 py-2 rounded cursor-pointer hover:bg-gray-500 ${
              page === num ? "bg-amber-500" : "bg-gray-800/50"
            }`}
            onClick={() => setPage(num)}
          >
            {num.toString().padStart(2, "0")}
          </Button>
        ))}
      </div>
      <Button
        className="text-white bg-gray-800/50 hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={handleNext}
        disabled={page >= count}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
}

export default PaginationControls;