import {IconButton} from "@chakra-ui/react";
import React, {useState} from "react";
import useApp from "../useApp";
import {sampleSize} from "lodash";


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

  let showIconList;

  if (mainPalet) {
    showIconList = iconList;
  } else {
    showIconList = sampleIconList;
  }

  const [greenIconList, setGreenIconList] = useState([])

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

  const changeIconList = () => {
    let newSample = sampleSize(showIconList, numberOfIcons);
    gameActions.setGeneratedIconList(newSample);
  };

  if (mainPalet) {
    setTimeout(() => changeIconList(), iconChangeMilliSeconds);
  }

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