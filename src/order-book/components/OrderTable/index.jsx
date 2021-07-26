import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import QuoteRow from './QuoteRow'

const OrderTable = styled(function OrderTable(props) {
    const { className, buyOrders, sellOrders } = props

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
                            shouldShowRowFlash={order.shouldShowRowFlash}
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
                            shouldShowRowFlash={order.shouldShowRowFlash}
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
    shouldShowRowFlash: PropTypes.bool,
})

OrderTable.propTypes = {
    buyOrders: PropTypes.arrayOf(orderPropType),
    sellOrders: PropTypes.arrayOf(orderPropType),
}

OrderTable.defaultProps = {
    buyOrders: [],
    sellOrders: [],
}

export default OrderTable
