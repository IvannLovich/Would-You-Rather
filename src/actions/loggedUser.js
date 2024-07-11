import { SET_USER } from '../constants/loggedUser';


export function setAuthUser(id) {
  return {
    type: SET_USER,
    id,
  };
}

export function handleSetAuthUser(id) {
  return (dispatch) => {
    dispatch(setAuthUser(id));
  };
}
