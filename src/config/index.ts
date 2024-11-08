export const config = {
  app: {
    title: import.meta.env.VITE_APP_TITLE || 'Todo App',
    darkModeEnabled: import.meta.env.VITE_ENABLE_DARK_MODE === 'true'
  },
  storage: {
    key: import.meta.env.VITE_STORAGE_KEY || 'todo_app_data'
  }
}