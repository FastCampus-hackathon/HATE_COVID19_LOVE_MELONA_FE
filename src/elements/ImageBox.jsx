import React from "react";
import styled from "styled-components";

const ImageBox = (props) => {
  const {
    image,
    margin,
    padding,
    br,
    width,
    height,
    alt,
    position,
    top,
    left,
    right,
    bottom,
    _click,
    zIndex,
  } = props;
  const attr = {
    image,
    margin,
    padding,
    br,
    width,
    height,
    alt,
    position,
    top,
    left,
    right,
    bottom,
    _click,
    zIndex,
  };

  return <ImageContainer {...attr} onClick={_click} />;
};

export default ImageBox;

ImageBox.defaultProps = {
  width: "100%",
  height: "100%",
  padding: false,
  margin: false,
  position: "static",
  pointer: "none",
  _click: () => {},
  zIndex: "",
};

const ImageContainer = styled.img.attrs((props) => ({
  src: `${props.image ? props.image : null}`,
  alt: `${props.alt ? props.alt : null}`,
}))`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")};
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")};
  ${(props) => (props.br ? `border-radius: ${props.br};` : "")};
  ${(props) => (props.right ? `right: ${props.right};` : "")};
  ${(props) => (props.top ? `top: ${props.top};` : "")};
  ${(props) => (props.left ? `left: ${props.left};` : "")};
  ${(props) => (props.bottom ? `bottom: ${props.bottom};` : "")};
  position: ${(props) => props.position};
  cursor: ${(props) => props.pointer};
  z-index: ${(props) => props.zIndex};
`;
