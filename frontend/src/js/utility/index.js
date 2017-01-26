import nullReducer from "./null_reducer";

const httpRegex = /^(http)([^s])/;
function filterHttpUrl(url) {
  if (httpRegex.test(url)) {
    return url.replace(httpRegex, "$1s$2");
  }
  return url;
}

export default {nullReducer, filterHttpUrl};
