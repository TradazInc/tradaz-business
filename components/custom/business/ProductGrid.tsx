import React from "react";
import GridContainer from "../shared/GridContainer";

const ProductGrid = ({ children }: { children: React.ReactNode }) => {
  return <GridContainer>{children}</GridContainer>;
};

export default ProductGrid;
