import React from 'react'

import {PDFAssembler} from 'pdfassembler';
import fileSaver from 'file-saver';

// Redux Hook
import {useMappedState} from 'redux-react-hook';

const pdfs = {
    de: {
        agreement: require('../../../images/DOA_de.pdf'),
        page1: require('../../../images/page1_de.pdf'),
        page21: require('../../../images/page21_de.pdf'),
        page22: require('../../../images/page22_de.pdf'),
    },
    wy: {
        agreement: require('../../../images/DOA_wy.pdf'),
        page1: require('../../../images/page1_wy.pdf'),
        page21: require('../../../images/page21_wy.pdf'),
        page22: require('../../../images/page22_wy.pdf'),
    },
}

export default () => {

    const {manageSeries} = useMappedState(({managementState}) => managementState);

    const exportPDF = async () => { 
        console.log(manageSeries)
        const prefix = manageSeries.jurisdiction.substring(0,2).toLowerCase();
        let blob = await fetch(pdfs[prefix].agreement).then(r => r.blob())
        let page1 = await fetch(pdfs[prefix].page1).then(r => r.text());
        let page21 = await fetch(pdfs[prefix].page21).then(r => r.text());
        let page22 = await fetch(pdfs[prefix].page22).then(r => r.text());
        // Replace texts on placeholders
        if (prefix === 'de') page1 = page1.replace('{SERIES}', (manageSeries.name.length*300-3000)+' ('+manageSeries.name);
        if (prefix === 'wy') page1 = page1.replace('OTOCO WY LLC - {SERIES}', (manageSeries.name.length*300-3000)+' (OTOCO WY LLC - '+manageSeries.name);
        page1 = page1.replace('0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', manageSeries.contract);
        page1 = page1.replace('DD/MM/YYYY', manageSeries.created.getUTCDate()+'/'+(manageSeries.created.getUTCMonth()+1)+'/'+manageSeries.created.getUTCFullYear());
        page1 = page1.replace('HH:MM',manageSeries.created.getUTCHours()+':'+(manageSeries.created.getUTCMinutes() < 10 ? '0'+manageSeries.created.getUTCMinutes() : manageSeries.created.getUTCMinutes()));
        page21 = page21.replace('0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', manageSeries.owner);
        page22 = page22.replace('0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', manageSeries.owner);
        // Create a new pdf based on Agreeement file
        const newPdf = new PDFAssembler(blob);
        newPdf.getPDFStructure().then(function(pdf) {
            // console.log(pdf['/Root']['/Pages']['/Kids'][0]['/Contents']['stream']);
            // console.log(pdf['/Root']['/Pages']['/Kids'][21]['/Contents']['stream']);
            // Replace agreement pages for new ones
            // console.log(page1);
            pdf['/Root']['/Pages']['/Kids'][0]['/Contents']['stream'] = page1;
            pdf['/Root']['/Pages']['/Kids'][20]['/Contents']['stream'] = page21;
            pdf['/Root']['/Pages']['/Kids'][21]['/Contents']['stream'] = page22;
            //Remove last page from Source file
            pdf['/Root']['/Pages']['/Kids'].splice(-1);
            newPdf.assemblePdf('Series_Operating_Agreement.pdf')
            .then(function(pdfFile) {
                fileSaver.saveAs(pdfFile, 'Series_Operating_Agreement.pdf');
            });
        });

    }

    return (
        <div className="animate-fade">
            <h4 style={{paddingTop: '30px'}}>Here you can download documents related to your company:</h4>
            <button className="ui mini button ui button primary" onClick={exportPDF}><i className="download icon"></i>Series Operating Agreement</button>
        </div>
    )

}