export function modifyName (event) {
  return {
    type: 'MODIFY',
    payload: {
      name: event.target.value
    }
  }
}

export function modifyMobile (event) {
  return {
    type: 'MODIFY',
    payload: {
      mobile: event.target.value
    }
  }
}
