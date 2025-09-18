const initialState = {
    products: [],
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload }
        case 'ADD_PRODUCT':
            return { ...state, products: [...state.products, action.payload] }
        case 'UPDATE_PRODUCT':
            return { ...state, products: state.products.map(prod => prod.id === action.payload.id ? { ...prod, ...action.payload } : prod) }
        default:
            return state
    }
}

export default productReducer
