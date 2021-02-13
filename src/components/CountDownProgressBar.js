import React from "react";
import {Progress} from "@chakra-ui/progress";
import {Text, Flex} from "@chakra-ui/react";
import {getLocalStorageName} from "../utils/localStorageNameFunctions";

const CountDownProgressBar = ({cDown, iconChangeMilliSeconds}) => {
  return (
    <>
      <Progress value={(cDown / iconChangeMilliSeconds) * 100 || 0} size="xs" colorScheme="pink" maxW="30em"/>
      <Flex justifyContent="space-between" mr="2px" ml="2px">
      <Text>
        Interval:{iconChangeMilliSeconds / 1000 || 0} secs
      </Text>
      <Text>
        {getLocalStorageName()}
      </Text>
      </Flex>
    </>

  )
}

export default CountDownProgressBar;