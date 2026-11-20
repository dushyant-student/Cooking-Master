import api from "@/lib/axios";


export const toggleSaveRecipe = (recipeId, userId , recipeOwnerId) => {
  return api.post("/save/toggle", {recipeId, userId, recipeOwnerId} );
};

export const getSaveStatus = (recipeId, userId) => {
  return api.get("/save/status", {
    params: {
      recipeId,
      userId,
    },
  });
};

