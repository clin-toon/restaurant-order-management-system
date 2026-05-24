import { getMenuDataWithFilters } from "@/services/menu.services";
import Sidebar from "@/components/Menu/Sidebar";
import DishCard from "@/components/Home/DishCard";
import { Dish, FilterProps, SearchParamsShape } from "@/types/MenuPageTypes";
import EmptyState from "@/components/Menu/EmptyState";

const page = async ({ searchParams }: FilterProps) => {
  const resolvedParams: SearchParamsShape = await searchParams;
  const dishes = await getMenuDataWithFilters(resolvedParams);

  return (
    <div className="flex flex-1 h-screen">
      <Sidebar />

      <div className="flex-1 bg-stone-50 p-6">
        {dishes.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <EmptyState />
          </div>
        ) : (
          <div className="h-full overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dishes.map((dish: Dish) => (
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
        )}
      </div>
    </div>
  );
};

export default page;
