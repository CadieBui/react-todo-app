export const priorityColors = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

export const getToday = (): string => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const formatDate = (date: Date | string) => {
  if (!date) return new Date().toISOString().split('T')[0]
  
  const dateObj = date instanceof Date ? date : new Date(date)
  return dateObj.toISOString().split('T')[0]
}
