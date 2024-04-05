import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  return (
      <Redirect href="/(authenticate)/login" />
  );
};

export default index;

//index.js => /
