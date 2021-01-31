import {CircularProgress, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import useApp from "../useApp";


const RestartGame = ({}) => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [gameRestartMilliSeconds, setGameRestartMilliSeconds] = useState(4000)
  const calculateTimeLeft = () => {
    if (gameRestartMilliSeconds - 1000 === 0) {
      clearTimeout(timer)
      return window.location.reload();
    }
    return gameRestartMilliSeconds - 1000;
  }

  const timer = setTimeout(() => {
    setGameRestartMilliSeconds(calculateTimeLeft());
  }, 1000);

  return (
    <>
      <Text>Game is restarting...</Text>
      <CircularProgress value={gameRestartMilliSeconds / 40} size="100px"/>
    </>
  )
}

export default RestartGame;