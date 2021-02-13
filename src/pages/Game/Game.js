import React, {useEffect, useState} from 'react'
import {Flex, Text,} from '@chakra-ui/react'
import Icons from "../../components/Icons";
import iconList from "../../components/IconProvider";
import {sample, sampleSize} from "lodash";
import useApp from "../../useApp";
import Lottie from 'react-lottie';
import animationData from '../../lotties/lottie.json';
import animationData2 from '../../lotties/lottie_2.json';
import animationData3 from '../../lotties/lottie_3.json';
import Leaderboard from "../../components/Leaderboard";
import NewGame from "../../components/NewGame";

let colorIconList = {}

const selectedAnimation = sample([animationData, animationData2, animationData3])

const Game = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const initialColor = sampleSize([
    "red", "green", "orange", "pink", "yellow", "teal", "blue", "cyan", "purple", "linkedin", "facebook"
  ], gameState.sampleIconNumber)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: selectedAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const sampleIconNumber = gameState.sampleIconNumber
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
        sample = sampleSize(_iconList, sampleIconNumber);
        if (sample.length) {
          gameActions.setSampleIcons(sample);
        }
      }

      return () => {
        gameActions.setStartTimestamp(Date.now())
        gameActions.resetFoundItem()
        gameActions.resetSampleIcons()
        colorIconList = {}
      }
    },
    [])

  return (
    <>
      <Flex justifyContent="center" flexDirection="row"
            wrap="wrap" mr="50px" ml="50px" mt="1em"
            border="1px" borderColor="gray.600" maxW="18em"
      >
        {gameState.foundIcon === sampleIconNumber
          ?
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
          />
          :
          <Icons
            mainPalet={true}
            numberOfIcons={numberOfIcons}
            doColorIcon={doColorIcon}
            colorIconList={colorIconList}
          />
        }
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt="1em" flexDirection="column">
        {gameState.foundIcon !== sampleIconNumber &&
        <>
          <Text fontWeight="bold" fontSize="xs">Objective</Text>
          <Text>FIND THESE ICONS</Text>
          <Flex flexDirection="row">
            <Icons
              colorIconList={colorIconList}
            />
          </Flex>
        </>
        }

        {gameState.foundIcon === sampleIconNumber &&
        <>
          <Text fontWeight="bold" color="green.500" fontSize="4xl">CONGRATS!</Text>
          <NewGame/>
          <Leaderboard/>
        </>
        }
      </Flex>
    </>
  )
}

export default Game;
