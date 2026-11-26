import RecipeNotAvailable from '@/components/AlgoliyaNotFound'
import SectionGrid from '@/components/SectionGrid.js'
import { getFillterRecipes } from '@/services/uploadServices.js'
import React from 'react'


export default async function ({ params }) {

  try {
    const { type } = await params;
    const filterRecipe = await getFillterRecipes(type);
    let data = filterRecipe?.data;
    
    if (data?.length === 0) {
      return <RecipeNotAvailable />
    }
    
    return (    
    <div className='pt-35' >
      <SectionGrid filterRecipe={data} />
    </div>
    )

  } catch (err) {
    // console.log(err)
    return <RecipeNotAvailable />;
  }

}
