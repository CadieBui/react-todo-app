import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';

interface LayoutProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Layout = ({ darkMode, onToggleDarkMode }: LayoutProps) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-6">
      <nav className="bg-white dark:bg-gray-800 shadow md:mb-6 mb-2">
        <div className="max-w-7xl w-full mx-auto md:px-4 px-6 lg:px-8">
          <div className="flex flex-1 md:gap-10 gap-4 justify-between items-center h-16 w-full">
            <div className="flex flex-1 items-center justify-between">
              <div className="flex">
                <Link 
                  to="/"
                  className="flex items-center px-4 md:text-base text-sm text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {t('layout.home')}
                </Link>
                
              </div>
              <LanguageSwitcher/>
            </div>
            <DarkModeToggle darkMode={darkMode} onToggle={onToggleDarkMode} />
          </div>
        </div>
      </nav>
      {/* Add Todo Button */}
      { !location.pathname.includes('add') && (
      <div className="max-w-7xl mx-auto md:px-4 px-6 lg:px-8 flex justify-end ">
        <Link 
          to="/add"
          className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {t('layout.addTodo')}
        </Link>
        </div>
      )}
      <main className="max-w-7xl md:mt-6 mt-2 mx-auto md:px-4 px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;