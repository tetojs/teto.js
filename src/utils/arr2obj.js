export default (arr, key) => {
  const obj = {}

  arr.forEach(val => {
    obj[val[key]] = val
  })

  return obj
}
