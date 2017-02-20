const httpRegex = /^(http)([^s])/;
export function filterHttpUrl(url) {
  if (httpRegex.test(url)) {
    return url.replace(httpRegex, "$1s$2");
  }
  return url;
}

export function getCSRFToken() {
  return document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");
}


export function nullReducer(state = {}) {
  return state;
}
