import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageTransition = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(60), 100);
    const t2 = setTimeout(() => setProgress(90), 220);

    window.scrollTo({ top: 0, behavior: "auto" });

    const t3 = setTimeout(() => {
      setProgress(100);
    }, 420);

    const t4 = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 680);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-50 h-1 bg-emerald-50"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-[width,opacity] duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default PageTransition;
