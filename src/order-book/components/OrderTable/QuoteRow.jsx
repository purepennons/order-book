import React, { useRef } from 'react'
import styled, { ThemeProvider, useTheme, withTheme } from 'styled-components'
import PropTypes from 'prop-types'

import FlashBackground from '../FlashBackground'
import InfoTooltip from './InfoTooltip'
import SizeColumn from './SizeColumn'
import TotalColumn from './TotalColumn'
import { formatNumber } from '../../utils'

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

const QuoteRow = withTheme(styled(
    class QuoteRow extends React.Component {
        componentDidUpdate(prevProps) {
            const { shouldShowRowFlash, triggerFlash } = this.props

            if (
                shouldShowRowFlash &&
                shouldShowRowFlash !== prevProps.shouldShowRowFlash
            ) {
                triggerFlash()
            }
        }

        render() {
            const {
                className,
                theme,
                price,
                size,
                total,
                targetRef,
                currency,
                totalValue,
                avgPrice,
                barPercentage,
                sizeColumnFlashColor,
            } = this.props

            const { quoteRowTheme } = theme

            return (
                <tr ref={targetRef} className={className}>
                    <td className="price">{formatNumber(price)}</td>
                    <SizeColumn size={size} flashColor={sizeColumnFlashColor} />
                    <TotalColumn
                        total={total}
                        barPercentage={barPercentage}
                        barColor={quoteRowTheme.colors.totalBarBackground}
                    />
                    <InfoTooltip
                        parentRef={targetRef}
                        totalValue={totalValue}
                        avgPrice={avgPrice}
                        currency={currency}
                    />
                </tr>
            )
        }
    }
).attrs((props) => ({ modeTheme: props.theme.quoteRowTheme }))`
    font-size: ${(props) => props.theme.sizes.m};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
    height: 22px;

    &:hover {
        background: #334573;
    }

    & > td {
        width: calc(100% / 3);
        max-width: calc(100% / 3);
        text-align: right;
        padding-right: 5px;
        padding-left: 5px;
    }

    & > .price {
        color: ${(props) => props.modeTheme.colors.text};
    }
`)

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
                flashColor={theme.quoteRowTheme.colors.flashBackground}
            >
                {({ flashAnimationClassName, triggerFlash }) => (
                    <QuoteRow
                        targetRef={targetRef}
                        className={flashAnimationClassName}
                        shouldShowRowFlash={shouldShowRowFlash}
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
    currency: PropTypes.string.isRequired,
    avgPrice: PropTypes.string.isRequired,
    totalValue: PropTypes.string.isRequired,
    barPercentage: PropTypes.number.isRequired,
    sizeColumnFlashColor: PropTypes.string.isRequired,
    shouldShowRowFlash: PropTypes.bool,
}

export default QuoteRowWrapper
