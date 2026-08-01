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
      alert("İsim alanı boş bırakılamaz!");
      return;
    }

    var bannedNames = ["bahadır", "bahadir", "hileci", "cheat", "cheater", "yagmur"]

    if (bannedNames.includes(name.toLowerCase())) {
      alert("Hilecilere izin verilmiyor! Lütfen farklı bir isim girin.");
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
    <Flex flexDirection="column" justifyContent="center" alignItems="center" mt="2em" color="white">
      <Text fontWeight="bold" fontSize="lg">Bir Zorluk Seviyesi Seçin</Text>
      <Text fontSize="xs" color="blue.200" mb="1em">(Zorluk detaylarını görmek için yazıların üzerine gelin)</Text>
      <Flex justifyContent="space-between">
        <RadioGroup onChange={setDifficulty} defaultValue="1" value={difficulty} mt="1em">
          <Stack direction="row" spacing="4">
            <Radio value="1" colorScheme="pink">
              <Tooltip label="9 emoji (3x3) | 1 hedef | 20 sn karıştırma" fontSize="md">
                Kolay
              </Tooltip>
            </Radio>
            <Radio value="2" colorScheme="pink">
              <Tooltip label="16 emoji (4x4) | 3 hedef | 15 sn karıştırma" fontSize="md">
                Normal
              </Tooltip>
            </Radio>
            <Radio value="3" colorScheme="pink">
              <Tooltip label="25 emoji (5x5) | 5 hedef | 10 sn karıştırma" fontSize="md">
                Zor
              </Tooltip>
            </Radio>
            <Radio value="4" colorScheme="pink">
              <Tooltip label="36 emoji (6x6) | 10 hedef | 8 sn karıştırma" fontSize="md">
                İmkansız
              </Tooltip>
            </Radio>
          </Stack>
        </RadioGroup>
      </Flex>
      <InputGroup maxWidth="20em" mt="2em">
        <Input
          display="flex"
          placeholder="Lütfen adınızı girin..."
          variant="filled"
          size="md"
          border="2px"
          borderColor="blue.300"
          bg="blue.800"
          _hover={{ bg: "blue.700" }}
          _focus={{ bg: "blue.700", borderColor: "pink.400" }}
          fontWeight="bold"
          textAlign="center"
          maxWidth="20em"
          color="white"
          onChange={e => setName(e.target.value)}
          value={name}
          onKeyDown={(e) => handleEnter(e)}
        />
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
          ref={submitRef}
        >
          Başla
        </Button>
      </InputGroup>
      <Info/>
    </Flex>
  )
}

export default Login;
