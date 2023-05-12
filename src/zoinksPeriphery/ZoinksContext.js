import React from "react";
import zoinksContextServicesShape from "./zoinksContextServicesShape.json";
import zoinksContextConstants from "./zoinksContextConstants.json";

export const generatedShape = {
  ...zoinksContextServicesShape,
  ...zoinksContextConstants,
};

export const ZoinksContext = React.createContext(generatedShape);
