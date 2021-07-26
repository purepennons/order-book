export function noop() {}

export function formatNumber(value, { digits } = { digits: 1 }) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: digits,
    })
}

export function convertArrayToObjectByField(arr = [], keyName = 'id') {
    return arr.reduce((acc, e) => ({ ...acc, [e[keyName]]: e }), {})
}
