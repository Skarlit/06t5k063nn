const httpRegex = /^(http)([^s])/;

export function filterHttpUrl (url) {
  if (httpRegex.test(url)) {
    return url.replace(httpRegex, "$1s$2");
  }
  return url;
}

export function getCSRFToken () {
  return document.querySelector("meta[name=\"csrf-token\"]").getAttribute("content");
}

export function nullReducer (state = {}) {
  return state;
}

export function readImageFile (fileBlob, cb, opt) {
  opt = opt || {};
  const f = new FileReader();
  f.onload = (e) => {
    cb(e, f.result);
  };
  f.readAsDataURL(fileBlob);
}

export function base64ToPng (base64Str) {
  var png = base64Str.split(",")[1];

  return new Blob([window.atob(png)], {type: "image/png", encoding: "utf-8"});
}

export function imgUrl2Blob (url, cb) {
  let img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    let c = document.createElement("canvas");
    let ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    cb(c.toDataURL, this.width, this.height);
  };
}
