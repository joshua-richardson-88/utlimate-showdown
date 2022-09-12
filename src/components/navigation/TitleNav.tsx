import { NavProps } from '.'

const TitleBar: React.FC<NavProps> = ({ showDrawer, toggle }) => {
  return (
    <>
      <div className="pl-4 xl:pl-16 space-x-8 flex h-12">
        <button
          className="visible xl:hidden"
          type="button"
          onClick={() => toggle(true)}
          title="Menu Open"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-900 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <div className="space-x-8 pr-8 md:pr-16 hidden md:block"></div>
    </>
  )
}
export default TitleBar
