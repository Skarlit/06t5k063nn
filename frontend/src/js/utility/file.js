export function readImageFile(fileBlob, cb, opt) {
  opt = opt || {};
  var f = new FileReader();
  f.onload = (e) => {
    cb(f.result, e);
  };
  f.readAsDataURL(fileBlob);
}
