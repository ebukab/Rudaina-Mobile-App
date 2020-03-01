import { USER } from '../actions/authActions';

const initialState = {
    user: null,
};

export default (state = initialState, action) => {
    // console.log("user reducer is called ");
    // console.log(action.user)
    switch (action.type) {
		case USER:
			return {
                user: action.user
			};
    }
    return state;
};
