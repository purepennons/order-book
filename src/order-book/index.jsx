import React, { useReducer, useContext } from 'react'
import styled from 'styled-components'

import {
    OrderBookContext,
    reducer,
    getInitialOrderBookContext,
    actionTypes,
    calculateTotalValueById,
    calculateAveragePriceById,
    calculateTotalBarPercentageById,
} from './context'
import OrderTable from './components/OrderTable'
import OrderBookSubscriber from './components/OrderBookSubscriber'
import { DEFAULT_TOPIC, WEBSOCKET_URL } from './constants'

import * as fakeData from './fake'

const OrderBook = styled(function OrderBook(props) {
    const {
        className,
        calculateTotalValueById,
        calculateAveragePriceById,
        calculateTotalBarPercentageById,
    } = props

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
                calculateTotalBarPercentageById={
                    calculateTotalBarPercentageById
                }
            />
        </div>
    )
})`
    width: 80%;
    height: 600px;
    background: tomato;

    ${OrderTable} {
        margin: auto auto;
    }
`

function OrderBookWrapper(props) {
    const statePair = useReducer(reducer, getInitialOrderBookContext())
    const [, dispatch] = statePair

    function handleDataChange(wsData) {
        dispatch({
            type: actionTypes.UPDATE_QUOTE,
            ...wsData?.data ?? {},
        })
    }

    return (
        <OrderBookContext.Provider value={statePair}>
            <OrderBookSubscriber
                url={WEBSOCKET_URL}
                topic={DEFAULT_TOPIC}
                onReceive={handleDataChange}
            >
                {() => (
                    <OrderBook
                        calculateTotalValueById={calculateTotalValueById}
                        calculateAveragePriceById={calculateAveragePriceById}
                        calculateTotalBarPercentageById={
                            calculateTotalBarPercentageById
                        }
                        {...props}
                    />
                )}
            </OrderBookSubscriber>
        </OrderBookContext.Provider>
    )
}

export default OrderBookWrapper
