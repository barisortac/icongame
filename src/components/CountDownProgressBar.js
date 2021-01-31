import React, {useEffect, useState} from "react";
import useApp from "../useApp";
import {Progress} from "@chakra-ui/progress";
import useIntervalCountdown from "./useInterval";
import {Text} from "@chakra-ui/react";

const CountDownProgressBar = (
  {
    iconChangeMilliSeconds,
  }) => {
  const tempSeconds = iconChangeMilliSeconds / 1000;
  const [seconds, setSeconds] = useState(tempSeconds - 1);

  useIntervalCountdown(() => {
    setSeconds(seconds - 1);
    if (seconds === 0) {
      setSeconds(tempSeconds)
    }
  }, 1000);

  useEffect(()=> {
    setSeconds(tempSeconds - 1)
  }, [iconChangeMilliSeconds])

  return (
    <>
      <Progress value={(seconds*100)/(tempSeconds)} size="xs" colorScheme="pink" maxW="30em"/>
      <Text>
          Change Interval: {iconChangeMilliSeconds} secs
      </Text>
    </>

  )
}

export default CountDownProgressBar;