import { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';

// src/index.jsx

// src/utils.js
var getOriginClassName = (ele) => {
  console.log("retureclass :>> ", ele.current.getAttribute("class"));
  return ele.current.getAttribute("class");
};

// src/index.jsx
var defaultThreshold = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
var noActiveStyle = {
  contentVisibility: "hidden"
};
var activeStyle = {
  contentVisibility: "visible"
};
var useScrollAnim = (options = {}) => {
  const {
    threshold = defaultThreshold,
    at = 200,
    play = "xs"
  } = options;
  const myref = useRef(null);
  const [style, setStyle] = useState(noActiveStyle);
  const [enhanceClass, setEnhanceClass] = useState([]);
  const [active, setActive] = useState(false);
  console.log("enhanceClass :>> ", enhanceClass);
  console.log("style :>> ", style);
  useEffect(() => {
    if (active) {
      console.log("set");
      setStyle(activeStyle);
      setEnhanceClass([getOriginClassName(myref), play]);
      return;
    }
    setStyle(noActiveStyle);
    setEnhanceClass([enhanceClass[0]]);
  }, [active]);
  const trigger = () => {
    setActive(true);
  };
  const scrollListener = useCallback(() => {
    if (active)
      return;
    const { top } = myref.current.getBoundingClientRect();
    if (top < at) {
      trigger();
    }
    if (top > window.innerHeight) {
      setActive(false);
    }
  }, []);
  useLayoutEffect(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });
  if (!enhanceClass.length) {
    return { ref: myref, style };
  }
  return { ref: myref, style, className: enhanceClass.join(" ") };
};
var src_default = useScrollAnim;

export { src_default as default };
