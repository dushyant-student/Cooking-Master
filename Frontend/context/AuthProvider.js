
"use client";

import { fetcher } from "@/lib/fetcher";
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import useSWR from "swr";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wait, setWait] = useState(false);
  const [type, setType] = useState("latest");
  const [recipeId, setRecipeId] = useState("");

  
 
  // CHECK AUTH USER

const refreshUser = useCallback(async () => {
  try {
    setWait(true);

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

    console.log("Backend URL:", API_URL);

    if (!API_URL) {
      throw new Error("Backend API URL is missing");
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    setUser(data.user || null);

  } catch (error) {
    console.error("Refresh User Error:", error);
    setUser(null);
  } finally {
    setWait(false);
  }
}, []);


  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  
 
  // SAVE RECIPES - PRIVATE 
  const { data: saveData, error: saveError, isLoading: saveisLoading, mutate: saveRefresh,} = useSWR(
    !loading && user ? "/save/recipes" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );


  // ALL CATEGORIES - PUBLIC
  const { data: allTypesCategories, error: categoryError, isLoading: categoryisLoading, mutate: categoryRefresh, } = useSWR("/category/all", fetcher, {
    shouldRetryOnError: false,
  });

  
  // LIKE RECIPES - PRIVATE
  const { data: likeData, error: likeError, isLoading: likeisLoading, mutate: likeMutate,} = useSWR(
    !loading && user ? "/like/my-like-recipes" : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );

  // USER POSTS - PRIVATE
  const { data: totalPost, error: totalPostError, isLoading: totalPostisLoading, mutate: totalPostMutate,} = useSWR(
    !loading && user ? `/recipe/admins/all/${type}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
    }
  );


  // USER PROFILE - PRIVATE
  const { data: userProfile, error: profileError, isLoading: userProfileisLoading, mutate: userProfileMutate,} = useSWR(
    !loading && user ? "/auth/profile" : null,
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

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
