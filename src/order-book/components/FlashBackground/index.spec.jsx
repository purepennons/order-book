import React, { createRef } from 'react'
import { render } from '@testing-library/react'

import FlashBackground from './index'

describe('FlashBackground', () => {
    const Child = (props) => (
        <div ref={props.targetRef} {...props}>
            Child
        </div>
    )

    it('should render the children with render props', () => {
        const ref = createRef()
        const fn = jest.fn()
        const { getByText } = render(
            <FlashBackground targetRef={ref}>
                {(renderProps) => {
                    fn(renderProps)
                    return <Child targetRef={ref} />
                }}
            </FlashBackground>
        )
        getByText('Child')
        expect(fn).toBeCalledWith(
            expect.objectContaining({
                flashAnimationClassName: expect.any(String),
                triggerFlash: expect.any(Function),
                cleanFlash: expect.any(Function),
            })
        )
    })
})
