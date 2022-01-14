import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NumberFormat from 'react-number-format'
import { toast } from 'react-toastify'

const CartItem = ({ data, isDiscount }) => {
  const dispatch = useDispatch()
  const [countQty, setCountQty] = useState(data.qty)

  useEffect(() => {
    if (countQty > data.stock) {
      setCountQty(data.stock)
      dispatch({
        type: 'ADJUST_QTY',
        payload: {
          id: data.id,
          qty: data.stock,
        },
      })
    }
  }, [])

  const price = isDiscount
    ? data.prices.discountPrice * data.qty
    : data.prices.actualPrice * data.qty

  const onChangeHandler = (event, id) => {
    const { value } = event.target
    let qty = parseInt(value)

    if (value > data.stock) {
      toast.error("Items amount cannot exceeds it's stock")
    } else if (value <= 0 || value === '') {
      toast.error('Minimal items amount is 1')
    } else {
      setCountQty(value)
      dispatch({
        type: 'ADJUST_QTY',
        payload: {
          id,
          qty,
        },
      })
    }
  }

  const removeFromCartHandler = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } })
    toast.success('Item removed from cart')
  }

  return (
    <div className="border-b-2 flex flex-col md:flex-row md:justify-between md:w-full items-center pb-4 border-gray-200 mb-4">
      <div className="mb-4 p-2 flex-1">
        <img
          className="w-64 mb-3 mx-auto"
          src={data.image}
          alt={`item ${data.name}`}
          srcSet=""
        />
        <h2 className="font-semibold text-center">{data.name}</h2>
        <p className="text-center">Stock: {data.stock}</p>
      </div>
      <div className="mb-4 flex items-center justify-center flex-1 lg:flex-auto">
        <input
          type="number"
          min="1"
          max={data.stock}
          className="rounded-md w-20 border-2 bg-white mx-2 py-2 px-3 font-semibold text-center"
          value={countQty}
          onChange={(event) => onChangeHandler(event, data.id)}
        />{' '}
        items
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="mb-2 text-center tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-lg">
          <NumberFormat
            value={price}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </h3>
        <button
          onClick={() => {
            removeFromCartHandler(data.id)
          }}
          className="py-2 px-8 mx-auto bg-gray-200 rounded-md font-semibold text-gray"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default CartItem
