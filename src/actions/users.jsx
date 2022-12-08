import { RECEIVE_USERS } from '../constants/users';

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
