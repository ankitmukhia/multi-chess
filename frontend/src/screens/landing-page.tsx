import { Link } from "react-router-dom"

const LandingPage = () => {

  return <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
    <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
      <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          The Chess Board.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Challenge players from around the world in real-time.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
          <Link
            to="/game"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mb-2"
          >
            Play Online
          </Link>
        </div>
      </div>
      <div className="relative mt-16 h-80 lg:mt-8">
        <img
          className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
          src="/chess5.jpeg"
          alt="chess-board-img"
          width={1824}
          height={1080}
        />
      </div>
    </div>
  </div>
};

export default LandingPage
