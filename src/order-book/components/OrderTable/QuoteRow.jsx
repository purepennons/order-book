import styled from 'styled-components'
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

export default QuoteRow
