import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { noop } from '../../utils'
import { orderData as fakeOrderData } from './fake'

const DATA_DELAY_TIME = 1000

function FakeDataSource(props) {
    const { onReceive, children } = props
    const [fakeIdx, setFakeIdx] = useState(0)

    function getRenderProps() {
        return {
            data: fakeOrderData[fakeIdx]
        }
    }

    useEffect(() => {
        const timer = window.setInterval(() => {
            setFakeIdx(prev => (prev + 1) % fakeOrderData.length)
        }, DATA_DELAY_TIME)

        return () => {
            window.clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        onReceive(fakeOrderData[fakeIdx])
    }, [fakeIdx])

    return children(getRenderProps())
}

FakeDataSource.propTypes = {
    onReceive: PropTypes.func,
}

FakeDataSource.defaultProps = {
    onReceive: noop,
}

export default FakeDataSource
