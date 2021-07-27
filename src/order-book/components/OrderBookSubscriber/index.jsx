import { Component } from 'react'
import PropTypes from 'prop-types'

import { noop } from '../../utils'
import BTSEWebSocket from "../../lib/BTSWebsocket";

class OrderBookSubscriber extends Component {
    ws = null
    state = {
        data: {}
    }

    componentDidMount() {
        const { url, topic } = this.props
        this.create(url, topic)
    }

    componentDidUpdate(prevProps) {
        const { url, topic } = this.props
        if (url !== prevProps.url) {
            this.create(url, topic)
            return
        }

        if (topic !== prevProps.topic) {
            this.ws.unsubscribe(prevProps.topic, () => {
                this.ws.subscribe(topic, this.handleReceive)
            })
        }
    }

    componentWillUnmount() {
        this.close()
    }

    handleReceive = data => {
        this.setState(() => data)
    }

    create = (url, topic, cb = noop) => {
        this.close(() => {
            this.ws = new BTSEWebSocket(url)
            this.ws.open(() => {
                this.ws.subscribe(topic, this.handleReceive)
                cb()
            })
        })
    }

    close = (cb = noop) => {
        if (this.ws) {
            this.ws.close(cb)
        } else {
            cb()
        }
    }

    getRenderProps() {
        return {
            ...this.state
        }
    }

    render() {
        return this.props.children(this.getRenderProps())
    }
}

OrderBookSubscriber.propTypes = {
    url: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
}

export default OrderBookSubscriber
