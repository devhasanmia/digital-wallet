import AuthNavbar from "../ui/AuthNavbar"

const NewUserLayout = () => {
  return (
    <>
    const Header = ({ isDarkMode, setDarkMode, onRestartTour }) => (
    <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">nPay</h1>
        <div className="flex items-center gap-2 sm:gap-4">
            <button id="theme-toggle" onClick={() => setDarkMode(!isDarkMode)} className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button title="Restart Tour" onClick={onRestartTour} className="text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full">
                <Settings size={20} />
            </button>
            <Bell className="text-gray-500 dark:text-gray-400 cursor-pointer" />
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">A</div>
        </div>
    </header>
);
    <AuthNavbar/>
    </>
  )
}

export default NewUserLayout