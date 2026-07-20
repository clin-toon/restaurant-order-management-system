import { getMenuDataWithFilters } from "@/services/menu.services";
import DishCard from "@/components/Home/DishCard";
import { Dish, FilterProps, SearchParamsShape } from "@/types/MenuPageTypes";
import EmptyState from "@/components/Menu/EmptyState";
import { MenuPageClient } from "@/components/Menu/MenuPageClient";
import SearchBar from "@/components/Menu/SearchBar";
import SortDropdown from "@/components/Menu/Sortbar";
import Pagination from "@/components/Menu/Pagination";

const page = async ({ searchParams }: FilterProps) => {
  const resolvedParams: SearchParamsShape = await searchParams;
  const dishes = await getMenuDataWithFilters(resolvedParams);
  const { totalPages, data } = dishes;

  return (
    <div className="flex flex-1 min-h-screen md:h-screen mb-7">
      <MenuPageClient />
      <div className="flex-1 bg-stone-50 px-4 pt-4 pb-4 md:p-6 flex flex-col min-w-0">
        {/* Search + Sort — stacks vertically on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-stone-500 font-medium whitespace-nowrap">
              Sort By:
            </span>
            <SortDropdown />
          </div>
        </div>

        {data.length === 0 ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <EmptyState />
          </div>
        ) : (
          <>
            {/* Scrollable grid */}
            <div className="flex-1 overflow-y-auto -mx-4 px-4 md:mx-0 md:px-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-4">
                {data.map((dish: Dish) => (
                  <DishCard
                    id={dish.id}
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    image_url={dish.image_url}
                    price={dish.price}
                    category={dish.category}
                  />
                ))}
              </div>
            </div>

            {/* Pagination — sticky at bottom */}
            <div className="pt-3 mt-1 border-t border-stone-200 flex justify-center w-full">
              <Pagination lastPage={totalPages} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
