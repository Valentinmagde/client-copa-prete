import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const ScrollToTop: React.FC = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    setVisibility(pageYOffset > 200);
  }, [pageYOffset]);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <div
      className="Scrolltop bounce"
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      aria-label="Scroll to top"
    >
      <i className="fa fa-angle-up" />
    </div>
  );
};

export default ScrollToTop;
