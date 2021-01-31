import React, {useEffect, useState} from 'react'
import {
  ChakraProvider,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from '@chakra-ui/react'
import Icons from "./components/IconList";
import iconList from "./components/IconProvider";
import {sampleSize} from "lodash";
import useApp from "./useApp";
import RestartGame from "./components/RestartGame";


const App = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [iconChangeMilliSeconds, setIconChangeMilliSeconds] = useState(12000)
  const [numberOfSample, setNumberOfSample] = useState(4)
  const [numberOfIcons, setNumberOfIcons] = useState(35)

  const _iconList = sampleSize(iconList, numberOfIcons);

  let sample;
  let sampleIdList;

  useEffect(
    () => {
      gameActions.setGeneratedIconList(_iconList);
      if (!gameState.isSampleSet && !sampleIdList) {
        sample = sampleSize(_iconList, numberOfSample);
        if (sample.length) {
          gameActions.setSampleIcons(sample);
        }
      }
    },
    [])

  return (
    <ChakraProvider resetCSS>
      <Flex justifyContent="center" alignItems="center" mt="3em" flexDirection="column">
        <Text fontWeight="bold">ICON GAME</Text>
        <Text fontWeight="bold" color="pink.400" fontSize="xs">Barış Ortaç</Text>
        <Text mt="1em" >Difficulty Level</Text>
        <Slider
          aria-label="slider-ex-2" size="lg" step="25" colorScheme="pink" maxW="20em"
          defaultValue={0}
          onChangeEnd={(val) => {
            setIconChangeMilliSeconds((120 - parseInt(val)) * 100)
          }}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato"/>
          </SliderTrack>
          <SliderThumb/>
        </Slider>
        <Text>
          Change Interval: {iconChangeMilliSeconds / 1000} secs
        </Text>

        <Flex justifyContent="center" flexDirection="row"
              wrap="wrap" mr="50px" ml="50px" mt="1em"
              border="1px" borderColor="gray.600" maxW="20em"
        >
          <Icons
            mainPalet={true}
            iconChangeMilliSeconds={iconChangeMilliSeconds}
            numberOfIcons={numberOfIcons}
          />
        </Flex>
        <Flex justifyContent="center" alignItems="center" mt="1em" flexDirection="column">
          <Text>FIND THESE ICONS</Text>
          <Flex flexDirection="row">
            <Icons/>
          </Flex>
          <Text>FOUND: {gameState.foundIcon}</Text>
          {gameState.foundIcon === numberOfSample &&
          <>
            <Text fontWeight="bold" color="green.500" fontSize="4xl">CONGRATS!</Text>
            <RestartGame/>
          </>
          }
        </Flex>
      </Flex>

    </ChakraProvider>
  )
}

export default App;
