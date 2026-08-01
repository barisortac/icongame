import React, {useEffect, useState} from 'react'
import {Flex, Text, Box, Button} from '@chakra-ui/react'
import Icons from "../../components/Icons";
import iconList from "../../components/IconProvider";
import {sampleSize} from "lodash";
import useApp from "../../useApp";
import Lottie from 'react-lottie';
import squeezeBunnyAnimation from '../../lotties/Squeeze bunny _(.json';
import starsAnimation from '../../lotties/5 stars.json';
import Leaderboard from "../../components/Leaderboard";
import NewGame from "../../components/NewGame";

let colorIconList = {}

const selectedAnimation = squeezeBunnyAnimation;

const Game = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [showStars, setShowStars] = useState(false);

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

  const starsOptions = {
    loop: true,
    autoplay: true,
    animationData: starsAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet"
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
            wrap="wrap" mt=".25em" width="100%"
      >
        {gameState.foundIcon === sampleIconNumber
          ?
          <Box position="relative" width="220px" height="220px" display="flex" justifyContent="center" alignItems="center">
            {showStars ? (
              <Lottie
                options={starsOptions}
                height={200}
                width={200}
              />
            ) : (
              <Box cursor="pointer" onClick={() => setShowStars(true)}>
                <Lottie
                  options={defaultOptions}
                  height={160}
                  width={160}
                />
              </Box>
            )}
          </Box>
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
          <Text fontWeight="extrabold" color="green.300" fontSize="4xl" mb="2">TEBRİKLER!</Text>
          {!showStars && (
            <Button
              mb="4"
              colorScheme="pink"
              size="md"
              fontWeight="bold"
              onClick={() => setShowStars(true)}
            >
              Tıkla 🌟
            </Button>
          )}
          <NewGame/>
          {/* Liderlik tablosu şimdilik gizlendi */}
        </>
        }
      </Flex>
    </>
  )
}

export default Game;
