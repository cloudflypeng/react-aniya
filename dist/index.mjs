import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/useScroll.jsx
var useScroll_exports = {};
__export(useScroll_exports, {
  default: () => useScroll_default
});
var noActiveStyle = {
  contentVisibility: "hidden"
};
var activeStyle = {
  contentVisibility: "visible"
};
var useScrollAnim = (options = {}) => {
  const {
    at = 200,
    play = "xs",
    triggerDm = null
  } = options;
  const [style, setStyle] = useState(noActiveStyle);
  const [enhanceClass, setEnhanceClass] = useState([]);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (active) {
      setStyle(activeStyle);
      setEnhanceClass([play]);
      return;
    }
    setStyle(noActiveStyle);
    setEnhanceClass([]);
  }, [active]);
  const trigger = () => {
    setActive(true);
  };
  const scrollListener = useCallback(() => {
    var _a;
    if (active)
      return;
    const { top } = (_a = triggerDm.current) == null ? void 0 : _a.getBoundingClientRect();
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
  return { className: enhanceClass.join(" "), style, trigger };
};
var useScroll_default = useScrollAnim;

export { useScroll_exports as useScrollAnim };
