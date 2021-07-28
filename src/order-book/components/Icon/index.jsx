import styled from 'styled-components'

import { ReactComponent as ArrowDownSVG } from '../../assets/images/IconArrowDown.svg'

export const ArrowDown = ArrowDownSVG

export const ArrowUp = styled(ArrowDownSVG)`
    transform: rotate(180deg);
`

const IconMap = {
    arrowDown: ArrowDown,
    arrowUp: ArrowUp,
}

const SvgIcon = styled(function (props) {
    const { className, name, ...restProps } = props
    const Icon = IconMap[name]

    return Icon ? (
        <span className={className} {...restProps}>
            <Icon />
        </span>
    ) : null
})`
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`

export default SvgIcon
