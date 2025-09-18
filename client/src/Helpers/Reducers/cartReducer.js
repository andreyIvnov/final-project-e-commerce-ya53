const initialState = {
    carts: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CARTS':
            return { ...state, carts: action.payload }
        case 'ADD_TO_CARTS':
            return { ...state, carts: [...state.carts, action.payload] }
        case 'REMOVE_FROM_CARTS':
            return { ...state, carts: state.carts.filter(item => item.id !== action.payload.id) }
        default:
            return state
    }
}

export default cartReducer
