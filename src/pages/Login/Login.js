import React, {useEffect, useRef, useState} from 'react'
import {Button, Flex, Input, InputGroup, Radio, RadioGroup, Stack, Text, Tooltip, Link} from '@chakra-ui/react'
import useApp from "../../useApp";
import {useHistory} from 'react-router-dom'
import {getLocalStorageName, setLocalStorageName} from "../../utils/localStorageNameFunctions";
import Info from "../Info/Info";

const Login = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [name, setName] = useState('')
  const [difficulty, setDifficulty] = React.useState("1")

  let history = useHistory()
  const submitRef = useRef()

  const handleClick = () => {
    if (!name) {
      alert("Name cannot be blank!");
      return;
    }
    setLocalStorageName(name);
    gameActions.setDifficultyLevel(difficulty)
    history.push('/game')
  }

  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      submitRef.current.click();
    }
  }

  useEffect(() => {
    let _name = getLocalStorageName()
    if (_name) {
      setName(_name)
    }
  }, [])

  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" mt="2em">
      <Text fontWeight="bold">Pick a Difficulty Level</Text>
      <Text fontSize="sm">(Hover (or click for mobile) onto texts to see difficulty info)</Text>
      <Flex justifyContent="space-between">
        <RadioGroup onChange={setDifficulty} defaultValue="1" value={difficulty} mt="1em">
          <Stack direction="row">
            <Radio value="1">
              <Tooltip label="10 secs | 4 icons" fontSize="md">
                Easy
              </Tooltip>
            </Radio>
            <Radio value="2">
              <Tooltip label="8 secs | 5 icons" fontSize="md">
                Second
              </Tooltip>
            </Radio>
            <Radio value="3">
              <Tooltip label="4 secs | 6 icons" fontSize="md">
                Hard
              </Tooltip>
            </Radio>
            <Radio value="4">
              <Tooltip label="2 secs | 8 icons" fontSize="md">
                Impossible
              </Tooltip>
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <InputGroup maxWidth="20em" mt="2em">
        {name}
        <Input
          display="flex"
          placeholder="Please enter your name..."
          variant="filled"
          size="md"
          border="2px"
          opacity={1}
          boxShadow="3em"
          fontWeight="bold"
          textAlign="center"
          maxWidth="20em"
          color="blackAlpha.900"
          onChange={e => setName(e.target.value)}
          value={name}
          onKeyDown={(e) => handleEnter(e)}
        />
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
          ref={submitRef}
        >
          Proceed
        </Button>
      </InputGroup>
      <Info/>
    </Flex>
  )
}

export default Login;
