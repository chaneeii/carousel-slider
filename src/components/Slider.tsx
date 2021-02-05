import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components';
import SliderContent from "./SliderContent";
import Slide from './Slide'
import Arrow from "./Arrow";
import Dots from './Dots'


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
    slides: string[];
    autoPlay: number;
}


function Slider({slides, autoPlay}: Props) {

    /* 이미지 넓이 : 현재는 전체화면이라 윈도우 전체넓이 인듯? 나중에 props로 처리해야할듯함  */
    const getWidth = () => window.innerWidth

    const [state, setState] = useState({
        activeIndex: 0,
        translate: 0,
        transition: 0.45
    })

    const { translate, transition, activeIndex } = state

    const autoPlayRef = useRef<() => void>(() => {})

    useEffect(()  => {
        autoPlayRef.current = nextSlide
    })

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }
        const interval = setInterval(play, autoPlay * 1000)
        return () => clearInterval(interval)
    }, [])



    const nextSlide = () => {
        if (activeIndex === slides.length - 1) {
            return setState({
                ...state,
                translate: 0,
                activeIndex: 0
            })
        }

        setState({
            ...state,
            activeIndex: activeIndex + 1,
            translate: (activeIndex + 1) * getWidth()
        })
    }

    const prevSlide = () => {
        if (activeIndex === 0) {
            return setState({
                ...state,
                translate: (slides.length - 1) * getWidth(),
                activeIndex: slides.length - 1
            })
        }

        setState({
            ...state,
            activeIndex: activeIndex - 1,
            translate: (activeIndex - 1) * getWidth()
        })
    }


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


            {/*좌우이동 화살표 및 함수 추가*/}
            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />

            {/*Dots*/}
            <Dots slides={slides} activeIndex={activeIndex} />

        </S.Slider>

    )

}

export default Slider