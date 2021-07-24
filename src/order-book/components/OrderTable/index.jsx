import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import QuoteRow from './QuoteRow'

const OrderTable = styled(function OrderTable(props) {
    const { className, orders } = props

    return (
        <table className={className}>
            <tbody>
                {orders.map(({ id, price, size, total }) => {
                    return (
                        <QuoteRow
                            key={id}
                            price={price}
                            size={size}
                            total={total}
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

OrderTable.propTypes = {
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            price: PropTypes.number.isRequired,
            size: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
        })
    ),
}

OrderTable.defaultProps = {
    orders: [
        { id: 1, price: 56453.0, size: 85, total: 3411 },
        { id: 2, price: 56453.0, size: 85, total: 3411 },
        { id: 3, price: 56453.0, size: 85, total: 3411 },
        { id: 4, price: 56453.0, size: 85, total: 3411 },
    ],
}

export default OrderTable
