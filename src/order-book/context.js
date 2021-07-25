import { createContext } from 'react'

import { NUMBER_OF_RECORDS } from './constants'

export const actionTypes = {
    UPDATE_QUOTE: 'UPDATE_QUOTE',
}

export function getInitialOrderBookContext() {
    return {
        buyQuotes: [],
        prevBuyQuotes: [],
        sellQuotes: [],
        prevSellQuotes: [],
        raw: {},
    }
}

export const OrderBookContext = createContext(getInitialOrderBookContext())

export function reducer(state, action) {
    const { type, ...payload } = action

    switch (type) {
        case actionTypes.UPDATE_QUOTE: {
            return {
                ...state,
                buyQuotes: normalizeQuotes(
                    payload?.buyQuote,
                    state.prevBuyQuotes
                ),
                prevBuyQuotes: state.buyQuotes,
                sellQuotes: normalizeQuotes(
                    payload?.sellQuote,
                    state.prevSellQuotes
                ),
                prevSellQuotes: state.sellQuotes,
                raw: payload,
            }
        }

        default:
            return state
    }
}

export function normalizeQuotes(quotes = [], prevQuotes = []) {
    return quotes.slice(0, NUMBER_OF_RECORDS).map((quote) => ({
        ...quote,
        id: quote.price,
        total: quote.culmulativeTotal,
        shouldShowRowFlash:
            prevQuotes.length > 0 &&
            !prevQuotes.find((prevQuote) => prevQuote.id === quote.price),
    }))
}
