import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';

// Semantic UI for React
import { Button } from 'semantic-ui-react'

// Smart Contract
import MainContract from '../SmartContracts/MainContract';
import SeriesContract from '../SmartContracts/SeriesContract';

export default () => {

    const dispatch = useDispatch();

    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const {loading, jurisdictionsList, ownSeriesContracts} = useMappedState(({dashboardState}) => dashboardState);
    const {currentStep} = useMappedState(({welcomePanelState}) => welcomePanelState);

    const clickBackHandler = async (e) => {
        dispatch({ type: "Welcome Board Go To Step N", N: 0 });
        dispatch({ type: "Set Dashboard Loading", loading: true });
    }
    
    const copyToClipboard = (info) => { navigator.clipboard.writeText(info) }

    const ListItems = () => {
        
        let linkSearch = '';
        if (network === 'kovan') linkSearch = 'https://kovan.etherscan.io/address/';
        if (network === 'main') linkSearch = 'https://etherscan.io/address/';

        const series = ownSeriesContracts.map( (s) => 
        <tr>
            <td>{s.name}</td>
            <td><button class="ui mini button jurisdiction">{s.jurisdiction}</button></td>
            <td>{s.created.getUTCDate()}/{s.created.getUTCMonth()}/{s.created.getUTCFullYear()} {s.created.getUTCHours()}:{s.created.getUTCMinutes()} UTC</td>
            <td><a class="primary" href={linkSearch+s.owner} target="blank">{s.owner.substring(0,6)}...</a><i class="copy icon" onClick={copyToClipboard(s.owner)}></i></td>
            <td><a class="primary" href={linkSearch+s.contract} target="blank">{s.contract.substring(0,6)}...</a><i class="copy icon" onClick={copyToClipboard(s.contract)}></i></td>
            <td>
                <button class="ui mini button ui button primary"><i class="download icon"></i>Series Operation Agreement</button>
            </td>
        </tr>
        )

        return series;
    }

    React.useEffect(() => {
        // When enter dashboard page
        async function populateTable(){
            if (currentStep === 'dashboard' && network !== '') {
                let ownSeries = [];
                for (let j of jurisdictionsList){
                    
                    let jurisdictionName = '';
                    if (j == 'us_de') jurisdictionName = 'Delaware';
                    if (j == 'us_wy') jurisdictionName = 'Wyoming';

                    let series = await MainContract.getContract(network, j).methods.mySeries().call({from: currentAccount})// , function(error, series){
                    //console.log(series);
                    for (let s of series) {
                        let newSeries = {
                            jurisdiction: jurisdictionName,
                            contract: s,
                            created: '',
                            name: '',
                            owner: '',
                        }
                        window.testContract = SeriesContract.getContract(s);
                        const events = await SeriesContract.getContract(s).getPastEvents('allEvents',{fromBlock:0,toBlock: 'latest'})
                        const timestamp = await web3.eth.getBlock(events[0].blockNumber);
                        newSeries.created = new Date(timestamp.timestamp * 1000);
                        newSeries.name = await SeriesContract.getContract(s).methods.getName().call({from: currentAccount})
                        newSeries.owner = await SeriesContract.getContract(s).methods.owner().call({from: currentAccount})
                        ownSeries.push(newSeries)
                        //console.log(newSeries);
                    }
                }
                console.log(ownSeries)
                dispatch({ type: "Set Own Series Contracts", ownSeriesContracts:ownSeries });
                dispatch({ type: "Set Dashboard Loading", loading: false });
            } else {
                dispatch({ type: "Set Dashboard Loading", loading: true });
            }
        }
        populateTable();
    },[currentStep, network])

    return (
        <div>
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Dashboard</h1>
                <p class="subtitle">Here you can manage your companies.</p>
                <p></p>
                <table class="ui celled table" style={{ display: (ownSeriesContracts.length > 0) ? "" : "none"}}>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>jurisdiction</th>
                        <th>creation date</th>
                        <th>owner</th>
                        <th>contract</th>
                        <th>legal</th>
                    </tr>
                </thead>
                <tbody>
                    <ListItems/>
                    {/* <tr>
                        <td>Doiim LCC</td>
                        <td><button class="ui mini button jurisdiction">Delaware</button></td>
                        <td>10/10/2019 20:20 UTC</td>
                        <td><a class="primary" href="">0xE7b7323...</a><i class="copy icon"></i></td>
                        <td><a class="primary" href="">0xE7b7323...</a><i class="copy icon"></i></td>
                        <td>
                            <button class="ui mini button ui button primary"><i class="download icon"></i>Series Operation Agreement</button>
                        </td>
                    </tr> */}

                </tbody>
                </table>
                <Button id="btn-check-nmae" className="ui right floated button primary" type="submit" onClick={clickBackHandler}>Set up a new company</Button>
                <div class="ui active dimmer" style={{ display: (loading) ? "" : "none"}}>
                    <div class="ui indeterminate text loader">Loading Companies</div>
                </div>
            </div>
            <h2></h2>
        </div>
    )
}