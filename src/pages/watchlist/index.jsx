import MaxWidthWrapper from "@/components/max-width-wrapper";
import { WatchList } from "../user/shopping";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/breadcrumb";

export default function WatchlistPage() {
  return (
    <>
      <Helmet>
        <title>Watchlist | Autohub</title>
        <meta name="description" content="The Home For Automobiles" />
      </Helmet>

      <main className="px-3 mt-3 mb-10">
        <MaxWidthWrapper>
          <Breadcrumb routes={[{ name: "Watchlist", link: "/watchlist" }]} />
          <div>
            <div className="bg-brandGreen/10 w-full rounded ">
              <p className="py-2 px-3 text-brandGreen font-semibold">
                Watchlist
              </p>
            </div>

            <div className="mt-1 border w-full p-2 min-h-[200px] rounded">
              <WatchList />
            </div>
          </div>
        </MaxWidthWrapper>
      </main>
    </>
  );
}
