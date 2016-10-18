export function readImageFile(fileBlob, cb, opt) {
  opt = opt || {};
  var f = new FileReader();
  f.onload = (e) => {
    cb(e, f.result);
  };
  f.readAsDataURL(fileBlob);
}
