import React, {useEffect, useState} from 'react'
import {Flex, Text,} from '@chakra-ui/react'
import Icons from "../../components/Icons";
import iconList from "../../components/IconProvider";
import {sampleSize} from "lodash";
import useApp from "../../useApp";
import Lottie from 'react-lottie';
import squeezeBunnyAnimation from '../../lotties/Squeeze bunny _(.json';
import Leaderboard from "../../components/Leaderboard";
import NewGame from "../../components/NewGame";

let colorIconList = {}

const selectedAnimation = squeezeBunnyAnimation;

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

      gameActions.setStartTimestamp(Date.now())

      return () => {
        gameActions.resetFoundItem()
        gameActions.resetSampleIcons()
        colorIconList = {}
      }
    },
    [])

  return (
    <>
      <Flex justifyContent="center" flexDirection="row"
            wrap="wrap" mt=".25em" maxW="22em"
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
      <Flex justifyContent="center" alignItems="center" mt="1em" flexDirection="column" color="white">
        {gameState.foundIcon !== sampleIconNumber &&
        <>
          <Text fontWeight="bold" fontSize="xs" color="pink.300">Hedef</Text>
          <Text fontWeight="extrabold" fontSize="md" mb="2">BU İKONLARI BUL</Text>
          <Flex flexDirection="row">
            <Icons
              colorIconList={colorIconList}
            />
          </Flex>
        </>
        }

        {gameState.foundIcon === sampleIconNumber &&
        <>
          <Text fontWeight="extrabold" color="green.300" fontSize="4xl" mb="4">TEBRİKLER!</Text>
          <NewGame/>
          <Leaderboard/>
        </>
        }
      </Flex>
    </>
  )
}

export default Game;
