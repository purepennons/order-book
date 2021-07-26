import { createContext } from 'react'
import * as mathjs from 'mathjs'

import { NUMBER_OF_RECORDS } from './constants'
import { convertArrayToObjectByField } from './utils'

export const actionTypes = {
    UPDATE_QUOTE: 'UPDATE_QUOTE',
}

export function getInitialOrderBookContext() {
    return {
        buyQuotes: [],
        prevBuyQuotesMap: {},
        sellQuotes: [],
        prevSellQuotesMap: {},
        raw: {},
    }
}

export const OrderBookContext = createContext(getInitialOrderBookContext())

export function reducer(state, action) {
    const { type, ...payload } = action

    switch (type) {
        case actionTypes.UPDATE_QUOTE: {
            const prevBuyQuotesMap = convertArrayToObjectByField(
                state.buyQuotes
            )
            const prevSellQuotesMap = convertArrayToObjectByField(
                state.sellQuotes
            )

            return {
                ...state,
                prevBuyQuotesMap,
                buyQuotes: normalizeQuotes(payload?.buyQuote, prevBuyQuotesMap),
                prevSellQuotesMap,
                sellQuotes: normalizeQuotes(
                    payload?.sellQuote,
                    prevSellQuotesMap
                ),
                raw: payload,
            }
        }

        default:
            return state
    }
}

export function getShouldShowRowFlash(quote, prevQuotesMap = {}) {
    return (
        Object.values(prevQuotesMap).length > 0 && !prevQuotesMap[quote?.price]
    )
}

export function getSizeChangeStatus(quote, prevQuotesMap = {}) {
    const statusMap = {
        NORMAL: 0,
        INC: 1,
        DEC: -1,
    }

    const prevQuote = prevQuotesMap[quote?.price]
    if (!prevQuote || quote?.size === prevQuote.size) {
        return statusMap['NORMAL']
    }

    if (quote?.size > prevQuote.size) {
        return statusMap['INC']
    } else {
        return statusMap['DEC']
    }
}

export function normalizeQuotes(quotes = [], prevQuotesMap = {}) {
    return quotes.slice(0, NUMBER_OF_RECORDS).map((quote) => ({
        ...quote,
        id: quote.price,
        total: quote.culmulativeTotal,
        shouldShowRowFlash: getShouldShowRowFlash(quote, prevQuotesMap),
        sizeChangeStatus: getSizeChangeStatus(quote, prevQuotesMap),
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
