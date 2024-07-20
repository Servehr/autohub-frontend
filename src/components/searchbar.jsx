import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import categories from "@/constant/categories";
import { searchStore } from "@/store";
import currencyFormatter from "@/utils/currency-formatter";
import { useQuery } from "react-query";
import { fetchSuggestions } from "@/apis/ads";
import { generateProductDetailsRouteWithSlugUrl } from "@/constant/links";
import SearchIcon from "@/assets/icons/search.svg";

export default function SearchBar({ customStyle = "" }) {
  const { pathname } = useLocation();
  const { query, setQuery } = searchStore((state) => state);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: !!debouncedQuery,
  });

  const handleSearch = (e) => {
    setShowSuggestions(false);
    inputRef.current.blur();
    e.preventDefault();
    navigate(`/search?description=${query}`);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setShowSuggestions(false);
      setDebouncedQuery("");
      return;
    }

    const getData = setTimeout(() => {
      setDebouncedQuery(query);
      setShowSuggestions(true);
    }, 1000);

    return () => clearTimeout(getData);
  }, [query]);

  useEffect(() => {
    setShowSuggestions(false);
  }, [pathname]);

  return (
    <form
      onSubmit={handleSearch}
      className={`h-[50px] rounded-lg w-full border-black/30 bg-brandGray relative flex items-center gap-1 sm:gap-4 ${customStyle} relative`}
    >
      <input
        type="text"
        required
        ref={inputRef}
        name="search"
        autoComplete="off"
        aria-label="Search name, brand or year"
        value={query}
        className="text-black h-full w-full bg-transparent text-sm outline-none px-4 rounded-lg focus:border focus:border-brandGreen focus:shadow-brandGreen/30 focus:shadow"
        placeholder="Search name, brand or year"
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value === "") {
            setShowSuggestions(false);
          }
        }}
      />

      <button
        type="submit"
        disabled={!query}
        className="absolute cursor-pointer right-2 text-brandDarkGray h-[40px] px-2 sm:px-4 text-xs font-bold rounded-[5px]"
      >
        <img src={SearchIcon} alt="" />
      </button>

      {data && data?.length !== 0 && showSuggestions && (
        <>
          <div
            className="w-full min-h-[100px]  bg-white border absolute top-[52px] p-5 rounded-lg shadow "
            onBlur={() => {
              setShowSuggestions(false);
            }}
          >
            <h2 className="text-brandDarkGray text-sm mb-4 ">
              Showing result suggestion for{" "}
              <span className="font-bold">{query}</span>
            </h2>

            <div className="flex flex-col gap-2">
              {data.slice(0, 5).map((suggestion, idx) => (
                <Link
                  key={idx}
                  to={generateProductDetailsRouteWithSlugUrl(
                    suggestion.category_id,
                    suggestion.slug
                  )}
                  onClick={() => setShowSuggestions(false)}
                >
                  <div
                    key={idx}
                    className="text-sm hover:bg-brandGreen/10 p-2 rounded duration-150 transition border-b"
                    // onClick={() => navigate(`/product/${suggestion.slug}`)}
                  >
                    <h3 className="text-brandGreen font-semibold">
                      {suggestion?.title}
                    </h3>

                    <p className="text-xs">
                      <span>
                        {
                          categories.filter(
                            (category) =>
                              category.id === suggestion?.category_id
                          )[0]?.name
                        }
                      </span>{" "}
                      <span>
                        (
                        {`${
                          suggestion?.lga?.name && `${suggestion.lga.name},`
                        } ${suggestion?.state?.name}`}
                        )
                      </span>
                    </p>
                    <p className="text-xs">
                      Price: <span>{currencyFormatter(suggestion.price)}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* <div className="bg-neutral-700/50 h-screen w-screen top-0 left-0 fixed"></div> */}
        </>
      )}
    </form>
  );
}

SearchBar.propTypes = {
  classname: PropTypes.string,
};
