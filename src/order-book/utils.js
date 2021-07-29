export function noop() {}

export function toNumber(value) {
    return Number(value.toString())
}

export function formatNumber(value, { digits } = { digits: 1 }) {
    return toNumber(value).toLocaleString('en-US', {
        maximumFractionDigits: digits,
    })
}

export function convertArrayToObjectByField(arr = [], keyName = 'id') {
    return arr.reduce((acc, e) => ({ ...acc, [e[keyName]]: e }), {})
}
