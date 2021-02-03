import React from "react";
import {Progress} from "@chakra-ui/progress";
import {Text} from "@chakra-ui/react";

const CountDownProgressBar = ({cDown, iconChangeMilliSeconds}) => {
  return (
    <>
      <Progress value={(cDown / iconChangeMilliSeconds) * 100 || 0} size="xs" colorScheme="pink" maxW="30em"/>
      <Text>
        Change Interval: {iconChangeMilliSeconds / 1000 || 0} secs
      </Text>
    </>

  )
}

export default CountDownProgressBar;