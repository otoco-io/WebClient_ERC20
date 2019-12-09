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

const genOptions = (series, selectedIndex) => {

  let returnArr = [];

  // It started with index = 1 because default 
  for(let i = 0, len = series.length; i < len; i ++){
    if (i !== selectedIndex) {
        let imgSrc = new Identicon(series[i].address.replace("0x", ""), 70).toString();
        returnArr.push({ key: `series_option_${i}`, text: `${(!series[i].name) ? "(No Name)" : series[i].name}`, value: series[i].address, image: { avatar: true, src: `data:image/png;base64,${imgSrc}` }});
    }
  }

  return returnArr;

} 



export default () => {
  const {series, seriesLength} = useMappedState(({accountState}) => accountState);
  const {currentSeries} = useMappedState(({dashpanelState}) => dashpanelState);
  const dispatch = useDispatch();

  const handleChange = (e, { value }) => {
    dispatch({ type: "Dashpanel/SetCurrentSeries", currentSeries: value });
  }
  
  if(series.length > 0) {
    if(seriesLength === series.length) {
      const sortedSeriesArr = _.orderBy(series, ['idx'], ['desc']);

      const selectedSeriesIndex = (currentSeries) ? _.findIndex(sortedSeriesArr, { address: currentSeries }): 0

      if(!currentSeries) dispatch({ type: "Dashpanel/SetCurrentSeries", currentSeries: sortedSeriesArr[selectedSeriesIndex].address });

      const options = genOptions(sortedSeriesArr, selectedSeriesIndex);
      const selectedSeries = optionItem(sortedSeriesArr[selectedSeriesIndex]);
      return (
        <Dropdown
          closeOnBlur
          className="series-selection"
          trigger={selectedSeries}
          options={options}
          pointing='top left'
          onChange={handleChange}
        />
      );
    } else {
      return <div className="loading">Loading...</div>;
    }
  } else {
    return "";  
  }
    
  
}