import React, { useRef } from 'react'
import styled, { ThemeProvider, useTheme } from 'styled-components'
import PropTypes from 'prop-types'

import FlashBackground from '../FlashBackground'
import InfoTooltip from './InfoTooltip'

const getQuoteRowTheme = (theme) => ({
    buy: {
        colors: {
            text: '#00b15d',
            totalBarBackground: 'rgba(16, 186, 104, 0.12)',
            flashBackground: theme.colors.greenHighlight,
        },
    },
    sell: {
        colors: {
            text: '#FF5B5A',
            totalBarBackground: 'rgba(255, 90, 90, 0.12)',
            flashBackground: theme.colors.redHighlight,
        },
    },
})

const QuoteRow = styled(function QuoteRow(props) {
    const {
        className,
        price,
        size,
        total,
        targetRef,
        avgPrice,
        totalValue,
        currency,
    } = props

    return (
        <tr ref={targetRef} className={className}>
            <td className="price">{price}</td>
            <td>{size}</td>
            <td>{total}</td>
            <InfoTooltip
                parentRef={targetRef}
                avgPrice={avgPrice}
                currency={currency}
                totalValue={totalValue}
            />
        </tr>
    )
}).attrs((props) => ({ modeTheme: props.theme.quoteRowTheme }))`
    font-size: ${(props) => props.theme.sizes.m};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    height: 22px;

    &,
    & > td {
        border: none;
    }

    &:hover {
        background: #334573;
    }

    & > td {
        width: calc(100% / 3);
        max-width: calc(100% / 3);
        text-align: right;
    }

    & > .price {
        color: ${(props) => props.modeTheme.colors.text};
    }
`

function QuoteRowWrapper(props) {
    const { mode, shouldShowRowFlash } = props
    const globalTheme = useTheme()
    const targetRef = useRef()
    const theme = {
        quoteRowTheme: getQuoteRowTheme(globalTheme)[mode] || {},
    }

    return (
        <ThemeProvider theme={theme}>
            <FlashBackground
                enable
                targetRef={targetRef}
                hasFlashOnMount={shouldShowRowFlash}
                flashColor={theme.quoteRowTheme.colors.flashBackground}
            >
                {({ flashAnimationClassName, triggerFlash }) => (
                    <QuoteRow
                        targetRef={targetRef}
                        className={flashAnimationClassName}
                        triggerFlash={triggerFlash}
                        {...props}
                    />
                )}
            </FlashBackground>
        </ThemeProvider>
    )
}

QuoteRowWrapper.propTypes = {
    mode: PropTypes.oneOf(['sell', 'buy']).isRequired,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    avgPrice: PropTypes.string.isRequired,
    totalValue: PropTypes.string.isRequired,
    shouldShowRowFlash: PropTypes.bool,
}

export default QuoteRowWrapper
