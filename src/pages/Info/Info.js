import React from 'react'
import {Flex, Link, Text} from '@chakra-ui/react'
import {Divider} from "@chakra-ui/layout";

const Info = () => {
  return (
    <Flex>
      <Flex flexDirection="column" mt="4em" fontSize="l">
        <Divider mt="1em" mb="1em"/>
        <Text fontWeight="bold" display="block" fontSize="xl">
          What is this?
        </Text>
        <Text>
          It is a proof-of-concept game that includes <b>React, ChakraUI, MongoDB,
          Express, ContextAPI, Reducer, and Vercel</b> for the deployment.
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          What is the objective?
        </Text>
        <Text>
          Find the sampled icons in the icon pool. You will get a score according to
          your finish time & difficulty level.
        </Text>
        <Text fontWeight="bold" fontSize="xl">
          Can I see your code?
        </Text>
        <Text>
          Yep. I published the repositories for both backend & frontend. Here are the links:
        </Text>
        <Link href="https://github.com/barisortac/icongame">https://github.com/barisortac/icongame</Link>
        <Link href="https://github.com/barisortac/icongameserver">https://github.com/barisortac/icongameserver</Link>
      </Flex>
    </Flex>
  )
}

export default Info;
