import { Link } from "react-router-dom";
import { browserType } from "@/store";

export default function Breadcrumb({ routes = [] }) {
  const { isMobile } = browserType();
  return (
    <>
      {/* {isMobile && ( */}
        <nav aria-label="Breadcrumb" className="pt-1 pb-2">
          <ol className="inline-flex flex-wrap break-words whitespace-break-spaces items-center gap-1 text-sm text-gray-600">
            <li>
              <Link to="/" className="block transition hover:text-gray-700">
                Home
              </Link>
            </li>

            {routes.length !== 0 && (
              <li className="rtl:rotate-180 ">
                <Arrow />
              </li>
            )}

            {routes.map((item, idx) => (
              <li key={idx} className="items-center gap-2 inline-flex">
                <Link
                  to={item?.route}
                  className="block transition hover:text-gray-700 break-words whitespace-break-spaces"
                >
                  {item?.name}
                </Link>

                {routes.length - 1 !== idx && (
                  <span className="rtl:rotate-180">
                    <Arrow />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      {/* )} */}
    </>
  );
}

function Arrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-brandDarkGray"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}
