import { algoliasearch } from "algoliasearch";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_ADMIN_API_KEY
);

export const ALGOLIA_INDEX_NAME =
  process.env.ALGOLIA_INDEX_NAME || "recipes";

export default client;