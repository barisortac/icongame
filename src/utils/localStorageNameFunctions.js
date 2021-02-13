export const getLocalStorageName = () => {
  return localStorage.getItem('name')
}

export const setLocalStorageName = (name) => (
  localStorage.setItem('name', name)
)
