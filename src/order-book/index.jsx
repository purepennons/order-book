import * as fakeData from './fake'
import OrderTable from './components/OrderTable'

function OrderBook(props) {
    const data = fakeData.initOrderData

    return <OrderTable data={data} />
}

export default OrderBook
