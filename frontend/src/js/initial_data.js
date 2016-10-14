import { fromJS } from "immutable";
var initialData;

if (process.env.NODE_ENV == "production") {
  initialData = window.initialDate;
} else {
  initialData = fromJS({
    characterCreate: {
      
    }
  });
}

export default initialData;
