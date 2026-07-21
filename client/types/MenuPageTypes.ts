export type serachBarProps = {
  value: string;
  onChange: (val: string) => void;
};

export type SearchParamsShape = {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  veg?: string;
  sort?: string;
};

export type Dish = {
  id?: string;
  name?: string;
  description?: string;
  price?: string;
  image_url?: string;
  category?: string;
  is_available?: boolean;
  sub_category?: string;
  times?: any;
};

export type FilterProps = {
  searchParams: Promise<SearchParamsShape>;
};
