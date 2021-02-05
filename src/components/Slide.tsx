import React from 'react'
import styled from "styled-components";

const SlideContainer = styled.div<{content: string}>`
      height: 100%;
      width: 100%;
      background-image: url('${props => props.content}');
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
`


interface Props {
    content: string;
}

function Slide({content} : Props) {
    return(
        <SlideContainer content={content}/>
    )

}

export default Slide