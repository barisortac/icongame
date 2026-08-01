import {Grid, Box, Text, Spinner, Flex, Button} from "@chakra-ui/react";
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
  const [isStarted, setIsStarted] = useState(false); // Pre-game ready step
  const [isPreview, setIsPreview] = useState(false); // Memory preview phase
  const [previewCD, setPreviewCD] = useState(4); // 4 seconds preview
  const [isShufflePreview, setIsShufflePreview] = useState(false); // Shuffle preview phase
  const [shuffleCD, setShuffleCD] = useState(0); // Shuffle countdown timer
  const [tempRevealed, setTempRevealed] = useState([]);

  let showIconList = mainPalet ? iconList : sampleIconList;
  let sampleIdList = (sampleIconList && sampleIconList.map(i => i.id)) || [];

  const handleCardClick = (id) => {
    if (!mainPalet || !isStarted || isPreview || isShufflePreview) return;
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
    if (!mainPalet || !isStarted) return;
    if (previewCD > 0) {
      const timer = setTimeout(() => {
        setPreviewCD(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsPreview(false);
      gameActions.setStartTimestamp(Date.now()); // Restart start timestamp after preview ends
    }
  }, [previewCD, mainPalet, isStarted]);

  // Handle shuffle countdown
  useEffect(() => {
    if (shuffleCD > 0) {
      const timer = setTimeout(() => {
        setShuffleCD(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsShufflePreview(false);
    }
  }, [shuffleCD]);

  // Main countdown timer and Shuffle timer
  useInterval(() => {
    if (!mainPalet || !isStarted || isPreview || isShufflePreview) return;

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
        // Trigger shuffle preview for 3 seconds
        setIsShufflePreview(true);
        setShuffleCD(3);
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

  // Render pre-game preparation panel
  if (mainPalet && !isStarted) {
    return (
      <Flex flexDirection="column" alignItems="center" justifyContent="center" py="3em" px="1em">
        <Text fontSize="lg" fontWeight="bold" mb="6" textAlign="center" color="pink.100">
          Zihnini topla ve hazır olduğunda başla! 🧠
        </Text>
        <Button
          colorScheme="pink"
          size="lg"
          px="2em"
          py="1.5em"
          fontSize="xl"
          fontWeight="extrabold"
          borderRadius="xl"
          boxShadow="0 8px 16px rgba(213, 63, 140, 0.4)"
          _hover={{ transform: "scale(1.05)" }}
          _active={{ transform: "scale(0.95)" }}
          onClick={() => {
            setIsStarted(true);
            setIsPreview(true);
            setPreviewCD(4);
          }}
        >
          Başla! 🚀
        </Button>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center" width="100%">
      {mainPalet && isPreview && (
        <Text fontWeight="extrabold" fontSize="md" whiteSpace="nowrap" mb="4" color="pink.300" animation="pulse 1s infinite">
          Zihnini hazırla! Emojiler kapatılıyor: {previewCD}
        </Text>
      )}

      {mainPalet && isShufflePreview && (
        <Text fontWeight="extrabold" fontSize="md" whiteSpace="nowrap" mb="4" color="pink.300" animation="pulse 1s infinite">
          Karıştırıldı! Yeni yerleri aklında tut: {shuffleCD} ⏳
        </Text>
      )}

      {mainPalet && !isPreview && !isShufflePreview && (
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
            const isOpen = !mainPalet || isPreview || isShufflePreview || isCorrect || tempRevealed.includes(i.id);

            return (
              <Box
                key={key}
                as="button"
                onClick={() => handleCardClick(i.id)}
                disabled={!mainPalet || isPreview || isShufflePreview}
                width={mainPalet ? "50px" : "45px"}
                height={mainPalet ? "50px" : "45px"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                fontSize={mainPalet ? "2xl" : "xl"}
                borderRadius="lg"
                transition="all 0.2s"
                cursor={(!mainPalet || isPreview || isShufflePreview) ? "default" : "pointer"}
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
                  transform: (!mainPalet || isPreview || isShufflePreview || isCorrect) ? "none" : "scale(1.05)",
                  bg: isCorrect
                    ? "whatsapp.500"
                    : tempRevealed.includes(i.id)
                    ? "red.500"
                    : isOpen
                    ? "whiteAlpha.400"
                    : "blue.700",
                }}
                _active={{
                  transform: (!mainPalet || isPreview || isShufflePreview || isCorrect) ? "none" : "scale(0.95)",
                }}
              >
                {isOpen ? i.icon : "❓"}
              </Box>
            );
          })}
      </Grid>

      {mainPalet && !isPreview && !isShufflePreview && (
        <Grid width="100%" maxW="18em" mt="4">
          <Text fontSize="xs" color="blue.200" mb="1" textAlign="center">Karıştırılmaya Kalan Süre</Text>
          <CountDownProgressBar cDown={cDown} iconChangeMilliSeconds={iconChangeMilliSeconds} />
        </Grid>
      )}
    </Flex>
  );
};

export default Icons;