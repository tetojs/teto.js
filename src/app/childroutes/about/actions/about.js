import About from '../models/about'

export function fetchAbout (payload) {
  return {
    type: 'FETCH_ABOUT',
    payload: new About().GET(payload)
  }
}

export function modifyAbout (payload) {
  return {
    type: 'MODIFY_ABOUT',
    payload: new About().PUT(payload)
  }
}
