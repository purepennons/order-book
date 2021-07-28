import React from 'react'
import PropTypes from 'prop-types'

import { noop } from '../../utils'
import WebSocketDataSource from "./WebSocketDataSource";
import FakeDataSource from "./FakeDataSource";

function OrderBookSubscriber(props) {
    const { topic } = props
    const isValidTopic = /^orderBook:/.test(topic)

    if (isValidTopic) {
        return <WebSocketDataSource {...props} />
    }

    return <FakeDataSource {...props} />
}

OrderBookSubscriber.propTypes = {
    url: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    onReceive: PropTypes.func,
}

OrderBookSubscriber.defaultProps = {
    onReceive: noop,
}

export default OrderBookSubscriber
