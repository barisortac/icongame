import {Grid, IconButton} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import useApp from "../useApp";
import useInterval from "./useInterval"
import CountDownProgressBar from "./CountDownProgressBar";


const Icons = (
  {
    iconChangeMilliSeconds,
    mainPalet = false,
    doColorIcon = null,
    colorIconList = null,
  }) => {
  const {
    state: {gameState},
    actions: {gameActions},
  } = useApp()

  const iconList = gameState.generatedIconList;
  const sampleIconList = gameState.sampleIconList;

  const [cDown, setCDown] = useState(iconChangeMilliSeconds)

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
      if (sampleIdList && sampleIdList.includes(selectedIconId) && !colorIconList[selectedIconId]) {
        gameActions.incrementFoundItem()
        doColorIcon({selectedIconId})
      }
    }
  }

  useEffect(() => {
      setCDown(iconChangeMilliSeconds)
    }, [iconChangeMilliSeconds]
  )

  useInterval(() => {
    setCDown((cDown) => (cDown - 1000))
    if (typeof iconChangeMilliSeconds === 'number') {
      gameActions.addGameSummary(iconChangeMilliSeconds + 100)
    }
    if (cDown <= 0 && mainPalet) {
      gameActions.shuffleIcons();
      setCDown(iconChangeMilliSeconds);
    }
  }, 1000);

  return (
    <>
      {showIconList.length &&
      showIconList.map((i, key) => (
        <IconButton
          as="span"
          aria-label="icon"
          colorScheme={colorIconList[i['id']] ? colorIconList[i['id']] : "gray"}
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
      {
        mainPalet &&
        <Grid width="20em">
          <CountDownProgressBar cDown={cDown} iconChangeMilliSeconds={iconChangeMilliSeconds}/>
        </Grid>
      }
    </>
  )
}

export default Icons;