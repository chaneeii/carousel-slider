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
    infiniteLoop: boolean;
}


function Slider({slides, autoPlay, infiniteLoop}: Props) {

    /* 이미지 넓이 : 현재는 전체화면이라 윈도우 전체넓이 인듯? 나중에 props로 처리해야할듯함  */
    const getWidth = () => window.innerWidth

    const [state, setState] = useState({
        activeSlide: 0,
        translate: 0,
        transition: 0.45,
        autoPlaySpeed: autoPlay
    })

    /* Swipe - touch for mobile devices */
    // const [touchPosition, setTouchPosition] = useState(null)
    const [touchPosition, setTouchPosition] = useState(0)


    const fakeLastSlide = [slides[0]];
    const fakeSlide = slides.concat(fakeLastSlide);
    const [lastSlide, setLastSlide] = useState(false);


    const { translate, transition, activeSlide} = state


    // const autoPlayRef = useRef<() => void>(() => {})
    const autoPlayRef = useRef<() => void>(() => {})
    const resizeRef = useRef<() => void>(() => {})


    useEffect(()  => {
        autoPlayRef.current = nextSlide
        resizeRef.current = handleResize
    })

    useEffect(() => {

        const play = () => {
            autoPlayRef.current()
        }
        const resize = () => {
            resizeRef.current()
        }

        window.addEventListener('resize', resize)
        const interval = setInterval(play, state.autoPlaySpeed * 1000)

        return () => {
            window.removeEventListener('resize', resize)
            if (autoPlay) {
                clearInterval(interval)
            }
        }

    }, [state])



    /* touch event handler*/

    const handleTouchStart = (e: React.TouchEvent) => {
        const touchDown = e.touches[0].clientX
        setTouchPosition(touchDown)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        const touchDown = touchPosition

        if(touchDown === null) {
            return
        }

        const currentTouch = e.touches[0].clientX
        const diff = touchDown - currentTouch

        if (diff > 5) {
            nextSlide()
        }

        if (diff < -5) {
            prevSlide()
        }

        // setTouchPosition(null)
        setTouchPosition(0)
    }

    const handleResize = () => {
        setState({ ...state, translate: getWidth(), transition: 0 })
    }

    const nextSlide = () => {
        if (activeSlide === slides.length - 1) {
            return setState({
                ...state,
                activeSlide: activeSlide + 1,
                translate: (activeSlide + 1) * getWidth(),
                // transition: 0.45,
                transition: 0.6,
                autoPlaySpeed: 0.28
            })

        }

        if(activeSlide === fakeSlide.length - 1) {
            return setState({
                ...state,
                activeSlide: 0,
                translate: 0,
                transition: 0,
                autoPlaySpeed: autoPlay
            })
        }

        setState({
            ...state,
            activeSlide: activeSlide + 1,
            translate: (activeSlide + 1) * getWidth(),
            transition: 0.45
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
                width={getWidth() * fakeSlide.length}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
            >
                {fakeSlide.map((slide, i) => (
                    <Slide key={slide + i} content={slide} />
                ))}

            </SliderContent>


            {/*좌우이동 화살표 및 함수 추가*/}
            {/*<Arrow direction="left" handleClick={prevSlide} />*/}
            {/*<Arrow direction="right" handleClick={nextSlide} />*/}

            {/*Dots*/}
            <Dots slides={slides} activeSlide={activeSlide} handleClick={handleClick} />

        </S.Slider>

    )

}

export default Slider