import {IconButton} from "@chakra-ui/react";
import React, {useEffect, useRef, useState} from "react";
import useApp from "../useApp";


const Icons = (
  {
    iconChangeMilliSeconds,
    numberOfIcons,
    mainPalet = false
  }) => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const iconList = gameState.generatedIconList;
  const sampleIconList = gameState.sampleIconList;
  const [greenIconList, setGreenIconList] = useState([])

  let showIconList;

  if (mainPalet) {
    showIconList = iconList;
  } else {
    showIconList = sampleIconList;
  }

  let sampleIdList = (sampleIconList && sampleIconList.map(i => i.id)) || [];
  const handleClick = (e) => {
    if (mainPalet) {
      const selectedIconId = parseInt(e.target.id || e.target.ownerSVGElement.id)
      if (sampleIdList && sampleIdList.includes(selectedIconId)) {
        gameActions.incrementFoundItem()
        let newState = [...greenIconList, selectedIconId]
        setGreenIconList(newState);
      }
    }
  }

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(() => {
    if (mainPalet) {
      gameActions.shuffleIcons();
    }
  }, iconChangeMilliSeconds);


  return (
    <>
      {showIconList.length &&
      showIconList.map((i, key) => (
        <IconButton
          aria-label="icon"
          colorScheme={mainPalet && greenIconList.includes(i['id']) ? "green" : "gray"}
          key={key}
          id={i['id']}
          icon={
            React.createElement(i['icon'],
              {
                'id': i['id']
              },
            )
          }
          size="md"
          onClick={handleClick}
        />
      ))
      }
    </>
  )
}

export default Icons;