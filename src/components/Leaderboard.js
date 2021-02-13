import {fetchLeaderboard, insertLeaderboard} from "../services/coreApis";
import React, {useEffect, useState} from "react";
import {Tag, Flex, Text} from "@chakra-ui/react";
import {getLocalStorageName} from "../utils/localStorageNameFunctions";
import {sum} from "lodash";
import useApp from "../useApp";
import {Spinner} from "@chakra-ui/spinner";

const Leaderboard = () => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const [leaderboard, setLeaderboard] = useState([]);
  const [idOnLeaderboard, setIdOnLeaderboard] = useState('');

  const getLeaderboard = () => {
    fetchLeaderboard()
      .then((response) => {
        console.log("GET LEADERBOARD CEVAP");
        console.log(response);
        console.log(JSON.stringify(leaderboard));
        setLeaderboard(response.data.leaderboard);
      })
      .catch((error) => {
        console.log("get leaderboardda hata");
        console.log(error);
      });
  };

  let payload;
  let name;
  const addLeaderboard = () => {
    name = getLocalStorageName()
    payload = {name: name, score: sum(gameState.gameSummary)}
    insertLeaderboard({data: payload})
      .then((response) => {
        setIdOnLeaderboard(response.data?.addResult?.insertedId)
      }).then(getLeaderboard)
      .catch((error) => {
        console.log("add leaderboardda hata");
        console.log(error);
      });
  };

  useEffect(() => {
    addLeaderboard();
  }, []);

  return (
    <Flex justifyContent="center" alignItems="center" flexDirection="column">
      <Text fontWeight="bold">Leaderboard</Text>
      {
        leaderboard.length
          ?
            leaderboard.map((item, idx) => (
              <Tag
                backgroundColor={item._id === idOnLeaderboard ? "green.300" : "teal.200"}
                width="17em"
                display="flex"
                color="facebook.600"
                p="5px"
                m="2px"
              >
                {idx + 1} - {item.name} - {item.score}
              </Tag>
            ))
          :
            <>
              <Spinner color="red.500" />
              <Text>Loading..</Text>
            </>
      }
    </Flex>
  )
}

export default Leaderboard;
