export const LOAD_CHARACTER = "CHARACTER/LOAD_CHARACTER";
export const SET_CHARACTER = "CHARACTER/SET_CHARACTER";

export const loadCharacter = (id) => {
  return {
    type: LOAD_CHARACTER,
    id: id
  };
};

export const setCharacter = (charModel) => {
  return {
    type: SET_CHARACTER,
    model: charModel
  };
};

const initialState = Immutable.fromJS({
  // id : CharacterModel
});

export default function characterReducer (state = initialState, action) {
  switch (action.type) {

  case SET_CHARACTER:
    if (!state.get(action.model.get("id"))) {
      state = state.set(action.model.get("id"), action.model);
    }
  }
  return state;
}
