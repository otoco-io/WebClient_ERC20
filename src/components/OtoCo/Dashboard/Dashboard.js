import React from 'react'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory } from "react-router-dom";

// Semantic UI for React
import { Button, Container } from 'semantic-ui-react'

// Smart Contract
import MainContract from '../SmartContracts/MainContract';
import SeriesContract from '../SmartContracts/SeriesContract';

import {PDFAssembler} from 'pdfassembler';
import fileSaver from 'file-saver';
import pdfFile from '../../../images/DOA_de.pdf'
import page1DE from '../../../images/page1_de.pdf'
import page21DE from '../../../images/page21_de.pdf'

export default () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {network, currentAccount} = useMappedState(({accountState}) => accountState);
    const {loading, jurisdictionsList, ownSeriesContracts} = useMappedState(({dashboardState}) => dashboardState);

    const clickBackHandler = async (e) => {
        dispatch({ type: "Welcome Board Go To Step N", N: 0 });
        dispatch({ type: "Set Dashboard Loading", loading: true });
        history.push('/');
    }
    
    const exportPDF = async (info) => { 
        //console.log(info);
        let blob = await fetch(pdfFile).then(r => r.blob())
        let page1 = await fetch(page1DE).then(r => r.text());
        let page21 = await fetch(page21DE).then(r => r.text());
        // Replace texts on placeholders
        page1 = page1.replace('{SERIES}', '+'+(info.name.length*300-3000)+' ('+info.name);
        page1 = page1.replace('DD/MM/YYYY', info.created.getUTCDate()+'/'+(info.created.getUTCMonth()+1)+'/'+info.created.getUTCFullYear());
        page1 = page1.replace('HH:MM',info.created.getUTCHours()+':'+(info.created.getUTCMinutes() < 10 ? '0'+info.created.getUTCMinutes() : info.created.getUTCMinutes()));
        page21 = page21.replace('0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', info.owner);
        // Create a new pdf based on Agreeement file
        const newPdf = new PDFAssembler(blob);
        newPdf.getPDFStructure().then(function(pdf) {
            //console.log(pdf['/Root']['/Pages']['/Kids'][3]['/Contents']['stream']);
            //console.log(pdf['/Root']['/Pages']['/Kids'][20]['/Contents']['stream']);
            // Replace agreement pages for new ones
            pdf['/Root']['/Pages']['/Kids'][0]['/Contents']['stream'] = page1;
            pdf['/Root']['/Pages']['/Kids'][20]['/Contents']['stream'] = page21;
            // Remove last page from Source file
            pdf['/Root']['/Pages']['/Kids'].splice(-1);
            newPdf.assemblePdf('Series_Operation_Agreement.pdf')
            .then(function(pdfFile) {
                fileSaver.saveAs(pdfFile, 'Series_Operation_Agreement.pdf');
            });
        });
    }

    const ListItems = () => {
        
        let linkSearch = '';
        if (network === 'kovan') linkSearch = 'https://kovan.etherscan.io/address/';
        if (network === 'main') linkSearch = 'https://etherscan.io/address/';

        const series = ownSeriesContracts.map( (s) => 
        <tr>
            <td>{s.name}</td>
            <td><button class="ui mini button jurisdiction">{s.jurisdiction}</button></td>
            <td>{s.created.getUTCDate()}/{s.created.getUTCMonth()+1}/{s.created.getUTCFullYear()} {s.created.getUTCHours()}:{s.created.getUTCMinutes()} UTC</td>
            <td><a class="primary" href={linkSearch+s.owner} target="blank">{s.owner.substring(0,6)}...</a><i class="copy icon"></i></td>
            <td><a class="primary" href={linkSearch+s.contract} target="blank">{s.contract.substring(0,6)}...</a><i class="copy icon"></i></td>
            <td>
                <button class="ui mini button ui button primary" onClick={exportPDF.bind(undefined,s)}><i class="download icon"></i>Series Operation Agreement</button>
            </td>
        </tr>
        )

        return series;
    }

    React.useEffect(() => {
        // When enter dashboard page
        async function populateTable(){
            if (network === ''){
                await ethereum.enable();
                let accounts =  await web3.eth.getAccounts();
                dispatch({ type: "Set Current Account", currentAccount: accounts[0] });
                dispatch({ type: "Set Current Network", network: await web3.eth.net.getNetworkType() })
            }
            if (history.location.pathname === '/dashboard' && network !== '') {
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
                dispatch({ type: "Set Own Series Contracts", ownSeriesContracts:ownSeries });
                dispatch({ type: "Set Dashboard Loading", loading: false });
            } else {
                dispatch({ type: "Set Dashboard Loading", loading: true });
            }
        }
        populateTable();
    },[history.location.pathname, network])

    return (
        <Container className="pnl-body">
            <div style={{textAlign: "left", marginBottom: "100px"}}>
                <h1 className="title">Dashboard</h1>
                <p class="subtitle">Here you can manage your companies.</p>
                <p></p>
                <table class="ui celled table" style={{ display: (ownSeriesContracts.length > 0) ? "" : "none"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Jurisdiction</th>
                        <th>Creation date</th>
                        <th>Owner</th>
                        <th>Contract</th>
                        <th>Legal</th>
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
        </Container>
    )
}