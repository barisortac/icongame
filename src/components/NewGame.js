import {Button, CircularProgress, InputGroup, Text} from "@chakra-ui/react";
import React, {useState} from "react";
import useApp from "../useApp";
import {useHistory} from "react-router-dom";


const NewGame = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  let history = useHistory()

  const handleClick = () => (
    history.push('/')
  )

  return (
    <>
        <Button
          variant="ghost"
          size="md"
          border="2px"
          display="flex"
          textAlign="center"
          fontWeight="bold"
          backgroundColor="whatsapp.500"
          color="whiteAlpha.900"
          onClick={handleClick}
        >
          Try again?
        </Button>
    </>
  )
}

export default NewGame;