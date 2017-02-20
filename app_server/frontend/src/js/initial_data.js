import { fromJS } from "immutable";
let initialData;

if (process.env.NODE_ENV == "production") {
  initialData = window.initialDate;
} else {
  initialData = fromJS({
    characterCreate: {

    },
  });
}

export default initialData;
