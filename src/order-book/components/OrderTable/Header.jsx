import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const HeadColumn = styled.div`
  font-size: ${props => props.theme.sizes.s};
  color: #8698aa;
  width: calc(100% / 3);
  text-align: right;
  padding: 10px 5px;
`

const Header = styled(function Header(props) {
    const { className, currency } = props

    return <div className={className}>
        <HeadColumn>Price ({currency})</HeadColumn>
        <HeadColumn>Size</HeadColumn>
        <HeadColumn>Total</HeadColumn>
    </div>
})`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: 5px solid ${props => lighten(0.1, props.theme.colors.bg)};
`

export default Header
