import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { formatNumber } from '../../utils'
import FlashBackground from '../FlashBackground'

class SizeColumn extends React.Component {

    componentDidUpdate(prevProps) {
        const { size, triggerFlash } = this.props
        if (size !== prevProps.size) {
            triggerFlash()
        }
    }

    componentWillUnmount() {
        const { cleanFlash, targetRef } = this.props
        cleanFlash(targetRef)
    }

    render() {
        const {size, targetRef, className } = this.props

        return (
            <div ref={targetRef} className={className}>
                {formatNumber(size, {digits: 5})}
            </div>
        )
    }
}

function SizeColumnWrapper(props) {
    const { flashColor } = props
    const targetRef = useRef()

    return (
        <FlashBackground enable targetRef={targetRef} flashColor={flashColor}>
            {({ flashAnimationClassName, triggerFlash, cleanFlash }) => (
                <SizeColumn
                    targetRef={targetRef}
                    className={flashAnimationClassName}
                    triggerFlash={triggerFlash}
                    cleanFlash={cleanFlash}
                    {...props}
                />
            )}
        </FlashBackground>
    )
}

SizeColumnWrapper.propTypes = {
    size: PropTypes.string.isRequired,
    flashColor: PropTypes.string.isRequired,
}

export default SizeColumnWrapper
