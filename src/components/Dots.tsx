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
      padding: 7px;
      margin-right: 5px;
      cursor: pointer;
      border-radius: ${({active})=> active ? '40px' : '50%'};
      background: ${({active})=> active ? '#1672f7' : '#C4C9D1'};
      width: ${({active})=> active ? '14px' : ''};
    `

}

interface Props {
    slides: string[];
    activeSlide: number;
    handleClick: (index: number) => void;
}

// interface DotProps {
//     active: boolean;
// }

// function Dot ( {active} : DotProps) {
//     return(
//         <><S.SingleDot active={active}/></>
//     )
// }


function Arrow({slides, activeSlide, handleClick}: Props) {
    return(
        <S.DotsContainer>
            {slides.map((slide, i) => (
                <S.SingleDot key={slide} active={activeSlide === i } onClick={() => handleClick(i)} />
            ))}
        </S.DotsContainer>
    )
}

export default Arrow
