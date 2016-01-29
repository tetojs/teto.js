import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Index from 'app/index'

function shallowRender (component) {
  const renderer = TestUtils.createRenderer()

  renderer.render(component)
  return renderer.getRenderOutput()
}

function shallowRenderWithProps (props = {}) {
  return shallowRender(<Index {...props} />)
}

describe('(App) Index', () => {
  let _component
  let _props
  let _child

  beforeEach(() => {
    _child = <h1 className="child">Child</h1>
    _props = {
      children: _child
    }

    _component = shallowRenderWithProps(_props)
  })

  it('Should render as a <div>.', () => {
    expect(_component.type).to.equal('div')
  })
})
