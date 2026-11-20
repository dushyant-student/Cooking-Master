import client, { ALGOLIA_INDEX_NAME } from "../config/algolia.js";

export const searchRecipes = async (req, res) => {
  try {
    const { q = "" } = req.query;
    
    const result = await client.searchSingleIndex({
      indexName: ALGOLIA_INDEX_NAME,
      searchParams: {
        query: q,
        hitsPerPage: 20,
      },
    });

    return res.status(200).send({
      success: true,
      data: result.hits,
      total: result.nbHits,
    });
  } catch (error) {
    // console.error("Search error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};