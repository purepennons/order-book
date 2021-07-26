import React from 'react'
import styled, { useTheme } from 'styled-components'
import PropTypes from 'prop-types'

import { noop } from '../../utils'
import QuoteRow from './QuoteRow'

const OrderTable = styled(function OrderTable(props) {
    const {
        className,
        buyOrders,
        sellOrders,
        calculateTotalValueById,
        calculateAveragePriceById,
    } = props
    const theme = useTheme()

    function getSizeColumnFlashColor(sizeChangeStatus) {
        return {
            '1': theme?.colors?.redHighlight,
            '0': 'transparent',
            '-1': theme?.colors?.greenHighlight,
        }[String(sizeChangeStatus)]
    }

    return (
        <table className={className}>
            <tbody>
                {sellOrders.map((order) => {
                    return (
                        <QuoteRow
                            mode="sell"
                            key={`sell-${order.id}`}
                            id={order.id}
                            price={order.price}
                            size={order.size}
                            total={order.total}
                            sizeColumnFlashColor={getSizeColumnFlashColor(order.sizeChangeStatus)}
                            shouldShowRowFlash={order.shouldShowRowFlash}
                            avgPrice={String(calculateAveragePriceById(order.id, sellOrders))}
                            totalValue={String(calculateTotalValueById(order.id, sellOrders))}
                        />
                    )
                })}
                {buyOrders.map((order) => {
                    return (
                        <QuoteRow
                            mode="buy"
                            key={`buy-${order.id}`}
                            id={order.id}
                            price={order.price}
                            size={order.size}
                            total={order.total}
                            sizeColumnFlashColor={getSizeColumnFlashColor(order.sizeChangeStatus)}
                            shouldShowRowFlash={order.shouldShowRowFlash}
                            avgPrice={String(calculateAveragePriceById(order.id, buyOrders))}
                            totalValue={String(calculateTotalValueById(order.id, buyOrders))}
                        />
                    )
                })}
            </tbody>
        </table>
    )
})`
    background: ${(props) => props.theme.colors.bg};
    min-width: 300px;
    border-collapse: collapse;
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
    buyOrders: PropTypes.arrayOf(orderPropType),
    sellOrders: PropTypes.arrayOf(orderPropType),
    calculateTotalValueById: PropTypes.func,
    calculateAveragePriceById: PropTypes.func,
}

OrderTable.defaultProps = {
    buyOrders: [],
    sellOrders: [],
    calculateTotalValueById: noop,
    calculateAveragePriceById: noop,
}

export default OrderTable
