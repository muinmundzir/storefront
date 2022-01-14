/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'

const ItemCard = (props) => {
  const dispatch = useDispatch()
  const { item } = props
  const isDiscount = item.prices.isDiscount

  const viewItemHandler = (item) => {
    dispatch({ type: 'LOAD_CURRENT_ITEM', payload: item })
  }

  return (
    <>
      <div
        onClick={() => viewItemHandler(item)}
        className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col"
        key={item.id}
      >
        <Link to={`/product/${item.id}`}>
          <img
            className="hover:grow hover:shadow-lg object-cover w-full"
            alt="item illustration"
            src={item.image}
          />
          <div className="pt-3 flex items-center justify-between">
            <p className="truncate flex-1">{item.name}</p>
          </div>
          <p className="pt-1 text-gray-900">
            <span className="title-font font-medium text-lg text-gray-900">
              <NumberFormat
                value={
                  isDiscount
                    ? item.prices.discountPrice
                    : item.prices.actualPrice
                }
                prefix="Rp. "
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
              />
            </span>
            {isDiscount && (
              <span className="ml-2 line-through text-xs font-semibold text-red-600">
                <NumberFormat
                  value={item.prices.actualPrice}
                  prefix="Rp. "
                  displayType="text"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </span>
            )}
          </p>
        </Link>
      </div>
    </>
  )
}

export default ItemCard
