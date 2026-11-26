import api from "@/lib/axios";

export const uploadsData = async (formData) => {
    const response = await api.post("/recipe/add", formData);
    return response.data;
};


export const updateRecipe = async (id, formData) => {
    const response = await api.put(`/recipe/update/${id}`, formData);
    return response.data;
};


export const deleteRecipeById = async (id) => {
    const response = await api.delete(`/recipe/delete/${id}`);
    return response.data;
};


export const aboutRecipe = async (id) => {
    const response = await api.get(`/recipe/${id}`);

    return response.data.data;
};


export const getFillterRecipes = async (type) => {    
    const response = await api.get(`/recipe/type/${type}`);
    return response.data ;
}
