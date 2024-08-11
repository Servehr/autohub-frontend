import { Link } from "react-router-dom";

export default function NotAllowed() {
  return (
    <div className="grid h-[calc(100vh-380px)] px-4 place-content-center">
      <div className="text-center">
        <p className="text-2xl font-bold tracking-tight text-brandGreen sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">
           User Not Authorized To Access This Page
        </p>

        <div className="flex gap-2 mt-6 justify-center">
          <Link
            to="/home"
            className="inline-block px-5 py-3 text-sm font-medium  text-brandGreen rounded border border-brandGreen focus:outline-none focus:ring"
          >
            Home
          </Link>
          <Link
            to="/dashboard/profile"
            className="inline-block px-5 py-3 text-sm font-medium text-white bg-brandGreen/90 rounded hover:bg-brandGreen focus:outline-none focus:ring"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
