import React, { useReducer, useContext } from 'react'
import styled from 'styled-components'

import {
    OrderBookContext,
    reducer,
    getInitialOrderBookContext,
    actionTypes,
    calculateTotalValueById,
    calculateAveragePriceById,
} from './context'
import OrderTable from './components/OrderTable'
import * as fakeData from './fake'

const OrderBook = styled(function OrderBook(props) {
    const { className, calculateTotalValueById } = props

    const [fakeIdx, setFakeIdx] = React.useState(0)
    const [state, dispatch] = useContext(OrderBookContext)

    return (
        <div
            className={className}
            onClick={() => {
                setFakeIdx((prev) => (prev + 1) % 6)
                dispatch({
                    type: actionTypes.UPDATE_QUOTE,
                    ...fakeData.orderData[fakeIdx].data,
                })
            }}
        >
            <OrderTable
                buyOrders={state.buyQuotes}
                sellOrders={state.sellQuotes}
                calculateTotalValueById={calculateTotalValueById}
                calculateAveragePriceById={calculateAveragePriceById}
            />
        </div>
    )
})`
    width: 80%;
    height: 600px;
    background: yellow;

    ${OrderTable} {
        margin: auto auto;
    }
`

function OrderBookWrapper(props) {
    const statePair = useReducer(reducer, getInitialOrderBookContext())

    return (
        <OrderBookContext.Provider value={statePair}>
            <OrderBook
                calculateTotalValueById={calculateTotalValueById}
                calculateAveragePriceById={calculateAveragePriceById}
                {...props}
            />
        </OrderBookContext.Provider>
    )
}

export default OrderBookWrapper
