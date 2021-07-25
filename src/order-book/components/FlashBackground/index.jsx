import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

const FLASH_CLASSNAME = 'flash'

const flashAnimation = ({ flashColor }) => keyframes`
  from {
    background-color: ${flashColor};
  }
  
  to {
    background-color: inherit;
  }
`

const FlashBackground = styled(
    class FlashBackground extends React.Component {
        timer = null

        componentDidMount() {
            if (this.props.hasFlashOnMount) {
                this.triggerFlash()
            }
        }

        componentDidUpdate(prevProps) {
            const { targetRef } = this.props
            if (prevProps.targetRef !== targetRef) {
                this.cleanFlash(prevProps.targetRef)
            }
        }

        componentWillUnmount() {
            this.cleanFlash(this.props.targetRef)
        }

        triggerFlash = () => {
            const { enable, targetRef, duration } = this.props
            this.cleanFlash(targetRef)

            if (enable) {
                targetRef?.current?.classList?.add(FLASH_CLASSNAME)
                this.timer = window.setTimeout(() => {
                    this.cleanFlash(targetRef)
                }, duration)
            }
        }

        cleanFlash = targetRef => {
            targetRef?.current?.classList?.remove(FLASH_CLASSNAME)

            if (this.timer) {
                window.clearTimeout(this.timer)
                this.timer = null
            }
        }

        getRenderProps = () => {
            const { className } = this.props

            return {
                flashAnimationClassName: className,
                triggerFlash: this.triggerFlash,
            }
        }

        render() {
            return this.props.children(this.getRenderProps())
        }
    }
).attrs((props) => ({
    animationDuration: `${String((props.duration / 1000).toFixed(1))}s`,
}))`
    &.${FLASH_CLASSNAME} {
        animation: ${(props) => flashAnimation(props)}
            ${(props) => props.animationDuration} ease-out 0s;
        animation-iteration-count: 1;
    }
`

FlashBackground.propTypes = {
    targetRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
    flashColor: PropTypes.string,
    enable: PropTypes.bool,
    hasFlashOnMount: PropTypes.bool,
    duration: PropTypes.number,
}

FlashBackground.defaultProps = {
    flashColor: 'rgba(0, 177, 93, 0.5)',
    duration: 500,
}

export default FlashBackground
