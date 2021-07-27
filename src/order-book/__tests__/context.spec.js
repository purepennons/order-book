import {
    calculateTotalValueById,
    calculateAveragePriceById,
    calculateTotalBarPercentage,
} from '../context'

describe('calculateTotalValueById', () => {
    it('should calculate by sumproduct(price * size)', () => {
        const data = [
            { id: 'id-1', price: 1, size: 1 },
            { id: 'id-2', price: 2, size: 2 },
            { id: 'id-3', price: 3, size: 3 },
            { id: 'id-4', price: 4, size: 4 },
        ]
        expect(calculateTotalValueById('id-4', data)).toEqual(
            1 * 1 + 2 * 2 + 3 * 3 + 4 * 4
        )
        expect(calculateTotalValueById('id-3', data)).toEqual(
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
        expect(calculateAveragePriceById('id-4', data)).toEqual(
            (1 * 1 + 2 * 2 + 3 * 3 + 4 * 4) / 10
        )
        expect(calculateAveragePriceById('id-3', data)).toEqual(
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

        expect(calculateTotalBarPercentage('id-4', data)).toEqual(
            maxOrderSize / 10
        )
        expect(calculateTotalBarPercentage('id-3', data)).toEqual(
            maxOrderSize / 6
        )
    })
})
