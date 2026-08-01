import {Grid, Box, Text, Spinner, Flex} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import useApp from "../useApp";
import useInterval from "./useInterval"
import CountDownProgressBar from "./CountDownProgressBar";
import {useHistory} from "react-router-dom";

const Icons = ({
  mainPalet = false,
  doColorIcon = null,
  colorIconList = null,
}) => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const history = useHistory();
  const iconList = gameState.generatedIconList;
  const sampleIconList = gameState.sampleIconList;
  const iconChangeMilliSeconds = gameState.iconChangeMilliSeconds;
  
  const [cDown, setCDown] = useState(iconChangeMilliSeconds);
  const [mainTime, setMainTime] = useState(300); // 5 minutes in seconds
  const [isPreview, setIsPreview] = useState(mainPalet); // Only main board has preview countdown
  const [previewCD, setPreviewCD] = useState(4); // 4 seconds preview
  const [tempRevealed, setTempRevealed] = useState([]);

  let showIconList = mainPalet ? iconList : sampleIconList;
  let sampleIdList = (sampleIconList && sampleIconList.map(i => i.id)) || [];

  const handleCardClick = (id) => {
    if (!mainPalet || isPreview) return;
    // If already correctly found or currently temporarily revealed, do nothing
    if (colorIconList[id] || tempRevealed.includes(id)) return;

    if (sampleIdList.includes(id)) {
      gameActions.increaseFoundItem();
      doColorIcon({selectedIconId: id});
    } else {
      // Temporarily reveal wrong card
      setTempRevealed(prev => [...prev, id]);
      setTimeout(() => {
        setTempRevealed(prev => prev.filter(x => x !== id));
      }, 800);
    }
  }

  // Handle preview countdown
  useEffect(() => {
    if (!mainPalet) return;
    if (previewCD > 0) {
      const timer = setTimeout(() => {
        setPreviewCD(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsPreview(false);
      gameActions.setStartTimestamp(Date.now()); // Restart start timestamp after preview ends
    }
  }, [previewCD, mainPalet]);

  // Main countdown timer and Shuffle timer
  useInterval(() => {
    if (!mainPalet || isPreview) return;

    // Decrement main game timer
    setMainTime((prevTime) => {
      if (prevTime <= 1) {
        alert("Süre doldu! Yeniden dene.");
        history.push("/");
        return 0;
      }
      return prevTime - 1;
    });

    // Decrement shuffle timer
    setCDown((prevCDown) => {
      if (prevCDown <= 1000) {
        gameActions.shuffleIcons();
        return iconChangeMilliSeconds;
      }
      return prevCDown - 1000;
    });
  }, 1000);

  useEffect(() => {
    setCDown(iconChangeMilliSeconds);
  }, [iconChangeMilliSeconds]);

  // Formatter for MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  const cols = mainPalet ? Math.round(Math.sqrt(showIconList.length)) : showIconList.length;

  return (
    <Flex flexDirection="column" alignItems="center" width="100%">
      {mainPalet && isPreview && (
        <Text fontWeight="extrabold" fontSize="md" whiteSpace="nowrap" mb="4" color="pink.300" animation="pulse 1s infinite">
          Zihnini hazırla! Emojiler kapatılıyor: {previewCD}
        </Text>
      )}

      {mainPalet && !isPreview && (
        <Text fontWeight="extrabold" fontSize="xl" whiteSpace="nowrap" mb="4" color="pink.300">
          Kalan Süre: {formatTime(mainTime)} ⏱️
        </Text>
      )}

      <Grid
        templateColumns={`repeat(${cols}, 1fr)`}
        gap="3"
        justifyContent="center"
        alignItems="center"
        p="2"
      >
        {showIconList.length &&
          showIconList.map((i, key) => {
            const isCorrect = colorIconList && colorIconList[i.id];
            const isOpen = !mainPalet || isPreview || isCorrect || tempRevealed.includes(i.id);

            return (
              <Box
                key={key}
                as="button"
                onClick={() => handleCardClick(i.id)}
                disabled={!mainPalet || isPreview}
                width={mainPalet ? "50px" : "45px"}
                height={mainPalet ? "50px" : "45px"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize={mainPalet ? "2xl" : "xl"}
                borderRadius="lg"
                transition="all 0.2s"
                cursor={(!mainPalet || isPreview) ? "default" : "pointer"}
                bg={
                  isCorrect
                    ? "whatsapp.500"
                    : tempRevealed.includes(i.id)
                    ? "red.500"
                    : isOpen
                    ? "whiteAlpha.300"
                    : "blue.800"
                }
                border="2px solid"
                borderColor={
                  isCorrect
                    ? "whatsapp.400"
                    : tempRevealed.includes(i.id)
                    ? "red.400"
                    : isOpen
                    ? "whiteAlpha.400"
                    : "blue.500"
                }
                boxShadow={isOpen ? "0 4px 12px rgba(255,255,255,0.1)" : "none"}
                _hover={{
                  transform: (!mainPalet || isPreview || isCorrect) ? "none" : "scale(1.05)",
                  bg: isCorrect
                    ? "whatsapp.500"
                    : tempRevealed.includes(i.id)
                    ? "red.500"
                    : isOpen
                    ? "whiteAlpha.400"
                    : "blue.700",
                }}
                _active={{
                  transform: (!mainPalet || isPreview || isCorrect) ? "none" : "scale(0.95)",
                }}
              >
                {isOpen ? i.icon : "❓"}
              </Box>
            );
          })}
      </Grid>

      {mainPalet && !isPreview && (
        <Grid width="100%" maxW="18em" mt="4">
          <Text fontSize="xs" color="blue.200" mb="1" textAlign="center">Karıştırılmaya Kalan Süre</Text>
          <CountDownProgressBar cDown={cDown} iconChangeMilliSeconds={iconChangeMilliSeconds} />
        </Grid>
      )}
    </Flex>
  );
};

export default Icons;