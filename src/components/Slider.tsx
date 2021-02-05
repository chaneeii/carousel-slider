import React, { useState } from 'react'
import styled from 'styled-components';
import SliderContent from "./SliderContent";
import Slide from './Slide'

const S = {
    // 나중에 높이 넓이 프롭스로 받아 처리하기
    // 현재는 전체화면 컨테이너
    Slider: styled.div`
      position: relative;
      height: 100vh;
      width: 100vw;
      margin: 0 auto;
      overflow: hidden;
    `
}

interface Props {
    slides: string[]
}

function Slider({slides}: Props) {

    const getWidth = () => window.innerWidth

    const [state, setState] = useState({
        translate: 0,
        transition: 0.45
    })

    const { translate, transition } = state


    return (
        <S.Slider>
            <SliderContent
                translate={translate}
                transition={transition}
                width={getWidth() * slides.length}
            >
                {slides.map((slide, i) => (
                    <Slide key={slide + i} content={slide} />
                ))}
            </SliderContent>
        </S.Slider>
    )

}

export default Slider