export const LOAD_CHARACTER = "CHARACTER/LOAD_CHARACTER";
export const SET_CHARACTER = "CHARACTER/SET_CHARACTER";
export const KILL_CHAR_CACHE = "CHARACTER/KILL_CHAR_CACHE";

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

export const killCharacterCache = () => {
  return {
    type: KILL_CHAR_CACHE
  };
};

const initialState = Immutable.fromJS({
  // id : CharacterModel
});

export default function characterReducer (state = initialState, action) {
  switch (action.type) {

  case SET_CHARACTER:
    const id = action.model.get("id");
    if (!state.get(id)) {
      state = state.set(id, action.model);
    }
    break;
  case KILL_CHAR_CACHE:
    state = new Immutable.Map();
    break;
  }
  return state;
}
