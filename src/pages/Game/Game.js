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
  const sampleIconList = gameState.sampleIconList;
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
      <Flex justifyContent="center" alignItems="center" mt="1em" flexDirection="column" color="white">
        {gameState.foundIcon !== sampleIconNumber &&
        <>
          <Text fontWeight="extrabold" fontSize="md" color="pink.300" mb="2">
            Bulunan Emojiler: {gameState.foundIcon} / {sampleIconNumber} 🎯
          </Text>
          <Text fontWeight="bold" fontSize="xs" color="blue.200">Hedef</Text>
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
          
          <Flex flexDirection="column" alignItems="center" bg="whiteAlpha.100" p="1.25em" borderRadius="2xl" mb="4" border="1px solid" borderColor="whiteAlpha.200" width="100%" maxW="20em">
            <Text fontSize="xs" fontWeight="bold" color="blue.200" mb="2">Buldun:</Text>
            <Flex gap="3" wrap="wrap" justifyContent="center">
              {sampleIconList && sampleIconList.map((i, key) => (
                <Box
                  key={key}
                  fontSize="2xl"
                  p="2"
                  bg="whatsapp.500"
                  borderRadius="full"
                  boxShadow="0 4px 10px rgba(0, 255, 0, 0.2)"
                  width="45px"
                  height="45px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {i.icon}
                </Box>
              ))}
            </Flex>
          </Flex>

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

      <Flex justifyContent="center" flexDirection="row"
            wrap="wrap" mt="1.5em" width="100%"
      >
        {gameState.foundIcon === sampleIconNumber
          ?
          (showStars ? (
            <Box width="360px" height="120px" display="flex" justifyContent="center" alignItems="center">
              <Lottie
                options={starsOptions}
                height={120}
                width={360}
              />
            </Box>
          ) : (
            <Box width="220px" height="220px" display="flex" justifyContent="center" alignItems="center" cursor="pointer" onClick={() => setShowStars(true)}>
              <Lottie
                options={defaultOptions}
                height={160}
                width={160}
              />
            </Box>
          ))
          :
          <Icons
            mainPalet={true}
            numberOfIcons={numberOfIcons}
            doColorIcon={doColorIcon}
            colorIconList={colorIconList}
          />
        }
      </Flex>
    </>
  )
}

export default Game;
