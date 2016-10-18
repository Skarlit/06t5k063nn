

export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.fromJS([1,2 ,3]);
  }
  console.log(state);
  return state;
}
