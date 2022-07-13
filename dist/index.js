'use strict';

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.jsx
var src_exports = {};
__export(src_exports, {
  useScrollAnim: () => useScroll_exports
});
module.exports = __toCommonJS(src_exports);

// src/useScroll.jsx
var useScroll_exports = {};
__export(useScroll_exports, {
  default: () => useScroll_default
});
var import_react = require("react");
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
  const [style, setStyle] = (0, import_react.useState)(noActiveStyle);
  const [enhanceClass, setEnhanceClass] = (0, import_react.useState)([]);
  const [active, setActive] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
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
  const scrollListener = (0, import_react.useCallback)(() => {
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
  (0, import_react.useLayoutEffect)(() => {
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  });
  return { className: enhanceClass.join(" "), style, trigger };
};
var useScroll_default = useScrollAnim;
