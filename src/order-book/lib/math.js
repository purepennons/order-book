import { create, all } from 'mathjs'

const config = {
    number: 'BigNumber',
    precision: 64,
}
const math = create(all, config)

export default math
