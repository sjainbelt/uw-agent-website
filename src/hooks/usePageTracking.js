import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";
import { trackPageView } from "../analytics/posthog";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    trackPageView(location.pathname + location.search);
  }, [location]);
};

export default usePageTracking;
