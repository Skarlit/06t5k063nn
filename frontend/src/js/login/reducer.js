// login
// @params isLoggedIn {boolean}
// @params userName {boolean}
// @params userImage {string}



export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.Map();
  }
  console.log(state);
  return state;
}
