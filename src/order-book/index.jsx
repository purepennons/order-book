import React, { useReducer } from 'react'
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
import { WEBSOCKET_URL } from './constants'

const OrderBook = styled(function OrderBook(props) {
    const {
        className,
        topic,
        currency,
        lastPrice,
        gain,
        buyOrders,
        sellOrders,
        calculateTotalValueById,
        calculateAveragePriceById,
        calculateTotalBarPercentageById,
    } = props

    return (
        <div className={className}>
            <OrderTable
                topic={topic}
                currency={currency}
                lastPrice={lastPrice}
                gain={gain}
                buyOrders={buyOrders}
                sellOrders={sellOrders}
                calculateTotalValueById={calculateTotalValueById}
                calculateAveragePriceById={calculateAveragePriceById}
                calculateTotalBarPercentageById={
                    calculateTotalBarPercentageById
                }
            />
        </div>
    )
})`
    width: 65%;
    margin: auto;

    .order-table {
        margin: auto;
    }
`

function OrderBookWrapper(props) {
    const statePair = useReducer(reducer, getInitialOrderBookContext())
    const [state, dispatch] = statePair

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
                topic={state.topic}
                onReceive={handleDataChange}
            >
                {() => (
                    <OrderBook
                        topic={state.topic}
                        currency={state.currency}
                        gain={state.gain}
                        lastPrice={state.lastPrice}
                        buyOrders={state.buyQuotes}
                        sellOrders={state.sellQuotes}
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
