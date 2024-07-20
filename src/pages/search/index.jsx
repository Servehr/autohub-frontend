import { fetchSearch } from "@/apis/ads";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { ProductCard2 } from "@/components/product/product-card";
import { SponsoredSection } from "@/components/product/sections";
import { parseQueryParams } from "@/utils/ad";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useLocation, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = parseQueryParams(location.search);
  const [filters, setFilters] = useState({});

  // Fetch search results based on filters
  //   prettier-ignore
  const { data, isLoading } = useQuery(["search", queryParams], () =>
    fetchSearch(queryParams), {
      cacheTime: 0,   // Prevent caching
  staleTime: 0, // Consider the data as stale immediately
    }
  );

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => {
      return { ...prevFilters, ...newFilters };
    });
  };

  useEffect(() => {
    // Create a function to update the URL query parameters
    const updateSearchParams = () => {
      const newParams = new URLSearchParams();
      // Add filters to the URL query parameters
      for (const key in filters) {
        if (filters[key] !== null && filters[key] !== undefined) {
          newParams.append(key, filters[key]);
        }
      }
      // Update the URL without a page refresh using navigate
      navigate({ search: newParams.toString() });
    };
    // Call the update function whenever filters change
    updateSearchParams();
  }, [filters, navigate]);

  useEffect(() => {
    const queryParams = parseQueryParams(location.search);
    updateFilters(queryParams);
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Search | Autohub</title>
        <meta name="description" content="The Home For Automobiles" />
      </Helmet>

      <div className="px-3 sm:px-6 md:px-10 my-10 mt-5 pb-20">
        <MaxWidthWrapper>
          <div className="flex flex-col gap-5">
            {/* <SearchBar customStyle="lg:hidden" /> */}

            <div className="flex gap-5 relative">
              {/* <div className="w-[250px] bg-white animate-pulse min-h-[400px] rounded shrink-0 h-max hidden md:block shadow"></div> */}

              <div className="w-full">
                <h1 className="font-semibold text-2xl md:text-3xl text-brandGreen">
                  Search result{" "}
                  {filters.description && `for ${filters.description}`}
                </h1>

                <div className="pb-4  w-full text-sm text-brandDarkGray font-semibold items-center flex">
                  <p>
                    {data
                      ? data.length === 1
                        ? `${data.length} product found`
                        : `${data.length} products found`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-col w-full rounded-lg h-full">
                  {/* Render your search results here */}
                  {isLoading ? (
                    /* Placeholder or loading UI while the data is being fetched */
                    <div className="flex justify-center items-center flex-col min-h-[calc(100vh-300px)] h-full py-10 text-brandGreen">
                      <BounceLoader color="#1C9236" />

                      <p className="text-brandDarkGray font-semibold italic text-sm">
                        Loading results...
                      </p>
                    </div>
                  ) : data && data.length > 0 ? (
                    /* Render your search results based on the 'result' data
                     */
                    <ResponsiveMasonry
                      columnsCountBreakPoints={{
                        300: 1,
                        481: 2,
                        1024: 3,
                        1280: 4,
                      }}
                    >
                      <Masonry gutter="12px">
                        {data.map((product) => (
                          /* Render each result item here */
                          <ProductCard2 key={product.id} data={product} />
                        ))}
                      </Masonry>
                    </ResponsiveMasonry>
                  ) : (
                    /* No results found message */
                    <div className="h-full flex justify-center items-center flex-col gap-2 py-10">
                      <p className="text-brandDarkGray font-medium italic text-sm">
                        There are no results for your search.
                      </p>
                      <button
                        onClick={() => navigate("/")}
                        className="bg-brandGreen text-sm h-[45px] px-3 text-white font-medium rounded-lg"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {data && <SponsoredSection />}
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
