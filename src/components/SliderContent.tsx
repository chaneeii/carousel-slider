import React from 'react'
import styled from 'styled-components'

const SliderContentContainer = styled.div<{transition: number, width: number}>`
      transform: translateX(-${props => props.translate}px);
      transition: transform ease-out ${props => props.transition}s;
      height: 100%;
      width: ${props => props.width}px;
      display: flex;
`
interface Props {
    translate: number;
    transition: number;
    width: number;
    children: React.ReactNode;
}

function SliderContent({translate, transition, width, children}: Props) {
    return(
        <>
            {children}
        </>
    )
}

export default SliderContent
