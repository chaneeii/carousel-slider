import React from 'react'
import styled from 'styled-components'

/* 스타일 가이드에 맞는 화살표로 변경 */
import leftArrow from '../img/left-arrow.svg'
import rightArrow from '../img/right-arrow.svg'


const S = {
    ArrowContainer : styled.div<{direction: 'right' | 'left' }>`
      display: flex;
      position: absolute;
      top: 50%;
      ${({direction}) => direction === 'right' ? `right: 25px` : `left: 25px`};
      height: 50px;
      width: 50px;
      justify-content: center;
      background: white;
      border-radius: 50%;
      cursor: pointer;
      align-items: center;
      transition: transform ease-in 0.1s;
      &:hover {
        transform: scale(1.1);
      }
      img {
        transform: translateX(${({direction}) => direction === 'left' ? '-2' : '2' }px);
        &:focus {
          outline: 0;
        }
      }
    `
}

interface Props {
    direction: 'right' | 'left';
    handleClick: () => void;
}

function Arrow({ direction, handleClick }: Props) {
    return(
        <S.ArrowContainer onClick={handleClick} direction={direction} >
            {direction === 'right' ? <img src={rightArrow} /> : <img src={leftArrow} />}
        </S.ArrowContainer>
    )
}

export default Arrow
