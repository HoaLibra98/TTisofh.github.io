import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  children: PropTypes.node
}

const defaultProps = {}

class DefaultFooter extends Component {
  render () {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props

    return (
      <div className='footer-copyright-area'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='footer-copy-right'>
                <p>
                  Copyright © 2020. All rights reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

DefaultFooter.propTypes = propTypes
DefaultFooter.defaultProps = defaultProps

export default DefaultFooter
