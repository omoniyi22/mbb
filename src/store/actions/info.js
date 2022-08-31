// INFO::: on alert message and loading message

import {
	START_LOADING, STOP_LOADING,
	OPEN_ALERT, CLOSE_ALERT
} from "./../TYPES"


export const startLoading = async (dispatch) => dispatch({ type: START_LOADING })
export const stopLoading = async (dispatch) => dispatch({ type: STOP_LOADING })

export const openAlert = async (dispatch, status, msg) => dispatch({ type: OPEN_ALERT, payload: { status, msg } })

export const closeAlert = async (dispatch) => dispatch({ type: CLOSE_ALERT })