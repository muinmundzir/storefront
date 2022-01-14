import axios from 'axios'
import * as actionTypes from './shopping-types'

const INITIAL_STATE = {
  products: [],
  cart: [],
  cartCount: 0,
}

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'items/itemsLoaded':
      return {
        ...state,
        products: action.payload,
      }
    case actionTypes.ADD_TO_CART:
      const item = state.products.find(
        (product) => product.id === action.payload.id
      )
      const isItemInCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      )
      return {
        ...state,
        cartCount: state.cartCount + 1,
        cart: isItemInCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      }
    case actionTypes.REMOVE_FROM_CART:
      const itemToBeRemove = state.cart.find(
        (item) => item.id === action.payload.id
      )

      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== itemToBeRemove.id),
        cartCount: state.cartCount - itemToBeRemove.qty,
      }
    case actionTypes.ADJUST_QTY:
      const itemToBeAdjustQty = state.cart.find(
        (item) => item.id === action.payload.id
      )

      let cartCountTmp = state.cartCount
      if (action.payload.qty > itemToBeAdjustQty.qty) {
        cartCountTmp += 1
      } else {
        cartCountTmp -= 1
      }

      return {
        ...state,
        cart: state.cart.map((product) =>
          product.id === action.payload.id
            ? { ...product, qty: action.payload.qty }
            : product
        ),
        cartCount: cartCountTmp,
      }
    default:
      return state
  }
}

export const fetchItems = async (dispatch, getState) => {
  const result = await axios.get('http://localhost:3000/products')
  dispatch({ type: 'items/itemsLoaded', payload: result.data })
}

export default shopReducer
