import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const HOVER_COMPONENT_CLASSNAME = 'no_hover'

const Container = styled.div`
    display: none;
    position: absolute;
    top: 0;
    left: 100%;
`

const Tooltip = styled(function Tooltip(props) {
    const { parentRef, children, className } = props
    const classNames = className.split(' ')

    useEffect(() => {
        parentRef?.current?.classList?.add(...classNames)
        return () => parentRef?.current?.classList?.remove(...classNames)
    }, [parentRef])
    return <Container className={HOVER_COMPONENT_CLASSNAME}>{children}</Container>
})`
   position: relative;

  &:hover .${HOVER_COMPONENT_CLASSNAME} {
    display: unset;
  }
`

Tooltip.propTypes = {
    parentRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }).isRequired,
}

export default Tooltip
