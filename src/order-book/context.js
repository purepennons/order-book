import { createContext } from 'react'
import * as mathjs from 'mathjs'

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

export function calculateTotalValueById(targetId, quotes = []) {
    const targetIdx = quotes.findIndex(
        (quote) => String(quote.id) === String(targetId)
    )
    if (targetIdx === -1) {
        return 0
    }

    return quotes
        .slice(0, targetIdx + 1)
        .reduce(
            (acc, quote) =>
                mathjs.add(
                    acc,
                    mathjs.evaluate(
                        `${String(quote.price)} * ${String(quote.size)}`
                    )
                ),
            0
        )
}

export function calculateAveragePriceById(targetId, quotes = []) {
    const targetQuote = quotes.find(
        (quote) => String(quote.id) === String(targetId)
    )

    if (!targetQuote) {
        return 0
    }

    return mathjs.evaluate(
        `${String(calculateTotalValueById(targetId, quotes))} / ${String(
            targetQuote.total
        )}`
    )
}
