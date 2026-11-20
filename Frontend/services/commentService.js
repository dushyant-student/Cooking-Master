import api from "@/lib/axios";


// Get all comments
export const fetchComments = async (recipeId) => {
  const response = await api.get( `/comments/recipe/${recipeId}`);
  return response.data;
};


// Create comment or reply
export const createComment = async (data) => {
  
  const response = await api.post( "/comments", data );

  return response.data;
};


// Update
export const updateComment = async ( commentId, comment) => {
  const response = await api.put( `/comments/${commentId}`,
    {
      comment,
    }
  );

  return response.data;
};


// Delete
export const deleteComment = async (commentId) => {
  const response = await api.delete( `/comments/${commentId}` );

  return response.data;
};