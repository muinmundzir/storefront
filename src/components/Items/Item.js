import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ItemCard from './ItemCard'

const Item = () => {
  const products = useSelector((state) => state.shop.products)

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-2 pb-12">
        <nav id="store" className="w-full z-1 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <Link
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              to="/"
            >
              Store
            </Link>

            <div className="flex items-center" id="store-nav-content">
              <a
                className="pl-3 inline-block no-underline hover:text-black"
                href="#"
              >
                <svg
                  className="fill-current hover:text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                </svg>
              </a>
            </div>
          </div>
        </nav>

        {products &&
          products.map((product) => {
            return <ItemCard key={product.id} item={product} />
          })}
      </div>
    </section>
  )
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchItems: dispatch(fetchItems()),
//   }
// }

export default Item
// export default connect(null, mapDispatchToProps)(Item)
