import React from 'react'
import PropTypes from 'prop-types'
import styled, { useTheme } from 'styled-components'
import { lighten } from 'polished'

import { noop, formatNumber } from '../../utils'
import Header from './Header'
import QuoteRow from './QuoteRow'
import SvgIcon from '../Icon'

const Title = styled.h1`
    color: ${(props) => props.theme.colors.text};
    text-align: center;
`

const OrderTable = styled(function OrderTable(props) {
    const {
        className,
        topic,
        currency,
        buyOrders,
        sellOrders,
        lastPrice,
        gain,
        calculateTotalValueById,
        calculateAveragePriceById,
        calculateTotalBarPercentageById,
    } = props
    const theme = useTheme()

    function getSizeColumnFlashColor(sizeChangeStatus) {
        return {
            1: theme.colors.redHighlight,
            0: 'transparent',
            '-1': theme.colors.greenHighlight,
        }[String(sizeChangeStatus)]
    }

    function getPriceColor(gain) {
        return {
            1: theme.colors.green,
            0: theme.colors.text,
            '-1': theme.colors.red,
        }[String(gain)]
    }

    return (
        <div className={className}>
            <Title>Order Book - {topic}</Title>
            <Header currency={currency} />
            <div>
                {sellOrders.map((order, idx) => {
                    return (
                        <QuoteRow
                            mode="sell"
                            key={`sell-${idx}`}
                            id={order.id}
                            price={order.price}
                            size={order.size}
                            total={order.total}
                            currency={currency}
                            sizeColumnFlashColor={getSizeColumnFlashColor(
                                order.sizeChangeStatus
                            )}
                            shouldShowRowFlash={order.shouldShowRowFlash}
                            avgPrice={String(
                                calculateAveragePriceById(order.id, sellOrders)
                            )}
                            totalValue={String(
                                calculateTotalValueById(order.id, sellOrders)
                            )}
                            barPercentage={calculateTotalBarPercentageById(
                                order.id,
                                sellOrders
                            )}
                        />
                    )
                })}
            </div>
            {lastPrice && (
                <div className="last-price">
                    <span style={{ color: getPriceColor(gain) }}>
                        {formatNumber(lastPrice)}
                    </span>
                    {gain === 1 && (
                        <SvgIcon
                            className="icon"
                            name="arrowUp"
                            style={{ color: theme.colors.green }}
                        />
                    )}
                    {gain === -1 && (
                        <SvgIcon
                            className="icon"
                            name="arrowDown"
                            style={{ color: theme.colors.red }}
                        />
                    )}
                </div>
            )}
            <div>
                {buyOrders.map((order, idx) => {
                    return (
                        <QuoteRow
                            mode="buy"
                            key={`buy-${idx}`}
                            id={order.id}
                            price={order.price}
                            size={order.size}
                            total={order.total}
                            currency={currency}
                            sizeColumnFlashColor={getSizeColumnFlashColor(
                                order.sizeChangeStatus
                            )}
                            shouldShowRowFlash={order.shouldShowRowFlash}
                            avgPrice={String(
                                calculateAveragePriceById(order.id, buyOrders)
                            )}
                            totalValue={String(
                                calculateTotalValueById(order.id, buyOrders)
                            )}
                            barPercentage={calculateTotalBarPercentageById(
                                order.id,
                                buyOrders
                            )}
                        />
                    )
                })}
            </div>
        </div>
    )
})`
    background: ${(props) => props.theme.colors.bg};
    min-width: 300px;
    border-radius: 10px;
    padding: 20px 30px;

    .last-price {
        font-size: 18px;
        text-align: center;
        padding: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        border-top: 2px solid ${props => lighten(0.1, props.theme.colors.bg)};;
        border-bottom: 2px solid ${props => lighten(0.1, props.theme.colors.bg)};

        > .icon {
            margin-left: 5px;
        }
    }
`

const orderPropType = PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    price: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    total: PropTypes.string.isRequired,
    sizeChangeStatus: PropTypes.oneOf([-1, 0, 1]).isRequired,
    shouldShowRowFlash: PropTypes.bool,
})

OrderTable.propTypes = {
    topic: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    buyOrders: PropTypes.arrayOf(orderPropType),
    sellOrders: PropTypes.arrayOf(orderPropType),
    lastPrice: PropTypes.string,
    gain: PropTypes.oneOf([-1, 0, 1]),
    calculateTotalValueById: PropTypes.func,
    calculateAveragePriceById: PropTypes.func,
    calculateTotalBarPercentageById: PropTypes.func,
}

OrderTable.defaultProps = {
    buyOrders: [],
    sellOrders: [],
    gain: 0,
    calculateTotalValueById: noop,
    calculateAveragePriceById: noop,
    calculateTotalBarPercentageById: noop,
}

export default OrderTable
