// Reducer for Loading and Alerts

import { OPEN_ALERT, CLOSE_ALERT } from "./../TYPES"
import { START_LOADING, STOP_LOADING } from "./../TYPES"

const initialState = {
	loading: false,
	status: null,
	message: null
}

export default function ProjectReducer (state = initialState, action) {
	switch (action.type) {
		case START_LOADING:
			return {
				...state,
				loading: true,
			}

		case STOP_LOADING:
			return {
				...state,
				loading: false,
			}
		case OPEN_ALERT:
			return {
				loading: false,
				status: action.payload.status,
				message: action.payload.msg
			}
		case CLOSE_ALERT:
			return {
				loading: false,
				status: null,
				message: null
			}
		default:
			return state;
	}
}