import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "@lib/helmet";
import HomePage from "./pages/HomePage";
import InternshipsPage from "./pages/InternshipsPage";
import JobsPage from "./pages/JobsPage";
import ResearchPage from "./pages/ResearchPage";
import RemoteInternshipsPage from "./pages/RemoteInternshipsPage";
import OpportunityPage from "./pages/OpportunityPage";
import NotFoundPage from "./pages/NotFoundPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsPage from "./pages/TermsPage";
import DisclaimerPage from "./pages/DisclaimerPage";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import InstituteHubPage from "./pages/InstituteHubPage";
import PageTransition from "./components/PageTransition";
import AuthPage from "./pages/AuthPage";
import SavedPage from "./pages/SavedPage";
import PageViewTracker from "./components/PageViewTracker";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Helmet>
        <html lang="en" />
        <link rel="sitemap" type="application/xml" href="https://internshipshub.in/sitemap.xml" />
        <meta name="googlebot" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="bingbot" content="index,follow" />
      </Helmet>
      <SiteHeader />
      <PageTransition />
      <PageViewTracker />
      <Suspense fallback={<div className="flex flex-1 items-center justify-center">Loading…</div>}>
        <main id="main" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/internships/iit-internships" element={<InstituteHubPage instituteType="IIT" />} />
            <Route path="/internships/nit-internships" element={<InstituteHubPage instituteType="NIT" />} />
            <Route path="/internships/iiit-internships" element={<InstituteHubPage instituteType="IIIT" />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/remote-internships" element={<RemoteInternshipsPage />} />
            <Route path="/internships/:slug" element={<OpportunityPage category="internship" />} />
            <Route path="/jobs/:slug" element={<OpportunityPage category="job" />} />
            <Route path="/research/:slug" element={<OpportunityPage category="research" />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/saved" element={<SavedPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </Suspense>
      <SiteFooter />
    </div>
  );
};

export default App;
