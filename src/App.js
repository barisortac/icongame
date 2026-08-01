import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ChakraProvider, Flex, Text, Image, Box} from "@chakra-ui/react";
import {Divider} from "@chakra-ui/layout";


const App = () => {
  return (
    <ChakraProvider resetCSS>
      <Box
        bgGradient="linear(to-br, blue.600, blue.900)"
        minH="100vh"
        width="100%"
        color="white"
        py="3em"
      >
        <Flex justifyContent="center" alignItems="center" flexDirection="column" px="1em">
          <Image
            src="/brain-logo.png"
            alt="Zeka Küpü Logo"
            boxSize="100px"
            borderRadius="full"
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.2)"
            mb="1em"
          />
          <Text fontWeight="extrabold" fontSize="3xl" letterSpacing="wider">ZEKA KÜPÜ</Text>
          <Text fontWeight="bold" color="pink.300" fontSize="sm" mt="0.2em">
            Ekin Yazıcı & Barış Ortaç
          </Text>
          <Divider maxW="18em" mt="1em" mb="2em" borderColor="whiteAlpha.400" />
          <Router>
            <Switch>
              <Route exact path="/">
                <Login/>
              </Route>
              <Route path="/game">
                <Game/>
              </Route>
            </Switch>
          </Router>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App;
