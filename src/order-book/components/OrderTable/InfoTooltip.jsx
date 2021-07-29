import React from 'react'
import styled from 'styled-components'

import Tooltip from '../Tooltip'
import { formatNumber } from '../../utils'

const InfoTooltip = styled(function InfoTooltip(props) {
    const { className, parentRef, avgPrice, totalValue, currency } = props
    return (
        <Tooltip parentRef={parentRef}>
            <div className={className}>
                <div>
                    <p>
                        Avg Price: {formatNumber(avgPrice)} {currency}
                    </p>
                    <p>
                        Total Value: {formatNumber(totalValue)} {currency}
                    </p>
                </div>
            </div>
        </Tooltip>
    )
})`
    position: relative;
    background: #57626e;
    width: 200px;
    height: 60px;
    padding: 0 10px;
    margin-left: 10px;
    transform: translateY(-50%);
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
    border-radius: 10px;

    p {
        margin: 0;
        padding: 2px 0;
    }

    &::before {
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 10px 0px;
        border-color: transparent #57626e transparent transparent;
        position: absolute;
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
    }
`

export default InfoTooltip
