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
            text: theme.colors.green,
            totalBarBackground: 'rgba(16, 186, 104, 0.12)',
            flashBackground: theme.colors.greenHighlight,
        },
    },
    sell: {
        colors: {
            text: theme.colors.red,
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
                flashAnimationClassName,
                theme,
                price,
                size,
                total,
                rootRef,
                flashTargetRef,
                currency,
                totalValue,
                avgPrice,
                barPercentage,
                sizeColumnFlashColor,
            } = this.props

            const { quoteRowTheme } = theme

            return (
                <div ref={rootRef} className={className}>
                    <div
                        ref={flashTargetRef}
                        className={`row-background ${flashAnimationClassName}`}
                    >
                        <div className="price col">{formatNumber(price)}</div>
                        <SizeColumn
                            className="col"
                            size={size}
                            flashColor={sizeColumnFlashColor}
                        />
                        <TotalColumn
                            className="col"
                            total={total}
                            barPercentage={barPercentage}
                            barColor={quoteRowTheme.colors.totalBarBackground}
                        />
                        <InfoTooltip
                            parentRef={rootRef}
                            totalValue={totalValue}
                            avgPrice={avgPrice}
                            currency={currency}
                        />
                    </div>
                </div>
            )
        }
    }
).attrs((props) => ({ modeTheme: props.theme.quoteRowTheme }))`
    font-size: ${(props) => props.theme.sizes.m};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;

    &:hover {
        background: #334573;
    }

    .row-background {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
      
        .col {
            flex: 1 1 auto;
            text-align: right;
            padding: 10px 5px;

            &.price {
                color: ${(props) => props.modeTheme.colors.text};
            }
        }
    }
`)

function QuoteRowWrapper(props) {
    const { mode, shouldShowRowFlash } = props
    const globalTheme = useTheme()
    const rootRef = useRef()
    const flashTargetRef = useRef()
    const theme = {
        quoteRowTheme: getQuoteRowTheme(globalTheme)[mode] || {},
    }

    return (
        <ThemeProvider theme={theme}>
            <FlashBackground
                enable
                targetRef={flashTargetRef}
                flashColor={theme.quoteRowTheme.colors.flashBackground}
            >
                {({ triggerFlash, flashAnimationClassName }) => (
                    <QuoteRow
                        rootRef={rootRef}
                        flashTargetRef={flashTargetRef}
                        shouldShowRowFlash={shouldShowRowFlash}
                        flashAnimationClassName={flashAnimationClassName}
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
