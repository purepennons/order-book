import React, { useReducer, useContext } from 'react'

import {
    OrderBookContext,
    reducer,
    getInitialOrderBookContext,
    actionTypes,
} from './context'
import OrderTable from './components/OrderTable'
import * as fakeData from './fake'

function OrderBook(props) {
    const [fakeIdx, setFakeIdx] = React.useState(0)
    const [state, dispatch] = useContext(OrderBookContext)

    return (
        <div>
            <button
                onClick={() => {
                    setFakeIdx((prev) => (prev + 1) % 6)
                    dispatch({
                        type: actionTypes.UPDATE_QUOTE,
                        ...fakeData.orderData[fakeIdx].data,
                    })
                }}
            >
                update data
            </button>
            <OrderTable buyOrders={state.buyQuotes} sellOrders={state.sellQuotes} />
        </div>
    )
}

function OrderBookWrapper(props) {
    const statePair = useReducer(reducer, getInitialOrderBookContext())

    return (
        <OrderBookContext.Provider value={statePair}>
            <OrderBook {...props} />
        </OrderBookContext.Provider>
    )
}

export default OrderBookWrapper
