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
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_react = require("react");

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
  const myref = (0, import_react.useRef)(null);
  const [style, setStyle] = (0, import_react.useState)(noActiveStyle);
  const [enhanceClass, setEnhanceClass] = (0, import_react.useState)([]);
  const [active, setActive] = (0, import_react.useState)(false);
  console.log("enhanceClass :>> ", enhanceClass);
  console.log("style :>> ", style);
  (0, import_react.useEffect)(() => {
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
  const scrollListener = (0, import_react.useCallback)(() => {
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
  (0, import_react.useLayoutEffect)(() => {
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
