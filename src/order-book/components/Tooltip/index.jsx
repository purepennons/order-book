import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HOVER_COMPONENT_CLASSNAME = 'no_hover'

const Tooltip = styled(function Tooltip(props) {
    const { parentRef, children, className } = props
    const classNames = className.split(' ')

    useEffect(() => {
        parentRef?.current?.classList?.add(...classNames)
        return () => parentRef?.current?.classList?.remove(...classNames)
    }, [parentRef])
    return <div className={HOVER_COMPONENT_CLASSNAME}>{children}</div>
})`
  position: relative;
  
  & .${HOVER_COMPONENT_CLASSNAME} {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 100%;
  }
  
  &:hover .${HOVER_COMPONENT_CLASSNAME} {
    visibility: visible;
  }
`

Tooltip.propTypes = {
    parentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
}

export default Tooltip
