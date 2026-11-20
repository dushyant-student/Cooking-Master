import SearchResults from "@/components/searchResults";

export default async function SearchPage({ searchParams,}) {

  const params = await searchParams;

  const query = params?.q || "";


  return (

    <main className="p-8">

      <h1 className="text-xl font-bold mb-8 mt-14 ">

        Search Results

        {query && (
          <>
            {" "}
            for "{query}"
          </>
        )}

      </h1>


      <SearchResults
        query={query}
      />

    </main>

  );

}