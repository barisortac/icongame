import React, {useRef, useState} from 'react'
import {Button, Flex, Input, InputGroup} from '@chakra-ui/react'
import useApp from "../../useApp";
import {useHistory} from 'react-router-dom'
import {getLocalStorageName, setLocalStorageName} from "../../utils/localStorageNameFunctions";

const Login = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [name, setName] = useState('')

  let history = useHistory()
  const submitRef = useRef()

  // if (getLocalStorageName()) {
  //   history.push('/game')
  // }
  const handleClick = () => {
    if (!name){
      alert("Name cannot be blank!");
      return;
    }
    setLocalStorageName(name);
    let _name = getLocalStorageName();
    history.push('/game')
  }

  const something = (event) => {
    if (event.keyCode === 13) {
      // console.log(submitRef);
      submitRef.current.click();
    }
  }

  return (
    <Flex justifyContent="center" alignItems="center" mt="4em">
      <InputGroup maxWidth="30em">
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
          maxWidth="30em"
          color="blackAlpha.900"
          onChange={e => setName(e.target.value)}
          onKeyDown={(e) => something(e)}
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
          Submit
        </Button>
      </InputGroup>
    </Flex>
  )
}

export default Login;
