import {
	ADD_FACE_BOX,
	ON_INPUT_CHANGE,
	LOAD_DATA,
	UPDATE_DATA,
	URL_ENTERED,
	SIGN_IN,
	ROUTE
} from './constants.js'

export const addFaceBox = (box) => ({
	type: ADD_FACE_BOX,
	payload: box
})

export const changeInput = (input) => ({
	type: ON_INPUT_CHANGE,
	payload: input
})

export const updateUserInfo = (data) => {
	if (typeof(data) == "object") {
		return {
			type: LOAD_DATA,
			payload: data
		}
	} else {
		return {
			type: UPDATE_DATA,
			payload: data
		}
	}
}

export const updateImageUrl = (url) => ({
	type: URL_ENTERED,
	payload: url
})

export const updateSignIn = (data) => ({
	type: SIGN_IN,
	payload: data
})

export const updateRoute = (data) => ({
	type: ROUTE,
	payload: data
})