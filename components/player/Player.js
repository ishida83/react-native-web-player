import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import Phone from './Phone'
import Sandbox from './Sandbox'

export default class extends PureComponent {
  render() {
    const {id, width, platform, scale, assetRoot} = this.props

    return (
      <Phone
        width={width}
        device={platform}
        scale={scale}
      >
        <Sandbox
          id={id}
          assetRoot={assetRoot}
        />
      </Phone>
    )
  }
}
