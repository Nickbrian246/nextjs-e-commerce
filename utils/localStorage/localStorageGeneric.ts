type Data = string | object | any[];
export function createEntityInLocalStorage(entityName: string, data: Data) {
  localStorage.setItem(entityName, JSON.stringify(data));
}
export function getEntityInLocalStorage(entityName: string) {
  const data = localStorage.getItem(entityName);
  if (data) return JSON.parse(data);
}
export function updateEntityInLocalStorage(entityName: string, data: Data) {
  const localStorageData = getEntityInLocalStorage(entityName);
  if (localStorageData) createEntityInLocalStorage(entityName, data);
  else return "no data ";
}
