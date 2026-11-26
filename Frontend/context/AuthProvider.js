
"use client";

import { fetcher } from "@/lib/fetcher";
import { createContext, useContext, useEffect, useState, useCallback,} from "react";
import useSWR from "swr";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);

  const [type, setType] = useState("latest");
  const [recipeId, setRecipeId] = useState("");


  const Api_Backend_Url= process.env.NEXT_PUBLIC_BACKEND_API_URL ;
  // CHECK AUTH USER

  const refreshUser = useCallback(async () => {
    try {
      if ( !Api_Backend_Url ){
        return ;
      }
      
      setWait(true);
      const response = await fetch(
        `${Api_Backend_Url}/auth/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        setUser(null);
        return null;
      }

      const data = await response.json();

      
      setUser(data.user || null);
      return data.user || null;

    } catch (error) {

      console.error("Refresh User Error:", error);

      setUser(null);

      return null;

    } finally {
      setWait(false);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

console.log(user,"USer in AuthContext/.....")


  // PRIVATE API KEY
  const privateKey = !loading && user;

  // SAVE RECIPES - PRIVATE
  const { data: saveData, error: saveError, isLoading: saveisLoading, mutate: saveRefresh,} = useSWR(
    privateKey ? "/save/recipes" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  // ALL CATEGORIES - PUBLIC

  const { data: allTypesCategories, error: categoryError, isLoading: categoryisLoading, mutate: categoryRefresh,} = useSWR("/category/all", fetcher, {
    shouldRetryOnError: false,
  });
  

  // LIKE RECIPES - PRIVATE

  const { data: likeData, error: likeError, isLoading: likeisLoading, mutate: likeMutate,} = useSWR(
    privateKey ? "/like/my-like-recipes" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );


  // USER POSTS - PRIVATE

  const { data: totalPost, error: totalPostError, isLoading: totalPostisLoading, mutate: totalPostMutate,} = useSWR(
    privateKey ? `/recipe/admins/all/${type}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  // USER PROFILE - PRIVATE

  const { data: userProfile, error: profileError, isLoading: userProfileisLoading, mutate: userProfileMutate,} = useSWR(
    privateKey ? "/auth/profile" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  

  // ABOUT RECIPE - PUBLIC

  const { data: aboutData, error: aboutError, isLoading: aboutisLoading, mutate: aboutMutate,} = useSWR(
    recipeId ? `/recipe/${recipeId}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );



  // CONTEXT PROVIDER

  return (
    <AuthContext.Provider
      value={{
        // AUTH
        wait,
        user,
        loading,
        setUser,
        refreshUser,

        // CATEGORIES
        allTypesCategories,
        categoryError,
        categoryRefresh,
        categoryisLoading,

        // SAVE RECIPES
        saveData,
        saveError,
        saveisLoading,
        saveRefresh,

        // LIKE RECIPES
        likeData,
        likeError,
        likeisLoading,
        likeMutate,

        // USER POSTS
        totalPost,
        totalPostError,
        totalPostisLoading,
        totalPostMutate,
        type,
        setType,

        // USER PROFILE
        userProfile,
        profileError,
        userProfileisLoading,
        userProfileMutate,

        // ABOUT RECIPE
        aboutData,
        aboutError,
        aboutisLoading,
        aboutMutate,
        recipeId,
        setRecipeId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// CUSTOM AUTH HOOK

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
