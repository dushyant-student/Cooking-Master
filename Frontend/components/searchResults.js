"use client";

import React, {useEffect, useState } from "react";
import { searchRecipes } from "@/services/searchService";
import { Card } from "./Card";
import AlgoliyaNotFound from "./AlgoliyaNotFound";



export default function SearchResults( { query } ) {

  const [recipes, setRecipes] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
 
  useEffect(() => {
    const getSearchResults = async () => {
      if (!query) {
        setRecipes([]);
        return;
      }

      try {

        setLoading(true);

        setError("");

        const results = await searchRecipes(query);
        setRecipes(results);
      
      } catch (error) {
        // console.error(error);
        setError(
          "Something went wrong while searching."
        );
      } finally {
        setLoading(false);
      }
    };

    getSearchResults();
  }, [query]);


  if (!query) {

    return (
      <p>
        Please enter something to search.
      </p>
    );

  }


  if (loading) {

    return (
      <p>
        Searching recipes...
      </p>
    );

  }


  if (error) {

    return (
      <p className="text-red-500">
        {error}
      </p>
    );

  }


  if (!recipes.success) {

    return (
      <AlgoliyaNotFound/>
    );
    
  }
  

  return (

    <div className="flex  flex-wrap gap-5 pl-8 items-center" >
      {
        (recipes.data)?.map((recipe,index) => (
          <Card key={index} item = {recipe} />
          )
        )
      }
    </div>

  );
}