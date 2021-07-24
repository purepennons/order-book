import React from 'react'
import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const quoteRowTheme = {
    buy: {
        colors: {
            text: '#00b15d',
            totalBarBackground: 'rgba(16, 186, 104, 0.12)',
        },
    },
    sell: {
        colors: {
            text: '#FF5B5A',
            totalBarBackground: 'rgba(255, 90, 90, 0.12)',
        },
    },
}

const QuoteRow = styled(function QuoteRow(props) {
    const { className, price, size, total } = props
    return (
        <tr className={className}>
            <td className="price">{price}</td>
            <td>{size}</td>
            <td>{total}</td>
        </tr>
    )
}).attrs((props) => ({ modeTheme: quoteRowTheme[props.mode] }))`
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

QuoteRow.propTypes = {
    mode: PropTypes.oneOf(['sell', 'buy']),
}
QuoteRow.defaultProps = {
    mode: 'sell',
}

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
