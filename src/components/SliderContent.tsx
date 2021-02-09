import React from 'react'
import styled from 'styled-components'

const SliderContentContainer = styled.div<{transition: number, width: number, translateProp: number}>`
      transform: translateX(-${(props) => props.translateProp}px);
      transition: transform ease-out ${(props) => props.transition}s;
      height: 100%;
      width: ${(props) => props.width}px;
      display: flex;
`
interface Props {
    translate: number;
    transition: number;
    width: number;
    children: React.ReactNode;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
}

function SliderContent({translate, transition, width, children,onTouchStart, onTouchMove}: Props) {
    return(
        <SliderContentContainer translateProp={translate} transition={transition} width={width} onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
            {children}
        </SliderContentContainer>
    )
}

export default SliderContent
