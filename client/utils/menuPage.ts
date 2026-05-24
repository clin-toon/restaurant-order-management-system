

export const updateUrl = (
  updates: Record<string, any>,
  router: any,
  searchParams: URLSearchParams
) => {
  const params = new URLSearchParams(searchParams.toString()); 

  Object.entries(updates).forEach(([key, value]) => {
    console.log("KEY:", key, "VALUE:", value, "TYPE:", typeof value);

    // ❌ remove invalid
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0)
    ) {
      params.delete(key);
      return;
    }

    // ❌ prevent object (MAIN FIX)
    if (typeof value === "object" && !Array.isArray(value)) {
      console.error(`Invalid value for ${key}`, value);
      return;
    }

    if (Array.isArray(value)) {
      params.set(key, value.join(","));
      return;
    }

    if (typeof value === "boolean") {
      params.set(key, value ? "true" : "false");
      return;
    }

    params.set(key, String(value));
  });

  router.push(`/menu?${params.toString()}`);
};


export const categoryColor: Record<string, string> = {
  snacks: "bg-amber-50 text-amber-700 border border-amber-200",
  "main course": "bg-emerald-50 text-emerald-700 border border-emerald-200",
  drinks: "bg-sky-50 text-sky-700 border border-sky-200",
  breakfast: "bg-rose-50 text-rose-700 border border-rose-200",
  lunch: "bg-violet-50 text-violet-700 border border-violet-200",
};


export const getCategoryStyle = (category: string) =>
  categoryColor[category.toLowerCase()] ??
  "bg-stone-100 text-stone-600 border border-stone-200";