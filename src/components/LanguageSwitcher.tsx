import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lng: string) => {
    try {
      i18n.changeLanguage(lng);
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <select
      id="language-select"
      value={i18n.language}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className="block md:w-[12.5rem] w-36 h-fit px-4 py-3 md:text-base text-sm text-gray-900 border border-gray-300 rounded-lg ring-none bg-gray-50
                focus:shadow-none focus:border-gray-300 focus:outline-none focus:appearance-none focus:ring-transparent focus:ring-none
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-none dark:focus:border-gray-500 dark:focus:outline-none dark:focus:ring-none dark:focus:ring-transparent "
    >
      <option value="en">{t('languages.en')}</option>
      <option value="vi">{t('languages.vi')}</option>
      <option value="zh-TW">{t('languages.zh-TW')}</option>
    </select>
  );
};

export default LanguageSwitcher;
