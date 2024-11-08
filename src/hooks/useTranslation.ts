import { useTranslation } from 'react-i18next'

export const useFormatDate = () => {
  const { i18n } = useTranslation()

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return new Intl.DateTimeFormat(i18n.language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    }).format(d)
  }

  return { formatDate }
}
