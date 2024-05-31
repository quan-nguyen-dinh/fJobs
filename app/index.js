import { Redirect } from "expo-router";
import React from "react";

console.disableYellowBox = true

const index = () => {
  return (
      <Redirect href="/(authenticate)/login" />
  );
};

export default index;