import { noop } from '../utils'

const READY_STATE = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3,
}

const OP_TYPES = {
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
}

class BTSEWebSocket {
    socket = null
    subscribeCallbacksMap = {}

    constructor(url) {
        this.url = url
    }

    isReady = () => {
        return this.socket?.readyState === READY_STATE.OPEN
    }

    open = (cb = noop) => {
        this.socket = new WebSocket(this.url)
        this.socket.onopen = (event) => {
            cb(event)
        }
        this.socket.onmessage = this.#handleReceiveMessage
    }

    close = (cb = noop) => {
        if (!this.socket) {
            throw new Error('No websocket instance to close')
        }

        this.onclose = (event) => {
            this.socket = null
            cb(event)
        }

        this.socket?.close()
    }

    subscribe = (topic, cb = noop) => {
        this.#sendCommand(OP_TYPES.SUBSCRIBE, [topic])
        this.#registerCallback(topic, 'subscribe', cb)
    }

    unsubscribe = (topic, cb = noop) => {
        this.#sendCommand(OP_TYPES.UNSUBSCRIBE, [topic])
        this.#registerCallback(topic, 'unsubscribe', cb)
    }

    #sendCommand = (op, args) => {
        if (!this.isReady()) {
            throw new Error(
                'Only can execute a command when the websocket state is ready'
            )
        }

        this.socket.send(JSON.stringify({ op, args }))
    }

    #registerCallback(topic, type, cb) {
        if (!this.subscribeCallbacksMap[topic]) {
            this.subscribeCallbacksMap[topic] = {
                subscribe: [],
                unsubscribe: [],
            }
        }

        this.subscribeCallbacksMap[topic][type].push(cb)
    }

    #unregisterCallbacksByTopic(topic) {
        delete this.subscribeCallbacksMap[topic]
    }

    #triggerAllCallbacks(topic, type, data) {
        const topicCallbacksMap = this.subscribeCallbacksMap[topic]
        const callbacksToExecute = topicCallbacksMap[type] ?? []

        callbacksToExecute.forEach((cb) => {
            cb(data)
        })
    }

    #handleSystemLog = (data) => {
        switch (data?.event) {
            case OP_TYPES.SUBSCRIBE: {
                // do nothing
                break
            }

            case OP_TYPES.UNSUBSCRIBE: {
                const topic = (data?.channel || [])[0]
                this.#triggerAllCallbacks(topic, 'unsubscribe')
                this.#unregisterCallbacksByTopic(topic)
                break
            }

            default:
                console.log(
                    'Receive unhandled system log',
                    JSON.stringify(data)
                )
        }
    }

    #handleReceiveData = (data) => {
        this.#triggerAllCallbacks(data?.topic, 'subscribe', data)
    }

    #handleReceiveMessage = (event) => {
        const data = JSON.parse(event.data)

        if (data?.event) {
            // system log
            this.#handleSystemLog(data)
            return
        }

        if (data?.topic) {
            // subscription data
            this.#handleReceiveData(data)
            return
        }

        // unsupported data type
    }
}

export default BTSEWebSocket
