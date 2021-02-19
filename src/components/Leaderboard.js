import {fetchLeaderboard, insertLeaderboard} from "../services/coreApis";
import React, {useEffect, useRef, useState} from "react";
import {Flex, Tag, Text} from "@chakra-ui/react";
import {getLocalStorageName} from "../utils/localStorageNameFunctions";
import useApp from "../useApp";
import {Spinner} from "@chakra-ui/spinner";

const Leaderboard = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [leaderboard, setLeaderboard] = useState([]);
  const [idOnLeaderboard, setIdOnLeaderboard] = useState('');
  const scrollToLeaderboardRef = useRef(null)

  const getLeaderboard = () => {
    fetchLeaderboard()
      .then((response) => {
        setLeaderboard(response.data.leaderboard);
      })
      .catch((error) => {
        console.log("get leaderboardda hata");
        console.log(error);
      });
  };

  let payload;
  let name;
  let score;

  const addLeaderboard = () => {
    name = getLocalStorageName()
    score = (
      (gameState.sampleIconNumber * parseInt(gameState.difficultyLevel) * 1000)
      / ((Date.now() - gameState.startTimestamp))
    ) * 1000
    score = parseFloat(score.toFixed(2))
    payload = {name: name, score: score}
    insertLeaderboard({data: payload})
      .then((response) => {
        setIdOnLeaderboard(response.data?.addResult?.insertedId)
      }).then(getLeaderboard)
      .catch((error) => {
        console.log("error on leaderboard");
        console.log(error);
      });
  };

  useEffect(() => {
    addLeaderboard();
    //game is ended, calculate game point
  }, []);

  useEffect(() => {
    if (leaderboard.length && scrollToLeaderboardRef.current) {
      setTimeout(() => {
        scrollToLeaderboardRef.current.scrollIntoView({behavior: 'smooth', block: 'center'});
      }, 1000)
    }
  }, [leaderboard.length])

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Text fontWeight="bold">Leaderboard</Text>
      {
        leaderboard.length
          ?
          leaderboard.map((item, idx) => (
            (item.name && item.score) &&
            <Tag
              backgroundColor={item._id === idOnLeaderboard ? "pink.200" : "teal.200"}
              width="17em"
              display="flex"
              color="facebook.600"
              p="5px"
              m="2px"
              ref={item._id === idOnLeaderboard ? scrollToLeaderboardRef : null}
            >
              {idx + 1} - {item.name} - {item.score}
            </Tag>
            || ''
          ))
          :
          <>
            <Spinner color="red.500"/>
            <Text>Loading..</Text>
          </>
      }
    </Flex>
  )
}

export default Leaderboard;
