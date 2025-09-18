import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="page-container content-wrapper text-center">
      <p className="text-base font-semibold text-blue-600">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
