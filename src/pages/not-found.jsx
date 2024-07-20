import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-[500px] md:min-h-[calc(100vh-250px)] min-h-[calc(100vh-250px)] flex justify-center items-center">
      <div className="text-center">
        <h1 className="font-black text-brandGreen/20 text-9xl">404</h1>

        <p className="text-2xl font-bold tracking-tight text-brandGreen sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <Link
          to="/"
          className="inline-block px-5 py-3 mt-6 text-sm font-semibold text-white bg-brandGreen rounded cursor-pointer"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
