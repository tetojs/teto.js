import assert from 'assert'

describe('(Framework) Karma Plugins', () => {
  it('Should expose "expect" globally.', () => {
    assert.ok(expect)
  })

  it('Should expose "should" globally.', () => {
    assert.ok(should)
  })

  it('Should have chai-as-promised helpers.', () => {
    const pass = new Promise(resolve => resolve('test'))
    const fail = new Promise((resolve, reject) => reject())

    return Promise.all([
      expect(pass).to.be.fulfilled,
      expect(fail).to.not.be.fulfilled
    ])
  })
})
