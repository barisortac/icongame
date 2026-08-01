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
          variant="solid"
          size="md"
          border="2px"
          borderColor="whatsapp.600"
          display="flex"
          textAlign="center"
          fontWeight="bold"
          backgroundColor="whatsapp.500"
          color="white"
          _hover={{ backgroundColor: "whatsapp.600" }}
          onClick={handleClick}
        >
          Tekrar Dene?
        </Button>
    </>
  )
}

export default NewGame;