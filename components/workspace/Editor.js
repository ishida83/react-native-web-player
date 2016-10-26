import React, { PureComponent } from 'react'

import { options, requireAddons } from '../../utils/CodeMirror'
import { prefixObject } from '../../utils/PrefixInlineStyles'

require("../../node_modules/codemirror/lib/codemirror.css")
require("../../styles/codemirror-theme.css")

// Work around a codemirror + flexbox + chrome issue by creating an absolute
// positioned parent and flex grandparent of the codemirror element.
// https://github.com/jlongster/debugger.html/issues/63
const styles = prefixObject({
  editorContainer: {
    display: 'flex',
    position: 'relative',
    flex: '1',
    minWidth: 0,
    minHeight: 0,
  },
  editor: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
})

export default class extends PureComponent {

  static defaultProps = {
    value: '',
    onChange: () => {},
  }

  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    if (typeof navigator !== 'undefined') {
      requireAddons()

      const {value, onChange} = this.props

      this.cm = require('codemirror')(
        this.refs.editor,
        {
          ...options,
          value,
        }
      )

      this.cm.on('changes', (cm) => {
        onChange(cm.getValue())
      })
    }
  }

  componentWillUpdate(nextProps) {
    const {errorLineNumber: nextLineNumber} = nextProps
    const {errorLineNumber: prevLineNumber} = this.props

    if (this.cm) {
      if (typeof prevLineNumber === 'number') {
        this.cm.removeLineClass(prevLineNumber, "background", "cm-line-error")
      }

      if (typeof nextLineNumber === 'number') {
        this.cm.addLineClass(nextLineNumber, "background", "cm-line-error")
      }
    }
  }

  render() {
    return (
      <div style={styles.editorContainer}>
        <div style={styles.editor} ref={'editor'} />
      </div>
    )
  }
}
