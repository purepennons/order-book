import React from 'react'
import styled from 'styled-components'

const FAKE_CONTENT_HEIGHT = 34 * 8 * 2 + 48

const Loading = styled(function Loading(props) {
    const { className } = props
    return <div className={className}>Loading...</div>
})`
    width: 100%;
    height: ${FAKE_CONTENT_HEIGHT}px;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.sizes.l};
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`

export default Loading
