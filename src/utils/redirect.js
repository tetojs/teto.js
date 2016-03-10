import { push } from 'react-router-redux'

export default (path = '/') => {
  console.log(path)
  push(path)
}
