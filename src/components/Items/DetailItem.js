import { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import NumberFormat from 'react-number-format'
import { toast } from 'react-toastify'

const DetailItem = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const getProduct = useCallback(async () => {
    const result = await axios.get(`http://localhost:3000/products/${id}`)
    setProduct(result.data)
  }, [id])

  useEffect(() => {
    getProduct()
  }, [])

  const cartHandler = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    toast.success('Item added to cart')
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      {product && (
        <div className="container px-5 py-4 my-12 md:my-24 mx-auto rounded-md shadow-md bg-slate-50/95">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt={`${product.name} illustration`}
              className="md:flex-1 lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
              src={product.image}
            />
            <div className="md:flex-1 lg:flex-auto lg:w-1/2 w-full md:pl-5 md:my-auto lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {product.name}
              </h1>
              <p className="leading-relaxed">Seller: {product.seller}</p>
              <p className="leading-relaxed">Stock: {product.stock}</p>
              <div className="flex mt-4 md:mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
              <div className="flex flex-col md:flex-row">
                <span className="title-font self-center font-medium text-2xl md:text-xl lg:text-2xl text-gray-900">
                  <NumberFormat
                    value={
                      product.prices.isDiscount
                        ? product.prices.discountPrice
                        : product.prices.actualPrice
                    }
                    prefix="Rp. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                  {product.prices.isDiscount && (
                    <span className="ml-2 line-through text-sm font-semibold text-red-600">
                      <NumberFormat
                        value={product.prices.actualPrice}
                        prefix="Rp. "
                        displayType="text"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </span>
                  )}
                </span>

                <button
                  onClick={cartHandler}
                  className="flex w-full md:w-auto mt-4 md:mt-0 justify-center mx-auto md:mr-0 font-semibold text-white bg-blue-500
                  } border-0 py-2 px-2 md:px-5 rounded-md focus:outline-none"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default DetailItem
