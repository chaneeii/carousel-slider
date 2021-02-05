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

    const firstSlide = slides[0]
    const secondSlide = slides[1]
    const lastSlide = slides[slides.length - 1]

    const [state, setState] = useState({
        activeSlide: 0,
        translate: 0,
        transition: 0.45,
        _slides: [lastSlide, firstSlide, secondSlide]
    })

    const { translate, transition, activeSlide } = state

    const autoPlayRef = useRef<() => void>(() => {})
    // const transitionRef = useRef<() => void>(() => {})
    const resizeRef = useRef<() => void>(() => {})


    useEffect(() => {
        autoPlayRef.current = nextSlide
        // transitionRef.current = smoothTransition
        resizeRef.current = handleResize
    })

    useEffect(() => {
        const play = () => {
            autoPlayRef.current()
        }
        const interval = setInterval(play, autoPlay * 1000)
        return () => clearInterval(interval)
    }, [])



    // useEffect(() => {
    //     autoPlayRef.current = nextSlide
    //     transitionRef.current = smoothTransition
    // })

    useEffect(() => {

        const play = () => {
            autoPlayRef.current()
        }

        // const smooth = () => {
        //     transitionRef.current()
        // }

        const resize = () => {
            resizeRef.current()
        }

        const interval = setInterval(play, autoPlay * 1000)
        // const transitionEnd = window.addEventListener('transitionend', smooth)
        const onResize = window.addEventListener('resize', resize)

        return () => {
            clearInterval(interval)
            // window.removeEventListener('transitionend', smooth)
            window.removeEventListener('resize', resize)
        }

    }, [])




    useEffect(() => {
        if (transition === 0) setState({ ...state, transition: 0.45 })
    }, [transition])



    const smoothTransition = () => {
        let _slides = []

        // We're at the last slide.
        if (activeSlide === slides.length - 1)
            _slides = [slides[slides.length - 2], lastSlide, firstSlide]
        // We're back at the first slide. Just reset to how it was on initial render
        else if (activeSlide === 0) _slides = [lastSlide, firstSlide, secondSlide]
        // Create an array of the previous last slide, and the next two slides that follow it.
        else _slides = slides.slice(activeSlide - 1, activeSlide + 2)

        setState({
            ...state,
            _slides,
            transition: 0,
            translate: getWidth()
        })
    }

    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 })
    }


    const nextSlide = () => {
        if (activeSlide === slides.length - 1) {
            return setState({
                ...state,
                translate: 0,
                activeSlide: 0
            })
        }

        setState({
            ...state,
            activeSlide: activeSlide + 1,
            translate: (activeSlide + 1) * getWidth()
        })
    }

    const prevSlide = () => {
        if (activeSlide === 0) {
            return setState({
                ...state,
                translate: (slides.length - 1) * getWidth(),
                activeSlide: slides.length - 1
            })
        }

        setState({
            ...state,
            activeSlide: activeSlide - 1,
            translate: (activeSlide - 1) * getWidth()
        })
    }

    const handleClick = (index : number) => {
        setState({
            ...state,
            activeSlide: index,
            translate: index * getWidth()
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


            {/* 좌우이동 화살표 및 함수 추가 */}
            <Arrow direction="left" handleClick={prevSlide} />
            <Arrow direction="right" handleClick={nextSlide} />

            {/*Dots*/}
            <Dots slides={slides} activeSlide={activeSlide} handleClick={handleClick} />

        </S.Slider>

    )

}

export default Slider