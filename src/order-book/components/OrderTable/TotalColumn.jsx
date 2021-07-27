import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { formatNumber } from '../../utils'

function getBarWidth(barPercentage) {
    if (barPercentage >= 1) {
        return '100%'
    }

    return `${(barPercentage * 100).toFixed(2)}%`
}

const TotalColumn = styled(function TotalColumn(props) {
    const { total, className } = props
    return <td className={className}>{formatNumber(total, { digits: 5 })}</td>
}).attrs((props) => ({
    barPercentageString: getBarWidth(props.barPercentage),
}))`
    background: ${({ barPercentageString, barColor }) =>
        `linear-gradient(to right, ${barColor} 0%, ${barColor} ${barPercentageString}, transparent ${barPercentageString},transparent 100%)`};
`

TotalColumn.propTypes = {
    total: PropTypes.string.isRequired,
    barColor: PropTypes.string,
    barPercentage: PropTypes.number,
}

TotalColumn.defaultProps = {
    barPercentage: 0,
    barColor: 'transparent'
}

export default TotalColumn
