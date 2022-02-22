import React from "react";
import styled from "styled-components";
import { ImageBox } from ".";
import { Search, Align } from "../assets";

const Input = ({ _click, width, _change }) => {
  return (
    <InputContainer onClick={_click} width={width}>
      <ImageBox
        image={Search}
        alt='search icon'
        width='20em'
        height='20em'
        margin='0 0 0 20em'
      />
      <InputArea placeholder='주변 호흡기전담병원 검색' onChange={_change} />
      <ImageBox
        image={Align}
        alt='align icon'
        width='20em'
        height='20em'
        margin='0 8em 0 0'
      />
    </InputContainer>
  );
};

export default Input;

Input.defaultProps = {
  _click: () => {},
  width: "100%",
};

const InputContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background-color: #fefefe;
  border-radius: 0.375em;
  width: ${(props) => props.width};
  height: 48em;
  padding: 0.438em 1em 0.438em 0.375em;
  box-shadow: 0px 8px 18px -6px rgba(24, 39, 75, 0.12),
    0px 2px 42px -4px rgba(24, 39, 75, 0.12);
  border-radius: 10px;
  z-index: 10;
  position: absolute;
  top: 18em;
  left: 18em;
`;

const InputArea = styled.input.attrs((props) => ({
  placeholder: `${props.placeholder ? props.placeholder : null}`,
  type: "text",
}))`
  border: none;
  color: #888888;
  background-color: #fefefe;
  margin-left: 10rem;
  width: 270em;
  font-weight: 500;
  font-size: 18em;
`;
