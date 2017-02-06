import nullReducer from "./null_reducer";

const httpRegex = /^(http)([^s])/;
function filterHttpUrl(url) {
  if (httpRegex.test(url)) {
    return url.replace(httpRegex, "$1s$2");
  }
  return url;
}

function getCSRFToken() {
  return document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");
}

export default { nullReducer, filterHttpUrl, getCSRFToken };
