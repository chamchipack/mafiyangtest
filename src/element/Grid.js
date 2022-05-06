import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
  const {
    is_flex,
    width,
    margin,
    padding,
    bg,
    children,
    center,
    _onClick,
    flex,
    border,
    flex_column,
    isFlex_start,
    isFlex_center,
    height,
    overflow,
  } = props

  const styles = {
    is_flex: is_flex,
    width: width,
    height: height,
    padding: padding,
    margin: margin,
    bg: bg,
    center: center,
    flex: flex,
    border: border,
    flex_column: flex_column,
    isFlex_start: isFlex_start,
    isFlex_center: isFlex_center,
    overflow:overflow,
  }
  return (
    <React.Fragment>
      <GridBox {...styles} onClick={_onClick}>
        {children}
      </GridBox>
    </React.Fragment>
  )
}

Grid.defaultProps = {
  children: null,
  is_flex: false,
  width: '100%',
  height: '100%',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  flex: '',
  border: false,
  flex_column: false,
  isFlex_start: false,
  isFlex_center: false,
}

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  overflow:${(props) => props.overflow};
  box-sizing: border-box;
  ${(props) =>
    props.border ? `border: 2px solid black; border-radius: 10px;` : ''}
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
    ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
    ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
    ${(props) =>
      props.is_flex
        ? `display: flex; align-items: center; justify-content: space-between;`
        : ''}
    ${(props) => (props.center ? `text-align: center` : '')}
    ${(props) =>
      props.flex
        ? `position: relative; display: flex; justify-content: center; flex-direction: column;`
        : ''};
   ${(props) =>
     props.flex_column
       ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
       : null};
    ${(props) =>
      props.isFlex_start
        ? `display: flex; align-items: center; justify-content: start;`
        : null}
    ${(props) =>
      props.isFlex_center
        ? `display: flex; align-items: center; justify-content: center;`
        : null}
`

export default Grid
