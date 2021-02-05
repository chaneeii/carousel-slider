import React from 'react'
import styled from 'styled-components'



const S = {
    DotsContainer : styled.div`
      position: absolute;
      bottom: 25px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    SingleDot: styled.span<{active: boolean}>`
      padding: 10px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: 50%;
      background: ${({active})=> active ? 'black' : 'white'}
    `
}

interface Props {
    slides: string[];
    activeIndex: number;
}

interface DotProps {
    active: boolean;
}

function Dot ( {active} : DotProps) {
    return(
        <><S.SingleDot active={active}/></>
    )
}


function Arrow({slides, activeIndex}: Props) {
    return(
        <S.DotsContainer>
            {slides.map((slide, i) => (
                <Dot key={slide} active={activeIndex === i} />
            ))}
        </S.DotsContainer>
    )
}

export default Arrow
