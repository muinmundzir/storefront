import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import CartItem from './components/Cart/CartItem'

const Cart = () => {
  const cartItem = useSelector((state) => state.shop.cart)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let items = 0
    let price = 0

    cartItem.forEach((item) => {
      items += item.qty
      price +=
        item.qty *
        (item.prices.isDiscount
          ? item.prices.discountPrice
          : item.prices.actualPrice)
    })

    setTotalItems(items)
    setTotalPrice(price)
  }, [cartItem, totalItems, setTotalItems, totalPrice, setTotalPrice])

  return (
    <section className="bg-white shadow-md my-4 mx-4 p-4 rounded-xl flex flex-col items-center justify-center">
      <header className="mb-4 md:mb-8">
        <h1 className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl">
          Shopping Cart
        </h1>
      </header>
      {cartItem.length > 0 ? (
        cartItem.map((item) => (
          <CartItem
            key={item.id}
            data={item}
            isDiscount={item.prices.isDiscount}
          />
        ))
      ) : (
        <div className="my-4 flex flex-col items-center justify-center">
          <h1 className="mt-2 mb-4">You didn't have items in shopping cart</h1>
          <Link
            to="/"
            className="bg-blue-500 text-center w-full md:w-auto rounded-md border-none py-2 px-4 md:px-6 font-semibold text-white uppercase"
          >
            Shop
          </Link>
        </div>
      )}
      <div className="flex items-center justify-between w-full md:w-1/3 md:ml-auto px-2 mb-4">
        <div className="flex flex-col">
          <h3 className="mr-auto md:mr-0 md:w-auto tracking-wide no-underline hover:no-underline font-semibold text-gray-800 text-lg">
            Sub-Total{' '}
          </h3>
          <span className="font-normal text-sm">
            (total items: {totalItems})
          </span>
        </div>
        <p className="font-semibold">
          <NumberFormat
            value={totalPrice ? totalPrice : '0'}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </p>
      </div>
      <button
        className={`${
          totalItems > 0
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 text-gray-800 cursor-not-allowed'
        } ml-auto py-2 px-4 rounded-md font-semibold `}
      >
        Checkout
      </button>
    </section>
  )
}

export default Cart
