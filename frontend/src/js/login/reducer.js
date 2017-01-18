export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.Map();
  }
  console.log(state);
  return state;
}
