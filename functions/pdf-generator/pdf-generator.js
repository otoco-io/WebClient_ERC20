// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const fs = require('fs');

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

const docDefinition = (contract_address, company_name) => ({
	content: [
		{
			stack: [
				'Otoco - Agreement PDF File Sample',
				{text: `Contract Address: ${contract_address}`, style: 'subheader'},
				{text: `Company Name: ${company_name}`, style: 'subheader'},
			],
			style: 'header'
		},
		{
			text: [
				'Margins have slightly different behavior than other layout properties. They are not inherited, unlike anything else. They\'re applied only to those nodes which explicitly ',
				'set margin or style property.\n',
			]
		},
		{
			text: 'This paragraph (consisting of a single line) directly sets top and bottom margin to 20',
			margin: [0, 20],
		},
		{
			stack: [
				{text: [
						'This line begins a stack of paragraphs. The whole stack uses a ',
						{text: 'superMargin', italics: true},
						' style (with margin and fontSize properties).',
					]
				},
				{text: ['When you look at the', {text: ' document definition', italics: true}, ', you will notice that fontSize is inherited by all paragraphs inside the stack.']},
				'Margin however is only applied once (to the whole stack).'
			],
			style: 'superMargin'
		},
		{
			stack: [
				'I\'m not sure yet if this is the desired behavior. I find it a better approach however. One thing to be considered in the future is an explicit layout property called inheritMargin which could opt-in the inheritance.\n\n',
				{
					fontSize: 15,
					text: [
						'Currently margins for ',
						/* the following margin definition doesn't change anything */
						{text: 'inlines', margin: 20},
						' are ignored\n\n'
					],
				},
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.\n',
			],
			margin: [0, 20, 0, 0],
			alignment: 'justify'
		}
	],
	styles: {
		header: {
			fontSize: 30,
			bold: true,
			alignment: 'right',
			margin: [0, 190, 0, 80]
		},
		subheader: {
			fontSize: 14
		},
		superMargin: {
			margin: [20, 0, 40, 0],
			fontSize: 15
		}
	}
	
});

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
	const pdfDoc = printer.createPdfKitDocument(docDefinition(contract_address, company_name), options);
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
