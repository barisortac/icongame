import React, {useEffect, useState} from 'react'
import {ChakraProvider, Flex, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text,} from '@chakra-ui/react'
import Icons from "./components/IconList";
import iconList from "./components/IconProvider";
import {sampleSize, sample} from "lodash";
import useApp from "./useApp";
import RestartGame from "./components/RestartGame";
import {Divider} from "@chakra-ui/layout";
import Lottie from 'react-lottie';
import animationData from './lotties/lottie.json';
import animationData2 from './lotties/lottie_2.json';
import animationData3 from './lotties/lottie_3.json';

let colorIconList = {}
const initialColor = sampleSize([
  "red", "green", "orange", "pink", "yellow", "teal", "blue", "cyan",
  "purple", "pink", "linkedin", "facebook"
], 4)

const selectedAnimation = sample([animationData, animationData2, animationData3])

const App = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const [iconChangeMilliSeconds, setIconChangeMilliSeconds] = useState(12000)
  const [numberOfSample, setNumberOfSample] = useState(4)
  const numberOfIcons = gameState.numberOfIcons;
  const _iconList = sampleSize(iconList, numberOfIcons);

  const doColorIcon = ({selectedIconId}) => {
    colorIconList[selectedIconId] = initialColor.pop()
  }

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
      <Flex justifyContent="center" alignItems="center" mt="1em" flexDirection="column">
        <Text fontWeight="bold">ICON GAME</Text>
        <Text fontWeight="bold" color="pink.400" fontSize="xs">Barış Ortaç</Text>
        <Divider maxW="20em"/>
        <Text mt="1em" >Difficulty Level</Text>
        <Slider
          aria-label="slider-ex-2" size="lg" step="20" colorScheme="pink" maxW="20em"
          defaultValue={0}
          onChangeEnd={(val) => {
            setIconChangeMilliSeconds((100 - parseInt(val)) * 100)
          }}
        >
          <SliderTrack bg="red.100">
            <SliderFilledTrack bg="tomato"/>
          </SliderTrack>
          <SliderThumb bg="pink.200"/>
        </Slider>


        <Flex justifyContent="center" flexDirection="row"
              wrap="wrap" mr="50px" ml="50px" mt="1em"
              border="1px" borderColor="gray.600" maxW="20em"
        >
          { gameState.foundIcon === numberOfSample
            ?
              <Lottie
                options={defaultOptions}
                height={200}
                width={200}
              />
            :
              <Icons
                mainPalet={true}
                iconChangeMilliSeconds={iconChangeMilliSeconds}
                numberOfIcons={numberOfIcons}
                doColorIcon={doColorIcon}
                colorIconList={colorIconList}
              />
          }
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
