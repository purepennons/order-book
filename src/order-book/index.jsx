import React from 'react'
import OrderTable from './components/OrderTable'
import * as fakeData from './fake'

function OrderBook(props) {
    const [fakeIdx, setFakeIdx] = React.useState(0)
    const data = fakeData.orderData[fakeIdx]

    return (
        <div>
            <button onClick={() => setFakeIdx((prev) => (prev + 1) % 6)}>
                update data
            </button>
            <OrderTable data={data} />
        </div>
    )
}

function OrderBookWrapper(props) {
    return <OrderBook {...props} />
}

export default OrderBook
