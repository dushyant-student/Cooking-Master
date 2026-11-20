import api from "@/lib/axios";

export const toggleLike = async (recipeId, userId ,recipeOwnerId) => {
  const response = await api.post("/like/toggle", { recipeId, userId, recipeOwnerId });
  return response.data ;
};

export const getLikeStatus = async(recipeId, userId) => {
  const response = await api.get("/like/status", { params: {  recipeId,  userId } }) 
  return response.data ;

};


