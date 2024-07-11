import { SET_USER } from '../constants/loggedUser';

export default function loggedUser(state = null, action) {
  switch (action.type) {
    case SET_USER:
      return action.id;

    default:
      return state;
  }
}
