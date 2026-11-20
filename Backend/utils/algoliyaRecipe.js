import client,  { ALGOLIA_INDEX_NAME } from "../config/algolia.js";



//Add Algoliya Recipe When Ceating recipe 
export const addRecipeToAlgolia = async (recipe) => {
  try {
    const object = {
      _id: recipe._id.toString(),

    name: recipe.name,

    about: recipe.about,

    ingredients: recipe.ingredients,

    recipieDescription: recipe.recipieDescription,

    categoryType: recipe.categoryType,

    categoryTypeId: recipe.categoryTypeId,

    imageURL: recipe.imageURL,

    owner: recipe.owner,
    userId: recipe.userId
        ? recipe.client_Id.toString()
        : "",

      createdAt: recipe.createdAt,
    };

    // await ALGOLIA_INDEX.saveObject(object);
    await client.saveObject({
      indexName: ALGOLIA_INDEX_NAME,
      body: object,
    });


    // console.log("Recipe added to Algolia:", object.objectID);
  } catch (error) {
    console.error("Algolia add error:", error);
  }
};





//Deleye Recipe from Algoliya 
export const deleteRecipeFromAlgolia = async (recipeId) => {
  try {
    await ALGOLIA_INDEX.deleteObject(recipeId.toString());

    
  } catch (error) {
    console.error("Algolia delete error:", error);
  }
};



//Update Recipe export

export const updateRecipeInAlgolia = async (recipe) => {
  try {
    const object = {
      objectID: recipe._id.toString(),

      name: recipe.name || "",

      about: recipe.about || "",

      description: recipe.description || "",

      categoryType: recipe.categoryType || "",

      ingredients: recipe.ingredients || [],

      image: recipe.image || "",

      owner: recipe.owner
        ? recipe.owner.toString()
        : "",

      createdAt: recipe.createdAt,
    };


    client.saveObject({ indexName: ALGOLIA_INDEX, body: object });
    
    
  } catch (error) {
    console.error("Algolia update error:", error);
  }
};