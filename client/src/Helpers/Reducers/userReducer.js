const initialState = {
    user: {},
    users: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload }
        case 'SET_USERS':
            return {...state, users: action.payload }
        case 'LOGOUT':
            return {...state, user: {} }
        default:
            return state
    }
}

export default userReducer
