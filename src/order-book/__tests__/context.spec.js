import {
    actionTypes,
    reducer,
    getInitialOrderBookContext,
    calculateTotalValueById,
    calculateAveragePriceById,
    calculateTotalBarPercentageById,
} from '../context'
import { toNumber } from '../utils'

import { fakeQuote } from '../fake/context.fake'

describe('calculateTotalValueById', () => {
    it('should calculate by sumproduct(price * size)', () => {
        const data = [
            { id: 'id-1', price: 1, size: 1 },
            { id: 'id-2', price: 2, size: 2 },
            { id: 'id-3', price: 3, size: 3 },
            { id: 'id-4', price: 4, size: 4 },
        ]
        expect(toNumber(calculateTotalValueById('id-4', data))).toEqual(
            1 * 1 + 2 * 2 + 3 * 3 + 4 * 4
        )
        expect(toNumber(calculateTotalValueById('id-3', data))).toEqual(
            1 * 1 + 2 * 2 + 3 * 3
        )
    })
})

describe('calculateAveragePriceById', () => {
    it('should calculate by sumproduct(price * size)/total', () => {
        const data = [
            { id: 'id-1', price: 1, size: 1, total: 1 },
            { id: 'id-2', price: 2, size: 2, total: 3 },
            { id: 'id-3', price: 3, size: 3, total: 6 },
            { id: 'id-4', price: 4, size: 4, total: 10 },
        ]
        expect(toNumber(calculateAveragePriceById('id-4', data))).toEqual(
            (1 * 1 + 2 * 2 + 3 * 3 + 4 * 4) / 10
        )
        expect(toNumber(calculateAveragePriceById('id-3', data))).toEqual(
            (1 * 1 + 2 * 2 + 3 * 3) / 6
        )
    })
})

describe('calculateTotalBarPercentage', () => {
    it('should calculate by maxOrderSize/cumulativeTotal', () => {
        const data = [
            { id: 'id-1', price: 1, size: 1, total: 1 },
            { id: 'id-2', price: 2, size: 2, total: 3 },
            { id: 'id-3', price: 3, size: 3, total: 6 },
            { id: 'id-4', price: 4, size: 4, total: 10 },
        ]
        const maxOrderSize = 4

        expect(toNumber(calculateTotalBarPercentageById('id-4', data))).toEqual(
            maxOrderSize / 10
        )
        expect(toNumber(calculateTotalBarPercentageById('id-3', data))).toEqual(
            maxOrderSize / 6
        )
    })
})

describe('reducer', () => {
    it('invalid action should return current state', () => {
        expect(reducer(undefined, { type: 'INVALID_ACTION' })).toEqual(
            undefined
        )
        expect(reducer({}, { type: 'INVALID_ACTION' })).toEqual({})
    })

    it('action: CHANGE_SOURCE', () => {
        const topic1 = 'topic1'
        const topic2 = 'topic2'
        const r1 = reducer(
            {},
            { type: actionTypes.CHANGE_SOURCE, topic: topic1 }
        )
        expect(r1).toEqual({
            ...getInitialOrderBookContext(),
            topic: topic1,
        })

        const r2 = reducer(r1, {
            type: actionTypes.CHANGE_SOURCE,
            topic: topic2,
        })
        expect(r2).toEqual({
            ...r1,
            topic: topic2,
        })
    })

    describe('action: UPDATE_QUOTE', () => {
        it('should memorize the previous quote data', () => {
            const r1 = reducer(getInitialOrderBookContext(), {
                type: actionTypes.UPDATE_QUOTE,
                ...fakeQuote,
            })
            expect(r1.prevBuyQuotesMap).toEqual({})
            expect(r1.prevSellQuotesMap).toEqual({})

            const r2 = reducer(r1, {
                type: actionTypes.UPDATE_QUOTE,
                ...fakeQuote,
            })

            expect(r2.prevBuyQuotesMap).toEqual({
                [fakeQuote.buyQuote[0].price]: fakeQuote.buyQuote[0],
            })
            expect(r2.prevSellQuotesMap).toEqual({
                [fakeQuote.sellQuote[0].price]: fakeQuote.sellQuote[0],
            })
        })
    })
})
