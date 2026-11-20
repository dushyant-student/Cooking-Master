import api from "@/lib/axios";

export const searchRecipes = async (query) => {

  const response = await api.get(
    `/search/recipes?q=${encodeURIComponent(query)}`
  );

  return response.data;

};