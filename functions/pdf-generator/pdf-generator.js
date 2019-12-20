// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fs = require('fs');

const PDFTemplat = require('./pdf-template');
const pdf = new PDFTemplat();

// Define font files
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf'
  }
};

const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);

const { Base64Encode } = require('base64-stream');

const options = {
  // ...
}

const generatePDFFile = (doc) => new Promise((resolve, reject) => {

  var finalString = ''; // contains the base64 string
  var stream = doc.pipe(new Base64Encode());
  doc.end();

  stream.on('data', function(chunk) {
    finalString += chunk;
  });

  stream.on('end', function() {
      // the stream is at its end, so push the resulting base64 string to the response
      resolve(finalString);
  });
})


exports.handler = async (event, context) => {
  try {
	const contract_address = event.queryStringParameters.address || '(N/A)'
	const company_name = event.queryStringParameters.name || '(N/A)'
	const pdfDoc = printer.createPdfKitDocument(pdf.genOperationAgreementDoc(contract_address, company_name), options);
    const pdfBase64 = await generatePDFFile(pdfDoc);
    return {
      headers: {
        'Content-type': 'application/pdf',
        'content-disposition': `attachment; filename=Otoco-Agreement-${contract_address}-${Math.floor(new Date() / 1000)}.pdf`
      },
      statusCode: 200,
      body: pdfBase64,
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      isBase64Encoded: true,
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
