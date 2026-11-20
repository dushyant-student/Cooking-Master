import api from "@/lib/axios";

// Create Category
export const createCategory = async (formData) => {
  const response = await api.post("/category/add", formData);
  return response.data;
};

// Update Category
export const updateCategory = async (id, formData) => {
  const response = await api.put(`/category/update/${id}`, formData);
  return response.data;
};

// Delete Category
export const deleteCategory = async (id) => {
  const response = await api.delete(`/category/delete/${id}`);
  return response.data;
};

