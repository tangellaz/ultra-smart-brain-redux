import {
	ADD_FACE_BOX,
	ON_INPUT_CHANGE,
	LOAD_DATA,
	UPDATE_DATA,
	URL_ENTERED,
	SIGN_IN,
	ROUTE,
	DISPLAY_FLAG
} from './constants.js'

const initialStateBox = {
	box: {}
}

export const addFaceBox = (state=initialStateBox, action={}) => {
	switch(action.type) {
		case ADD_FACE_BOX:
			return Object.assign({}, state, {box: action.payload})
		default:
			return state;
	}
}

const initialStateInput = {
	input: ''
}

export const inputStateChange = (state=initialStateInput, action={}) => {
	switch(action.type) {
		case ON_INPUT_CHANGE:
			return Object.assign({}, state, {input: action.payload})
		default:
			return state;
	}
}

const initialStateUser = {
  user: {
	    id: '',
	    name: '',
	    email: '',
	    entries: 0,
	    joined: ''
  }
}

export const userInfoUpdate = (state=initialStateUser, action={}) => {
	switch(action.type) {
		case LOAD_DATA:
			return Object.assign({}, state, {user: action.payload})
		case UPDATE_DATA:
			// console.log(Object.assign({}, state, {user: Object.assign({},state.user,{entries: action.payload})}));
			return Object.assign({}, state, {user: Object.assign({},state.user,{entries: action.payload})});
		default:
			return state;
	}
}

const initialStateImageUrl = {
	imageUrl: '',
}

export const imageUrlUpdate = (state=initialStateImageUrl, action={}) => {
	switch(action.type) {
		case URL_ENTERED:
			// return {...state, imageUrl: action.payload, inputCheck: true}
			return Object.assign({}, state, {imageUrl: action.payload})
		default:
			return state;
	}
}

const initialStateSignIn = {
  isSignedIn: false
}

export const signInUpdate = (state=initialStateSignIn, action={}) => {
	switch(action.type) {
		case SIGN_IN:
			return Object.assign({}, state, {isSignedIn: action.payload})
		default:
			return state;
	}
}

const initialStateRoute = {
  route: 'signin'
}

export const routeUpdate = (state=initialStateRoute, action={}) => {
	switch(action.type) {
		case ROUTE:
			return Object.assign({}, state, {route: action.payload})
		default:
			return state;
	}
}

const initialStateDisplayFlag = {
	displayFlag: true
}

export const displayFlagUpdate = (state=initialStateDisplayFlag, action={}) => {
	switch(action.type) {
		case DISPLAY_FLAG:
			return Object.assign({}, state, {displayFlag: action.payload})
		default: 
			return state;
	}
}