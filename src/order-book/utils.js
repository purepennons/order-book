export function noop() {}

export function formatNumber(value, { digits } = { digits: 1 }) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: digits,
    })
}
