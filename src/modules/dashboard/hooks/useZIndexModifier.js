/** @format */

import React from "react";

const useZIndexModifier = (index, currentIndex) => {
  return {
    zIndex: index === currentIndex ? 10 : -1,
    marginTop: `${index + 7}px`,
  };
};

export default useZIndexModifier;
