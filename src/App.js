import Game from "./pages/Game/Game";
import Login from "./pages/Login/Login";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {ChakraProvider, Flex, Text} from "@chakra-ui/react";
import {Divider} from "@chakra-ui/layout";


// const routes = [
//   {
//     component: Game,
//     path: '/game',
//     exact: true,
//   },
//   {
//     component: Login,
//     path: '/',
//     exact: true,
//   },
// ]


const App = () => {
  return (
    <ChakraProvider resetCSS>
      <Flex justifyContent="center" alignItems="center" mt="1em" mr="5em" ml="5em" flexDirection="column">
        <Text fontWeight="bold">ICON GAME</Text>
        <Text fontWeight="bold" color="pink.400" fontSize="xs">Barış Ortaç</Text>
        <Divider maxW="18em"/>
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
    </ChakraProvider>
  )
}

export default App;
