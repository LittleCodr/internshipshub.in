import { Helmet } from "@lib/helmet";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <Helmet>
        <title>Page not found | internshipshub.in</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-lg text-sm text-slate-600">
        The page you are looking for has either expired or moved. Browse the latest internships and jobs curated for Indian
        students.
      </p>
      <Link to="/" className="rounded bg-brand-accent px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600">
        Go back home
      </Link>
    </div>
  );
};

export default NotFoundPage;
