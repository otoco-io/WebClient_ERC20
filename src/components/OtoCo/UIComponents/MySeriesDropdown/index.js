import React from 'react'

// Redux
import {useMappedState, useDispatch} from 'redux-react-hook';

import Identicon from 'identicon.js'

import { Dropdown, Image } from 'semantic-ui-react'

import _ from 'lodash';


const optionItem = ({address, name}) => {
  let imgSrc = new Identicon(address.replace("0x", ""), 70).toString()
  return (
    <span>
        <Image avatar src={`data:image/png;base64,${imgSrc}`} /> {name ? name : "(No Name)"}
    </span>
  )
}

const genOptions = (series) => {

  let returnArr = [];

  // It started with index = 1 because default 
  for(let i = 1, len = _.orderBy(series, ['idx']).length; i < len; i ++){
    let imgSrc = new Identicon(series[i].address.replace("0x", ""), 70).toString();
    returnArr.push({ key: `series_option_${i}`, text: `${(!series[i].name) ? "(No Name)" : series[i].name}`, image: { avatar: true, src: `data:image/png;base64,${imgSrc}` }});
  }

  return returnArr;

} 

export default () => {
  const {series, seriesLength} = useMappedState(({accountState}) => accountState);
  //console.log(series);
  //console.log(_.orderBy(series, ['idx']));
  
  if(series.length > 0) {
    if(seriesLength === series.length) {
      const options = genOptions(_.orderBy(series, ['idx']));
      const defaultOption = optionItem(_.orderBy(series, ['idx'])[0])
      return (
        <Dropdown
        openOnFocus
        className="series-selection"
        trigger={defaultOption}
        options={options}
        pointing='top left'
        />
      );
    } else {
      return <div className="loading">Loading...</div>;
    }
  } else {
    return "";  
  }
    
  
}