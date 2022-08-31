import { AUTH_TOKEN } from "../apis/base";
import { LOGIN, LOGOUT, REGISTER } from "./../TYPES"

const initialState = {
	token: localStorage.getItem(AUTH_TOKEN),
	isAuthenticated: false,
	user: {},
}

export default function (state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem(AUTH_TOKEN, action.payload.token)
			return {
				...state,
				user: action.payload.user,
				isAuthenticated: true,
			}

		case LOGOUT:
			localStorage.removeItem(AUTH_TOKEN);
			return {
				token: null,
				user: {},
				isAuthenticated: false,
			}
		default:
			return state;
	}
}