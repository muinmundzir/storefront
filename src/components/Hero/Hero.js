import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="container flex flex-col md:flex-row p-4 md:items-center mx-auto md:gap-4 lg:mr-auto">
      <div className="text-center md:text-left pt-4 pb-8 md:px-3 lg:px-5 lg:mb-2 lg:pt-2 lg:pb-0">
        <h1 className="lg:inline-block lg:w-2/4 text-4xl md:text-3xl lg:text-4xl font-bold uppercase my-4 md:my-3 lg:my-2">
          Shop all you wants and needs
        </h1>
        <p className="lg:w-2/3 text-lg md:text-base text-gray-400 my-3 md:my-5 lg:my-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          officiis provident amet dolores modi adipisci!
        </p>
        <Link
          to="/"
          className="bg-blue-500 md:mr-auto w-full md:w-auto rounded-md border-none py-3 px-4 md:px-6 font-semibold text-white uppercase"
        >
          Shop Now
        </Link>
      </div>
      <img
        className="rounded-xl md:w-96"
        src="./images/hero.jpg"
        alt="Shop illustration"
      />
    </section>
  )
}

export default Hero
