import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from '@fortawesome/free-solid-svg-icons'
import './IconList.css';


const __old_IconList = () => {
  const handleClick = (e) => {
    console.log(e.target.id);
    return console.log(e.target.ownerSVGElement.id);
  }
  return (
    <>
      <button id="5" onClick={handleClick}>
        <FontAwesomeIcon style={{"pointerEvents": null}} icon={faCoffee} id="5" onClick={handleClick}/>
      </button>
    </>
  )
}

export default __old_IconList;