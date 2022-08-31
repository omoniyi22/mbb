import { GET_PROJECTS_UPTO_DATE, GET_PROJECT_IN_USE } from "./../TYPES"

const initialState = {
	projects: [],
	project: {}
}

export default function ProjectReducer (state = initialState, action) {
	switch (action.type) {
		case GET_PROJECT_IN_USE:
			return {
				...state,
				project: action.payload,
			}

		case GET_PROJECTS_UPTO_DATE:
			return {
				...state,
				projects: action.payload,
			}
		default:
			return state;
	}
}