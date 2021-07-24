import { Component } from 'react'
import styled, { ThemeProvider, useTheme } from 'styled-components'
import PropTypes from 'prop-types'

import FlashBackground from '../FlashBackground'

const getQuoteRowTheme = theme => ({
    buy: {
        colors: {
            text: '#00b15d',
            totalBarBackground: 'rgba(16, 186, 104, 0.12)',
            flashBackground: theme.colors.greenHighlight
        },
    },
    sell: {
        colors: {
            text: '#FF5B5A',
            totalBarBackground: 'rgba(255, 90, 90, 0.12)',
            flashBackground: theme.colors.redHighlight
        },
    },
})

const QuoteRow = styled(
    class QuoteRow extends Component {
        componentDidUpdate(prevProps) {
            const { shouldFlashWhenPropsChange, triggerFlash } = this.props
            if (shouldFlashWhenPropsChange(this.props, prevProps)) {
                triggerFlash()
            }
        }

        render() {
            const {
                className,
                price,
                size,
                total,
                targetRef,
                flashAnimationClassName,
            } = this.props
            return (
                <tr
                    ref={targetRef}
                    className={`${className} ${flashAnimationClassName}`}
                >
                    <td className="price">{price}</td>
                    <td>{size}</td>
                    <td>{total}</td>
                </tr>
            )
        }
    }
).attrs((props) => ({ modeTheme: props.theme.quoteRowTheme }))`
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
        vertical-align: center;
    }

    & > .price {
        color: ${(props) => props.modeTheme.colors.text};
    }
`

function QuoteRowWrapper(props) {
    const { mode, shouldFlashWhenPropsChange } = props
    const globalTheme = useTheme()
    const theme = {
        quoteRowTheme: getQuoteRowTheme(globalTheme)[mode] || {}
    }

    return (
        <ThemeProvider theme={theme}>
            <FlashBackground enable flashColor={theme.quoteRowTheme.colors.flashBackground}>
                {({ targetRef, flashAnimationClassName, triggerFlash }) => (
                    <QuoteRow
                        targetRef={targetRef}
                        flashAnimationClassName={flashAnimationClassName}
                        triggerFlash={triggerFlash}
                        shouldFlashWhenPropsChange={shouldFlashWhenPropsChange}
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
    price: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    shouldFlashWhenPropsChange: PropTypes.func,
}

QuoteRowWrapper.defaultProps = {
    shouldFlashWhenPropsChange: () => false,
}

export default QuoteRowWrapper
