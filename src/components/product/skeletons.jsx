import MaxWidthWrapper from "@/components/max-width-wrapper";

export function SponsoredSectionSkeleton() {
  return (
    <div className="min-h-[200px] rounded-xl flex flex-col p-2 gap-4 ">
      <div className="w-40 bg-gray-200 h-5 rounded-xl animate-pulse shrink-0"></div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <SponsoredCardSkeleton key={item} />
        ))}
      </div>
    </div>
  );
}

export function SponsoredCardSkeleton() {
  return (
    <div className="w-full h-[120px] gap-2 rounded-xl border px-2 text-sm justify-between items-center flex hover:shadow-md">
      {/* image */}
      <div className="h-[100px] aspect-square bg-gray-200 flex justify-center items-center rounded-xl animate-pulse shrink-0">
        <img
          src="/assets/logo.png"
          alt=""
          className="grayscale brightness-150 max-w-[90px] h-auto"
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <div className="w-full bg-gray-200 h-4 rounded-xl animate-pulse"></div>
        <div className="w-2/3 bg-gray-200 h-5 rounded-xl animate-pulse"></div>
        <div className="w-1/4 bg-gray-200 h-5 rounded-xl animate-pulse"></div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <>
      <MaxWidthWrapper>
        <div className="p-2 rounded-xl">
          <div className="flex justify-center w-full">
            <div className="flex flex-col lg:flex-row w-full items-center lg:items-start lg:justify-center gap-2">
              {/* <div className="hidden lg:block order-2 lg:order-1 lg:w-[300px] max-w-[800px] w-full rounded-xl animate-pulse bg-gray-200 h-[200px] shrink-0 border"></div> */}
              <div className="flex flex-col gap-2 order-1 lg:order-2 w-full">
                <div className="w-full rounded-xl animate-pulse h-[100px] flex gap-2 flex-col ">
                  <div className="w-full rounded-xl bg-gray-200 h-[40px]"></div>
                  <div className="flex items-center gap-10 w-full">
                    <div className="w-2/6 rounded-xl bg-gray-200 h-[25px]"></div>
                    <div className="w-4/12 full rounded-xl bg-gray-200 h-[25px]"></div>
                  </div>
                  <div className="w-3/6 rounded-xl bg-gray-200 h-[20px]"></div>
                </div>
                <div className="w-full rounded-xl animate-pulse bg-gray-200 h-[250px] lg:h-[400px] flex justify-center items-center">
                  <img
                    src="/assets/logo.png"
                    alt=""
                    className="grayscale brightness-150"
                  />
                </div>
                <div className="w-full rounded-xl animate-pulse bg-gray-200 h-[150px]"></div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}

export function SectionSkeleton() {
  return (
    <>
      <div className="bg-white min-h-[200px] rounded-xl flex flex-col p-6 gap-4 ">
        <div className="w-40 bg-gray-200 h-5 rounded-xl animate-pulse shrink-0"></div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((item, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </>
  );
}

export function HeroSkeleton() {
  return (
    <>
      <div className="md:h-[400px] border rounded-xl p-2 flex flex-col md:flex-row justify-between gap-4">
        <div className="h-[140px] md:h-full w-full md:w-[250px] bg-gray-200 animate-pulse rounded-xl shrink-0"></div>
        <div className="h-[250px] aspect-square md:aspect-auto md:h-full w-full bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="hidden lg:flex flex-col w-[200px] bg-gray-200 rounded-xl animate-pulse shrink-0"></div>
      </div>
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <>
      <div className="w-full lg:max-w-[250px] h-[200px] sm:h-[250px] overflow-hidden gap-2 rounded-xl border p-2 text-sm justify-between flex-col flex hover:shadow-md">
        <div className="h-[150px] sm:h-[180px] w-full bg-gray-200 flex justify-center items-center rounded-xl animate-pulse">
          <img
            src="/assets/logo.png"
            alt=""
            className="grayscale brightness-150 w-[40px] sm:w-[100px]"
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full bg-gray-200 h-4 rounded-xl animate-pulse"></div>

          <div className="justify-between flex">
            <div className="w-2/3 bg-gray-200 h-5 rounded-xl animate-pulse"></div>
            <div className="w-1/4 bg-gray-200 h-5 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </>
  );
}
