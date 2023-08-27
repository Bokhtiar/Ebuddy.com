import React from "react";
import styled, { css } from "styled-components";

export const Flex = styled.div`
  ${({
    bg,
    bgImage,
    bgOverlay,
    justify,
    align,
    direction,
    height,
    full,
    space,
    relative,
    border,
    borderRadius,
  }) => css`
    display: flex;
    background-color: ${bg};
    background: url(${bgImage}) ${bgOverlay};
    background-blend-mode: overlay;
    background-size: cover;
    justify-content: ${justify || "flex-start"};
    align-items: ${align || "flex-start"};
    flex-direction: ${direction || "row"};
    height: ${height || "auto"};
    padding: ${space};
    width: ${full ? "100%" : "auto"};
    position: ${relative && "relative"};
    border: ${border};
    border-radius: ${borderRadius};
  `}
`;
