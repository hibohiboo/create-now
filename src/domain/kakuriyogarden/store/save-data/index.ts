const key = 'kg-edit-chacater'
export const saveData = (data: object)=>{
  localStorage.setItem(key, JSON.stringify(data));
}
export const loadData = ()=>{
  const json  = localStorage.getItem(key)
  if(!json) return null
  return JSON.parse(json)
}
