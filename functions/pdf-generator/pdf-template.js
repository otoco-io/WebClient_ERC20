// playground requires you to assign document definition to a variable called dd
class PDFTemplate {
    genOperationAgreementDoc(contract_address, company_name) {
        return {
            content: [
                { text: "LIMITED LIABILITY COMPANY AGREEMENT", alignment: 'center', margin: [ 0, 20, 0, 0 ], fontSize: 14, bold: true },
                { text: "OF", alignment: 'center', margin: [ 0, 20, 0, 0 ], fontSize: 14, bold: true },
                { text: `${company_name}, A SERIES OF OTOCO LLC (the “Company”)`, alignment: 'center', margin: [ 0, 20, 0, 0 ], fontSize: 14, bold: true },
                { 
                    text: "                 This limited liability company agreement is made as of [DATE] (the “Effective Date”) by and among the Manager, the Members, and those Persons who have or may become parties to this Agreement in the future, in accordance with the terms of this Agreement (collectively the ”Parties”) of the Company. In consideration of the mutual covenants in this Agreement the Parties agree as follows:", 
                    alignment: 'left',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12, 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                },
                { 
                    text: "Article I", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12, 
                    lineHeight: 1.2,
                    bold: true,
                    preserveLeadingSpaces: true,
                },
                { 
                    text: "DEFINITIONS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    lineHeight: 1.2,
                    bold: true,
                    preserveLeadingSpaces: true,
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Definitions.", bold: true},
                        " When used in this Agreement, the following terms have the meanings specified in this Article I:", 
                    ],
                    alignment: 'left',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12, 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                },
                {
                  stack: [
                    // second column consists of paragraphs
                    {
                        text:[
                            '                 ',
                            '(a) Key Definitions.',
                        ], 
                        style: 'def_title',
                    },
                    {
                        text:[
                            '                 ',
                            { text: "“Arbitration Location”", style: 'def_name' },
                            " means Wilmington, Delaware."
                        ], 
                        style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Digital Assets”", style: 'def_name'},
                        " means tokens, cryptocurrencies, blockchain-based assets, and other digital assets based on a computer-generated cryptographic protocol."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Effective Date”", style: 'def_name'},
                        " means the first date written above."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Manager”", style: 'def_name'},
                        " means the holder of the Ethereum wallet address described in the signature page, who will be a “manager” of the Company within the meaning of Section 18-101(10) of the Act."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Master LLC”", style: 'def_name'},
                        " means OtoCo LLC, a State of Delaware limited liability company."
                    ], style: 'def_item'},
                  ],
                  style: "def_paragraph",
                },
                {
                  stack: [
                    // second column consists of paragraphs
                    {text:
                        [
                            '                 ', 
                            '(b) Other Definitions.'
                        ], 
                        style: 'def_title'
                    },
                    {
                        text:[
                            '                 ',
                            {text: "“Act”", style: 'def_name'},
                            " means the Delaware Limited Liability Company Act, Section 18-101, et seq., as it may be amended from time to time and any successor to said law."
                        ], 
                        style: 'def_item'
                    },
                    {text:[
                        '                 ',
                        {text: "“Affiliate”", style: 'def_name'},
                        " of another Person means (i) a Person directly or indirectly (through one or more intermediaries) controlling, controlled by or under common control with that other Person; (ii) a Person owning or controlling 10% or more of the outstanding voting securities or beneficial interests of that other Person; or (iii) an officer, manager, director, partner or member of that other Person. For purposes of this Agreement, “control” of a Person means the possession, directly or indirectly, of the power to direct the management and policies of that Person, whether through the ownership of voting securities, by contract or otherwise. For the avoidance of doubt, no Member will be deemed, solely by virtue of that membership, to be an Affiliate of the Company."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Agreement”", style: 'def_name'},
                        " means this limited liability company agreement of the Company, as amended from time to time."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Articles of Organization”", style: 'def_name'},
                        " means the Articles of Organization of the Master LLC, as amended and restated from time to time, filed under the Act."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Capital Account”", style: 'def_name'},
                        " of a Member means the capital account of the Member determined in accordance with this Agreement."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Capital Contribution”", style: 'def_name'},
                        " of a Member means the total amount of cash and other assets contributed (or deemed contributed under the Treasury Regulations) to the Company by that Member, net of liabilities assumed or to which the assets are subject."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Code”", style: 'def_name'},
                        " means the Internal Revenue Code of 1986, as amended."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Consent”", style: 'def_name'},
                        " means the approval of a Person to do the act or thing for which the approval is solicited, or the act of granting the approval, as the context may require."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Covered Person”", style: 'def_name'},
                        " means the Manager, the Partnership Representative, the Liquidating Trustee, an officer of the Company, and their respective Affiliates."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Disability”", style: 'def_name'},
                        " of an individual means the incapacity of the individual to engage in any substantial gainful activity with the Company by reason of any medically determinable physical or mental impairment that reasonably can be expected to last for a continuous period of not less than 12 months as determined by a competent physician chosen by the Company and Consented to by the individual or his legal representative, which Consent will not be unreasonably withheld, conditioned or delayed."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Distribution”", style: 'def_name'},
                        " means the transfer of money or property by the Company to one or more Members with respect to their Interests, without separate consideration."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Fair Market Value”", style: 'def_name'},
                        " of property means the amount that would be paid for that property in cash at the closing by a hypothetical willing buyer to a hypothetical willing seller, each having knowledge of all relevant facts and neither being under a compulsion to buy or sell, as determined by the Manager in good faith."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Fiscal Year”", style: 'def_name'},
                        " means the Company's taxable year, which will be the taxable year ended December 31, or other taxable year as may be selected by the Manager in accordance with applicable law."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Interest”", style: 'def_name'},
                        " means with respect to each Member, as of any date, the fractional ownership interest in the Company issued by the Company, which is expressed as a percentage, the numerator of which is that Member's Capital Contribution and the denominator of which is the sum of the Capital Contributions of all Members. A Member's Interest represents the totality of the Member's interests, and the right of that Member to all benefits (including, without limitation, allocations of Net Income and Net Losses and the receipt of Distributions) to which a Member may be entitled pursuant to this Agreement and under the Act, together with all obligations of that Member to comply with the terms and provisions of this Agreement and the Act.  If any provision requires the Consent of a specified percentage of Interests, that percentage will be determined by reference to the aggregate Interests of Members granting Consent on the applicable date."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Interest Register”", style: 'def_name'},
                        " has the meaning specified in Article II."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Liquidating Trustee”", style: 'def_name'},
                        " means the Manager (or its authorized designee) or, if there is none, a Person selected by the Consent of the Members to act as a liquidating trustee of the Company."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Member”", style: 'def_name'},
                        " means any Person admitted as a Member of the Company pursuant to Section 4.1 that has not ceased to be a Member pursuant to this Agreement or the Act, having the interests and rights associated with membership in a limited liability company pursuant to this Agreement."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Net Income”", style: 'def_name'}, 
                        " and ",
                        {text: "“Net Loss”", style: 'def_name'},
                        " means, for each Fiscal Year, the taxable income and taxable loss, as the case may be, of the Company for that Fiscal Year determined in accordance with federal income tax principles, including items required to be separately stated, taking into account income that is exempt from federal income taxation, items that are neither deductible nor chargeable to a capital account and rules governing depreciation and amortization, except that in computing taxable income or taxable loss, the “tax book” value of an asset will be substituted for its adjusted tax basis if the two differ, and any gain, income, deductions or losses specially allocated under Article VI or will be excluded from the computation.  Any adjustment to the “tax” book value of an asset pursuant to the Treasury Regulations will be treated as Net Income or Net Loss from the sale of that asset."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Partnership Representative”", style: 'def_name'},
                        " means the Manager or any other Person designated by the Manager for such purpose."
                    ], style: 'def_item'},
                    {text:[
                        {text: "“Person”", style: 'def_name'},
                        " means any individual or entity."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Principal Office Location”", style: 'def_name'},
                        " means such address chosen by the Manager."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Registered Agent”", style: 'def_name'},
                        " if applicable, means Otonomos LLC, 1201 N. Orange Street Suite 7160, Wilmington, 19801 Delaware."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Transfer”", style: 'def_name'},
                        " means, with respect to an Interest, the sale, assignment, transfer, other disposition, pledge, hypothecation or other encumbrance, whether direct or indirect, voluntary, involuntary or by operation of law, and whether or not for value, of that Interest.  Transfer includes any transfer by gift, devise, intestate succession, sale, operation of law, upon the termination of a trust, because of or in connection with any property settlement or judgment incident to a divorce, dissolution of marriage or separation, by decree of distribution or other court order or otherwise."
                    ], style: 'def_item'},
                    {text:[
                        '                 ',
                        {text: "“Treasury Regulations”", style: 'def_name'},
                        " means the regulations promulgated by the United States Treasury Department pertaining to a matter arising under the Code."
                    ], style: 'def_item'},
                  ],
                  style: "def_paragraph",
                  pageBreak: "after"
                },
                { 
                    text: "Article II", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "ORGANIZATIONAL MATTERS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Smart Contract.", bold: true},
                        " This Agreement is created through the use of an Ethereum smart contract at ",
                        {text:"otoco.eth", background: "#cfe2f3"}, 
                        ". Any amendments to this Agreement shall only be valid if made on the strongest chain of the Ethereum main blockchain at the time of the amendment and under the conditions of this Agreement. Any signature or execution made through the use of private keys on the blockchain for any matters relating to the Company shall be valid, as if signed in writing.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Name.", bold: true},
                        " The name of the Company is set forth on the cover page of this Agreement. The business of the Company may be conducted under that name or under any other name that the Manager may determine. The Manager will notify the Members of any change in the name of the Company.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Establishment of Series.", bold: true},
                        " Pursuant to Section 18-215(b) of the Act and the Limited Liability Company Agreement of the Master LLC (the ", 
                        {text: "“Master LLC Agreement”", style: 'def_name'}, 
                        "), the Master LLC is authorized to establish separate members and limited liability company interests with separate and distinct rights, powers, duties, obligations, businesses and objectives (each a ",
                        {text: "“Series”", style: 'def_name'}, 
                        "). Notice is hereby given that the Company is hereby established as a Series under the Master LLC Agreement. The Series created hereby, and the rights and obligations of the Members of the Series will be governed by this Agreement. In the event of any inconsistency between this Agreement and the Master LLC Agreement, this Agreement will control. The debts, liabilities, obligations and expenses incurred, with respect to the Company will be enforceable against the assets of the Company only and not against the assets of the Master, LLC generally or any other Series of the Master, and, unless otherwise provided in this Agreement, none of the debts, liabilities, obligations and expenses incurred, contracted for or otherwise existing with respect to the Master LLC generally or any other Series of the Master LLC will be enforceable against the assets of the Company. A member participating in one Series will have no rights or interest with respect to any other Series, other than through that Member's interest in that Series independently acquired by that Member. This Agreement and all provisions herein will be interpreted in a manner to give full effect to the separateness of each Series. The Manager shall take reasonable steps as are necessary to implement the provisions of this Section. Without limitation on the preceding sentence, the Manager shall maintain separate and distinct records for each Series, shall separately hold and account for the assets of each Series, and shall otherwise comply with the requirements of Section 18-215 of the Act. The Company will be dissolved, and its affairs wound up pursuant to the provisions of this Agreement. The dissolution and termination of the Company will not, in and of itself, cause or result in the dissolution or termination of the Master, LLC or any other Series.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Specific Disclaimer.", bold: true},
                        " The Company, its Members and Manager agree to the disclaimers set forth under Schedule A hereto and shall at all times hold the Master LLC harmless of any losses or claims relating to the content of Schedule A.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Term.", bold: true},
                        " The term of the Company commenced on the Effective Date and will continue in full force and effect until terminated pursuant to Article X.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Office and Agent.", bold: true},
                        " The Company will maintain its principal office at the Principal Office Location, or at a place as the Manager may determine from time to time. The Manager will notify the Members of any change in principal office of the Company. The Registered Agent, if applicable, is the Company's registered agent for service of process on the Company.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Purpose of Company.", bold: true},
                        " The Company has been created to engage in any and all other lawful activities and transactions as may be necessary, advisable, or desirable, as determined by the Manager, in its sole discretion, to carry out the foregoing or any reasonably related activities.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Intent.", bold: true},
                        " It is the intent of the Members that the Company will be treated as a “partnership” for federal income tax purposes.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Qualification.", bold: true},
                        " The Manager shall cause the Company to qualify to do business in each jurisdiction where qualification is required. The Manager has the power and authority to execute, file and publish all certificates, notices, statements or other instruments necessary to permit the Company to conduct business as a limited liability company in all jurisdictions where the Company elects to do business.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Interest Register.", bold: true},
                        " The Manager shall enter the name and contact information concerning each Member on the register of Members and interest ownership (“Interest Register”) maintained by the Company. Each Member shall promptly provide the Manager with the information required to be set forth for that Member on the Interest Register and shall promptly notify the Manager of any change to that information. The Manager, or a designee of the Manager, shall update the Interest Register from time to time as necessary to accurately reflect the information therein as known by the Manager, including, without limitation, admission of new Members, but no update will constitute an amendment for purposes of Article XII. Any reference in this Agreement to the Interest Register will be deemed to be a reference to the Interest Register as amended and in effect from time to time.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Maintenance of Separate Existence.", bold: true},
                        " The Company will do all things necessary to maintain its limited liability company existence separate and apart from the existence of each Member, any Affiliate of a Member and any Affiliate of the Company, including maintaining the Company's books and records on a current basis separate from that of any Affiliate of the Company or any other Person. In furtherance of the foregoing, the Company must (i) maintain or cause to be maintained by an agent under the Company's control physical possession of all its books and records (including, as applicable, storage of electronic records online or in “cloud” services), (ii) account for and manage all of its liabilities separately from those of any other Person, and (iii) identify separately all its assets from those of any other Person.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Title to Company Assets.", bold: true},
                        " All assets of the Company will be deemed to be owned by the Company as an entity, and no Member, individually, will have any direct ownership interest in those assets. Each Member, to the extent permitted by applicable law, hereby waives its rights to a partition of the assets and, to that end, agrees that it will not seek or be entitled to a partition of any assets, whether by way of physical partition, judicial sale or otherwise, except as otherwise expressly provided in Article X.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Events Affecting a Member of the Company Title to Company Assets.", bold: true},
                        " The death, bankruptcy, withdrawal, insanity, incompetency, temporary or permanent incapacity, liquidation, dissolution, reorganization, merger, sale of all or substantially all the stock or assets of, or other change in the ownership or nature of a Member will not dissolve the Company.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Events Affecting the Manager.", bold: true},
                        " The withdrawal, bankruptcy, or dissolution of the Manager, nor the liquidation, reorganization, merger, sale of all or substantially all the stock or assets of, or other change in the ownership or nature of the Manager, will not dissolve the Company, and upon the happening of any that event, the affairs of the Company will be continued without dissolution by the Manager or any successor entity.", 
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article III", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "CAPITAL ACCOUNTS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                 ", 
                        {text:"No Further Capital Contributions.", bold: true},
                        " No Member will be required to make any Capital Contribution beyond that Member's initial Capital Contribution, or lend money to the Company.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"III.2 Capital Accounts.", bold: true} 
                    ],
                    alignment: 'left',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12, 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                },
                {
                  stack: [
                    {text:[
                        '                 ',
                        {text: '(a)       A separate capital account will be established and maintained for each Member ('},
                        {text: '“Capital Account”', bold: true},
                        {text: ').'},
                    ], style: 'def_title'},
                    {text:[
                        '                 ',
                        {text: '(b)       If any Interest is Transferred pursuant to the terms of this Agreement, the transferee will succeed to the Capital Account and the respective Interest of the transferor to the extent the Capital Account and Interest is attributable to the Interests so Transferred.'},
                    ], style: 'def_title'},
                  ],
                  style: "def_paragraph",
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Return of Capital Contributions.", bold: true},
                        " Except as otherwise provided in this Agreement, no Member has any right to withdraw or reduce its Capital Contribution.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Waiver of Action for Partition.", bold: true},
                        " Each Member irrevocably waives, during the term of the Company and during the period of its liquidation following dissolution, any right to maintain an action for partition of the Company's assets.", 
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article IV", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "MEMBERS; MEMBERSHIP CAPITAL", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Admission of Members.", bold: true},
                        " The Manager may, at its sole discretion, admit any Person as a Member upon signing a counterpart of this Agreement (which may be done by power of attorney or by any other document or instrument of the Company that by its terms is deemed to be an execution of this Agreement, it being hereby agreed that the issuance of Membership Interests may be done through the use of the Otonomos dashpanel (otonomos.com), if and when available. Admission will be effective when the Manager enters the name of that Person on the Interest Register. The Manager has the authority, in its sole discretion, to reject any subscription for an Interest in whole or in part. Each Member will continue to be a member of the Company until it ceases to be a member of the Company in accordance with the provisions of this Agreement. Each Member hereby acknowledges and represents that it has legal capacity to bind itself (or any legal entity it may represent hereunder) to this Agreement.", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ", 
                        {text:"Limited Liability.", bold: true},
                        " No Member will be liable to the Company or to any other Member for (i) the performance, or the omission to perform, any act or duty on behalf of the Company, (ii) the termination of the Company and this Agreement pursuant to the terms of this Agreement, or (iii) the performance, or the omission to perform, on behalf of the Company any act in reliance on advice of legal counsel, accountants or other professional advisors to the Company.  In no event will any Member (or former Member) have any liability for the repayment or discharge of the debts and obligations of the Company or be obligated to make any contribution to the Company; provided, however, that", 
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(a) appropriate reserves may be created, accrued and charged against the net assets of the Company and proportionately against the Capital Accounts of the Members for contingent liabilities or probable losses or foreseeable expenses that are permitted under this Agreement, the reserves to be in the amounts that the Manager deems necessary or appropriate, subject to increase or reduction at the Manager's sole discretion;",
                        {text:" and", bold: true},
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(b) each Member may have other liabilities as are expressly provided for in this Agreement.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"Nature of Ownership.", bold: true},
                        " Interests held by Members constitute personal property.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"Dealing with Third Parties.", bold: true},
                        " Unless admitted to the Company as a Member, as provided in this Agreement, no Person will be considered a Member.  The Company and the Manager need deal only with Persons admitted as Members.  The Company and the Manager will not be required to deal with any other Person (other than with respect to distributions to assignees pursuant to assignments in compliance with Article VI) merely because of an assignment or transfer of any Interest( to that Person whether by reason of the Incapacity of a Member or otherwise; provided, however, that any Distribution by the Company to the Person shown on the Company's records as a Member or to its legal representatives, or to the assignee of the right to receive the Company's Distributions as provided in this Agreement, will relieve the Company and the Manager of all liability to any other Person who may be interested in that Distribution by reason of any other assignment by the Member or by reason of its Incapacity, or for any other reason.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"Cryptocurrency as a Capital Contribution: Valuation Policy.", bold: true},
                        " The Manager, in its sole discretion, may accept Digital Assets as a Member's Capital Contribution. If a Member's Capital Contribution includes Digital Assets, then the value of those Digital Assets will be the same U.S. dollar value those Digital Assets are accepted by the Manager.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"Members are not Agents.", bold: true},
                        " Pursuant to Article V of this Agreement, the management of the Company is vested in the Manager. No Member has any right to participate in the management of the Company except as expressly authorized by the Act or this Agreement. No Member, acting solely in the capacity of a Member, is an agent of the Company, nor does any Member, unless expressly and duly authorized in writing to do so by the Manager, have any power or authority to bind or act on behalf of the Company in any way, to pledge its credit, to execute any instrument on its behalf or to render it liable for any purpose.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"Nature of Obligations between Members.", bold: true},
                        " Except as otherwise expressly provided, nothing contained in this Agreement will be deemed to constitute any Member, in that Member's capacity as a Member, an agent or legal representative of any other Member or to create any fiduciary relationship between Members for any purpose whatsoever, apart from obligations between the members of a limited liability company as may be created by the Act.  Except as otherwise expressly provided in this Agreement, a Member has no authority to act for, or to assume any obligation or responsibility on behalf of, any other Member or the Company.",
                        
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article V", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "MANAGEMENT AND CONTROL OF THE COMPANY", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                 ",
                        {text:"Management.", bold: true},
                        " Management of the Company is vested in the Manager. Except as otherwise provided in this Agreement and subject to the provisions of the Act, the Manager has all power and authority to exclusively manage the Company and all of its operations.",
                        
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        "(a) The Manager may agree to (i) delegate any matters or actions that it is authorized to perform under this Agreement to employees or agents of the Manager or third Persons and (ii) appoint any Persons, with titles as the Manager may select, to act on behalf of the Company, with power and authority as the Manager may delegate from time to time. Any delegation may be rescinded at any time by the Manager.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(b) The Manager may from time to time open bank accounts in the name of the Company, and the Manager or a representative of the Manager will be the signatory on the bank accounts.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(c) Third parties dealing with the Company may rely conclusively upon any certificate of the Manager to the effect that it is acting on behalf of the Company. The signature of the Manager will be sufficient to bind the Company in every manner to any agreement or on any document.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                 ",
                        {text:"V.2    Duties and Obligations of the Manager.", bold: true}
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        "(a) The Manager shall take all action that may be necessary or appropriate for the continuation of the Company's valid existence and authority to do business as a limited liability company under the laws of the State of Delaware and of each other jurisdiction in which authority to do business is, in the judgment of the Manager, necessary or advisable.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(b) The Manager shall prepare or cause to be prepared and shall file on or before the due date (or any extension) any federal, state or local tax returns required to be filed by the Company.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(c) The Manager shall cause the Company to pay any taxes or other governmental charges levied against or payable by the Company; provided, however, that the Manager will not be required to cause the Company to pay any tax so long as the Manager or the Company is in good faith and by appropriate legal proceedings contesting the validity, applicability or amount the tax and the contest does not materially endanger any right or interest of the Company. If deemed appropriate or necessary by the Manager, the Company may establish reasonable reserves to fund its actual or contingent obligations under this Section.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Rights or Powers of Members.", bold: true},
                        " Except as expressly provided otherwise in this Agreement or by operation of law, the Members (as members of the Company) will have no rights or powers to take part in the management and control of the Company and its business and affairs and will have no power or authority to act for the Company, or bind the Company under agreements or arrangements with third parties as Members. The Members will have the right to vote only on the matters explicitly set forth in this Agreement.",
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Manager May Engage in Other Activities.", bold: true},
                        " Subject to the terms of any employment or consulting agreement between the Manager and the Company, the Manager is not obligated to devote all of its time or business efforts to the affairs of the Company, provided that the Manager shall devote the time, effort and skill as it determines in its sole discretion may be necessary or appropriate for the proper operation of the Company. Subject to the foregoing, the Manager may have other business interests and may engage in other activities in addition to those related to the Company.",
                    ], 
                    style: 'def_item',
                    pageBreak: 'after'
                },
                { 
                    text: "Article VI", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "ALLOCATIONS OF NET INCOME AND NET LOSS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Allocation of Net Income and Net Loss.", bold: true},
                        " Except as otherwise provided in this Agreement, Net Income and Net Loss (including individual items of profit, income, gain, loss, credit, deduction and expense) of the Company will be allocated among the Members in a manner such that the Capital Account balance of each Member, immediately after making that allocation, is, as nearly as possible, equal (proportionately) to the Distributions that would be made to that Member pursuant to Article X if the Company were dissolved, its affairs wound up and its assets sold for cash equal to their Fair Market Value, all Company liabilities were satisfied (limited with respect to each nonrecourse liability to the Fair Market Value of the assets securing that liability), and the net assets of the Company were distributed in accordance with Article X to the Members immediately after making that allocation, adjusted for applicable special allocations, computed immediately prior to the hypothetical sale of assets.",
                    ], style: 'def_item'
                },
                { 
                    text: "Article VII", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "DISTRIBUTIONS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Generally.", bold: true},
                        " The Company will first use available assets to repay outstanding debts and obligations, if any, of the Company. Then, the Company will make Distributions, at times and intervals as the Manager will determine. Amounts apportioned to a Member will be distributed to the Members who have made a Capital Contribution pursuant to Article IV, pro rata in accordance with Interests held by them.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Return of Distributions.", bold: true},
                        " Any Member receiving a Distribution in violation of the terms of this Agreement shall return that Distribution (or cash equal to the net fair value of any property so distributed, determined as of the date of Distribution) promptly following the Member's receipt of a request to return the Distribution from the Manager. No third party will be entitled to rely on the obligations to return Distributions set forth in this Agreement or to demand that the Company or any Member make any request for any return.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Cryptocurrency as a Distribution: Valuation Policy.", bold: true},
                        " For Distributions that include Digital Assets, the valuation of those Digital Assets will be made by the Manager on the basis of the fair market value of those Digital Assets as of the Set Valuation Date; provided, however, that with respect to the valuation of those Digital Assets, fair market value will be the price in US Dollars per token as set forth at 5:00 pm Pacific time on coinmarketcap.com or other publicly available third party valuation websites as the Manager may select in its reasonable discretion. The Capital Accounts of the Members will be adjusted accordingly as the result of any Distribution in kind.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Limitations on Distributions.", bold: true},
                        " Notwithstanding any provision to the contrary contained in this Agreement, the Company shall not make a Distribution to any Member on account of its Interest if the Distribution would violate the Act or other applicable law.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text: "Article VIII", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "TRANSFERS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Transfers.", bold: true},
                        " Any Transfer of Membership Interests may be done through the use of the Otonomos dashpanel (otonomos.com), provided, however, that it shall be the responsibility of the Manager to ensure that any Transfer is in full compliance with applicable laws, including, without limitation, any securities laws. Any attempted Transfer in violation of this Article will be null and void ab initio, and will not bind the Company.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Right of First Refusal.", bold: true},
                        " In the event that a Member proposes to sell, pledge or otherwise transfer to a third party any Membership Interest, the Company shall have the Right of First Refusal with respect to all (and not less than all) of such Membership Interests.  If the Member desires to transfer Membership Interests, the Member shall give a written transfer notice to the Company describing fully the proposed transfer, including the number of Membership Interests proposed to be transferred, the proposed transfer price, the name and address of the proposed transferee and proof satisfactory to the Company that the proposed sale or transfer will not violate any applicable federal, State or foreign securities laws.  The transfer notice shall be signed both by the Member and by the proposed transferee and must constitute a binding commitment of both parties to the transfer of the Membership Interests.  The Company shall have the right to purchase all, and not less than all, of the Membership Interests on the terms of the proposal described in the transfer notice by delivery of a notice of exercise of the right of first refusal within 30 days after the date when the transfer notice was received by the Company.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Permitted Transfers.", bold: true},
                        " Except for the requirement to receive approval from the Manger, all other restrictions upon Transfer specified above will not apply to any Transfer (a) by a Member who is an individual to (i) that Member's spouse, ex-spouse or domestic partner; (ii) that Member's or Member's spouse's lineal descendants; (iii) any family limited partnership or other entity controlled (which for this purpose shall require that the Member own more than 50% of the equity securities of that entity) by that Member, (iv) a trust established solely for the benefit of that Member, Member's spouse or lineal descendants without regard to age, and (v) from any trust to the beneficiaries of that trust; or (b) by a Member to another Member (each transferee, a ",
                        {text:"“Permitted Transferee”", bold: true},
                        "); provided, however, that the Permitted Transferee (other than a Person who is already a Member) pursuant to the foregoing clauses (a), (b) and (c) agrees to become a party to this Agreement and to be subject to the terms and conditions of this Agreement.  Notwithstanding the foregoing in this Section, any permitted Transfer must be approved by the Manager, which approval will not be unreasonably withheld.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Involuntary Transfer of Interests.", bold: true},
                        " In the event of any involuntary transfer of Interests to a Person, that Person will have only the rights of an assignee set forth below with respect to those Interests.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Rights of Assignee.", bold: true},
                        " An assignee has no right to vote, receive information concerning the business and affairs of the Company and is entitled only to receive Distributions and allocations attributable to the Interest held by the assignee as determined by the Manager and in accordance with this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Enforcement.", bold: true},
                        " The restrictions on Transfer contained in this Agreement are an essential element in the ownership of an Interest. Upon application to any court of competent jurisdiction, a Manager will be entitled to a decree against any Person violating or about to violate those restrictions, requiring their specific performance, including those prohibiting a Transfer of all or a portion of its Interests.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Death or Disability of a Member.", bold: true},
                        " Upon the Disability or death of a Member, that Member will cease to be a member of the Company and that disabled Member or the legal representative of that deceased Member's estate (or the trustee of a living trust established by that deceased Member if that Member's Interests have been transferred to a trust) will have the rights only of an assignee.",
                    ], 
                    style: 'def_item',
                    pageBreak: 'after'
                },
                { 
                    text: "Article IX", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "RECORDS, REPORTS AND TAXES", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Books and Records.", bold: true},
                        " The Manager will maintain all of the information required to be maintained by the Act at the Company's principal office, with copies available at all times during normal business hours for inspection and copying upon reasonable notice by any Member or its authorized representatives for any purpose reasonably related to that Member's status as a member, including as applicable:",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        "(a)        true and full information regarding the status of the business and financial condition of the Company; ",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(b)        promptly after becoming available, a copy of the Company's federal, state and local income tax returns, if any, for each Fiscal Year;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(c)        a current list of the full name and last known business, residence or mailing address of that Member and each Manager;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(d)        a copy of this Agreement and all amendments, together with executed copies of (i) any powers of attorney and (ii) any other document pursuant to which this Agreement or any amendments have been executed or have been deemed to be executed; and",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(e)        true and full information regarding the amount of cash contributed by that Member and the date on which that Member became a Member.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Reports.", bold: true}
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        "(a)        ",
                        {text: "Governmental Reports.", italics: true},
                        " The Company will file all documents and reports required to be filed with any governmental agency in accordance with the Act.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        "(b)        ", 
                        {text: "Tax Reports.", italics: true},
                        " The Company will prepare and duly and timely file, at the Company's expense, all tax returns required to be filed by the Company. The Manager will send or cause to be sent to each Member within 90 days after the end of each Fiscal Year, or a later date as determined in the discretion of the Manager, information relating to the Company as is necessary for the Member to complete its federal, state and local income tax returns that include that Fiscal Year.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Bank Accounts.", bold: true},
                        " All funds of the Company will be deposited with banks, cryptocurrency exchanges or other financial institutions in the account or accounts of the Company as may be determined by the Manager who will ensure records are maintained for the Company assets associated with the Company separately from the assets of any other Person.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Confidentiality.", bold: true},
                        " All information concerning the business, affairs and properties of the Company and all of the terms and provisions of this Agreement will be held in confidence by each Manager and Member and their respective Affiliates, subject to any obligation to comply with (a) any applicable law, (b) any rule or regulation of any legal authority or securities exchange, (c) any subpoena or other legal process to make information available to the Persons entitled thereto or (d) the enforcement of that Party's rights under this Agreement (or under any employment agreement with that Member, if any) in any legal process, arbitration, as a Member, Manager, or employee, as applicable. Confidentiality will be maintained until that time, if any, as the confidential information either is, or becomes, published or a matter of public knowledge (other than as a result of a breach of this Section ); provided that each Party recognizes that the privilege each has to maintain, in its sole discretion, the confidentiality of a communication relating to the transactions, including a confidential communication with its attorney or a confidential communication with a federally authorized tax practitioner under Section 7525 of the Code, is not intended to be affected by the foregoing provisions of this sentence. Notwithstanding this Section, the Manager may use confidential information about the Company and its Members in data aggregation, so long as the data use does not include the disclosure of information that could reasonably be used to identify any Member.",
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article X", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "DISSOLUTION AND LIQUIDATION", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Dissolution.", bold: true},
                        " The Company will be dissolved, its assets disposed of and its affairs wound up upon any of the following:",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                               ", 
                        "(a)        ",
                        " the final Distribution of the net assets of the Company to the Members or a Liquidating Vehicle in accordance with this Article;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(b)        ",
                        " the dissolution of the Master LLC, as per Article 6 of the Master LLC Operating Agreement;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(c)        ",
                        " determination by the Manager in its sole discretion to dissolve the Company; or",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(d)        ",
                        " entry of a judicial decree of dissolution of the Company pursuant to the Act.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Date of Dissolution.", bold: true},
                        " Dissolution of the Company will be effective on the day on which the event occurs giving rise to the dissolution, but the Company will not terminate until the assets of the Company have been liquidated and distributed as provided in this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Winding Up.", bold: true},
                        " Upon the occurrence of any event specified above, the Company will continue solely for the purpose of winding up its affairs in an orderly manner, liquidating its assets, satisfying the claims of its creditors, and distributing any remaining assets in cash or in kind, to the Members in accordance with this Agreement. The Liquidating Trustee will be responsible for overseeing the winding up and liquidation of the Company and will cause the Company to sell or otherwise liquidate all of the Company's assets except to the extent the Liquidating Trustee determines to distribute any assets to the Members in kind, discharge or make provision for all liabilities of the Company and all costs relating to the dissolution, winding up, and liquidation and distribution of assets, establish reserves as may be necessary to provide for contingent liabilities of the Company (for purposes of determining the Capital Accounts of the Members, the amounts of those reserves will be deemed to be an expense of the Company and will be deemed income to the extent it ceases to be reserved), and distribute the remaining assets to the Members, in the manner specified below. The Liquidating Trustee will be allowed a reasonable time for the orderly liquidation of the Company's assets and discharge of its liabilities, so as to preserve and upon disposition maximize, to the extent possible, the value of the Company's assets.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Liquidation.", bold: true},
                        " The Company's assets, or the proceeds from the liquidation of the Company's assets, will be paid or distributed in the following order:",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                               ", 
                        "(a)        ",
                        " first, to creditors to the extent otherwise permitted by applicable law in satisfaction of all liabilities and obligations of the Company, including expenses of the liquidation (whether by payment or the making of reasonable provision for payment), other than liabilities for which reasonable provision for payment has been made and liabilities, if any, for Distributions to Members;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(b)        ",
                        " next, to the establishment of those reserves for contingent liabilities of the Company as are deemed necessary by the Liquidating Trustee (other than liabilities for which reasonable provision for payment has been made and liabilities, if any, for Distribution to Members and former Members under the Act);",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(c)        ",
                        " next, to Members and former Members in satisfaction of any liabilities for Distributions under the Act, if any;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(d)        ",
                        " next, to the Members, on a pro rata basis in the order of priority set forth in Article VII.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Distributions in Kind.", bold: true},
                        " Any non-cash asset distributed to one or more Members will first be valued by the Manager at its Fair Market Value to determine the Net Income, Loss and special allocations that would have resulted if that asset had been sold for that value, which amounts will be allocated pursuant to Article VI, and the Members' Capital Accounts will be adjusted to reflect those allocations. The amount distributed and charged to the Capital Account of each Member receiving an interest in the distributed asset will be the Fair Market Value of that interest as determined in good faith by the Manager (net of any liability secured by the asset that the Member assumes or takes subject to).",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"No Liability.", bold: true},
                        " Notwithstanding anything in this Agreement to the contrary, upon a liquidation, if any Member has a negative Capital Account balance (after giving effect to all contributions, Distributions, allocations and other Capital Account adjustments for all Fiscal Years, including the Year in which that liquidation occurs), neither that Member nor any Manager will have any obligation to make any contribution to the capital of the Company, and the negative balance of that Member's Capital Account will not be considered a debt owed by that Member or any Manager to the Company or to any other Person for any purpose; provided, however, that nothing in this Section will relieve any Member from any liability under any promissory note or other affirmative commitment that Member has made to contribute capital to the Company.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Limitations on Payments Made in Dissolution.", bold: true},
                        " Except as otherwise specifically provided in this Agreement, each Member will be entitled to look only to the assets of the Company for Distributions (including Distributions in liquidation) and the Parties will have no personal liability for any Distributions.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Certificate of Cancellation.", bold: true},
                        " Unless explicitly agreed upon, the debts, obligations and liabilities of the Company, whether arising in contract, tort or otherwise, will be solely the debts, obligations and liabilities of the Company, and will not be those of the Members, or the Covered Persons.",
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article XI", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "LIMITATION OF LIABILITY; STANDARD OF CARE; INDEMNIFICATION", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Limitation of Liability.", bold: true},
                        " Unless explicitly agreed upon, the debts, obligations and liabilities of the Company, whether arising in contract, tort or otherwise, will be solely the debts, obligations and liabilities of the Company, and will not be those of the Members, or the Covered Persons.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Standard of Care.", bold: true},
                        " Neither the Members nor the Covered Persons will have any personal liability whatsoever to the Company, any Member, or their Affiliates on account of that Person's role within the Company,  or by reason of that Person's acts or omissions in connection with the conduct of the business of the Company so long as that Person acts in good faith for a purpose which the Person reasonably believes to be in, or not opposed to, the best interests of the Company. Notwithstanding the preceding, nothing contained in this Agreement will protect that Person against any liability to which that Person would otherwise be subject by reason of (a) any act or omission of that Person that involves gross negligence, willful misconduct, bad faith, fraud, or willful and material breach of a material provision of the Operating Agreement or management agreement or (b) any transaction from which that Person or its Affiliate derives any improper personal benefit.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Indemnification.", bold: true},
                        " To the fullest extent permitted by applicable law, the Covered Persons will be entitled, out of the Company assets, to be indemnified against and held harmless from any and all liabilities, judgments, obligations, losses, damages, claims, actions, suits or other proceedings (whether under the Securities Act, the Commodity Exchange Act, as amended, or otherwise, civil or criminal, pending or threatened, before any court or administrative or legislative body, and as the same are accrued, in which an Indemnitee may be or may have been involved as a party or otherwise or with which he, she or it may be or may have been threatened, while in office or thereafter (a ",
                        {text:"“Proceeding”", bold: true},
                        ")) and reasonable costs, expenses and disbursements (including legal and accounting fees and expenses) of any kind and nature whatsoever (collectively, ",
                        {text:"“Covered Losses”", bold: true},
                        ") that may be imposed on, incurred by, or asserted at any time against an Indemnitee (whether or not indemnified against by other parties) in any way related to or arising out of this Agreement, the administration of the Company, or the action or inaction of an Indemnitee (including actions or inactions pursuant to Article X on the Company's dissolution or termination) or under contracts with the Company, except that the Covered Persons will not be entitled to indemnity for Covered Losses with respect to any matter as to which an Indemnitee has been finally adjudicated in any action, suit, or other proceeding, or otherwise by a court of competent jurisdiction, to have committed an act or omission involving his, her or its own  gross negligence, willful misconduct, bad faith, fraud, or reckless disregard of his, her or its obligations under this Agreement. The indemnities contained in this Article XI will survive the termination of this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Severability.", bold: true},
                        " If any provision of this Article is determined to be unenforceable in whole or in part, that provision will nonetheless be enforced to the fullest extent permissible, it being the intent of this Article to provide indemnification to all Persons eligible under this Agreement to the fullest extent permitted by applicable law.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Insurance.", bold: true},
                        " The Manager may cause the Company to purchase and maintain insurance on behalf of any Covered Person who is or was an agent of the Company against any liability asserted against that Covered Person capacity as an agent.",
                    ], 
                    style: 'def_item',
                    pageBreak: "after"
                },
                { 
                    text: "Article XII", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "MISCELLANEOUS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Amendments.", bold: true},
                        " This Agreement is subject to amendment only with the written Consent of the Manager and the Majority Members; ",
                        {text: "provided, however,", italics: true},
                        " that no amendment to this Agreement may:",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                               ", 
                        "(a)        ",
                        " Modify the limited liability of a Member; modify the indemnification and exculpation rights of the Covered Persons; or increase in any material respect the liabilities or responsibilities of, or diminish in any material respect the rights or protections of, any Member under this Agreement, in each case, without the Consent of each affected Member or Covered Person, as the case may be;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(b)        ",
                        " Alter the interest of any Member in income, gains and losses or amend any portion of Article IV without the Consent of each Member adversely affected by that amendment; ",
                        {text: "provided, however,", italics: true},
                        " that the admission of additional Members in accordance with the terms of this Agreement will not constitute an alteration or amendment;",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(c)        ",
                        " Amend any provisions of this Agreement that require the Consent, action or approval of Members without the Consent of those Members; or",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(d)        ",
                        " Amend or waive any provision of this Section.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Ministerial and Administrative Amendments.", bold: true},
                        " Notwithstanding the limitations above, ministerial or administrative amendments as may in the discretion of the Manager, be necessary or appropriate and those amendments as may be required by law may be made from time to time without the Consent of any of the Members; ", 
                        {text: "provided, however,", italics: true}, 
                        " that no amendment will be adopted pursuant to this Section unless that amendment would not alter, or result in the alteration of, the limited liability of the Members or the status of the Company as a “partnership” for federal income tax purposes.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Amendment Recordation.", bold: true},
                        " Upon the adoption of any amendment to this Agreement, the amendment will be executed by the Manager and, if required, will be recorded in the proper records of each jurisdiction in which recordation is necessary for the Company to conduct business.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Notices.", bold: true},
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                               ", 
                        "(a)        ",
                        " Any notice or other communication to be given to the Company, the Manager or any Member in connection with this Agreement will be in writing and will be delivered or mailed by registered or certified mail, postage prepaid, sent by facsimile or electronic mail or otherwise delivered by hand or messenger.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(b)        ",
                        " Each Member hereby acknowledges that the Manager is entitled to transmit to that Member exclusively by e-mail (or other means of electronic messaging, including the Otonomos dashpanel) all notices, correspondence and reports, including, but not limited to, that Member's Schedule K-1s.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(c)        ",
                        " Each notice or other communication to the Manager will for purposes of this Agreement be treated as effective or having been given upon the earlier of (i) receipt, (ii) the date transmitted by email, with evidence of transmission from the transmitting device, (iii) acknowledged receipt, (iv) when delivered in person, (v) when sent by electronic facsimile transfer or electronic mail at the number or address set forth below and receipt is acknowledged by the Manager, (vi) one business day after having been dispatched by a nationally recognized overnight courier service if receipt is evidenced by a signature of a person regularly employed or residing at the address set forth below for that Party or (vii) three business days after being sent by registered or certified mail, return receipt requested, postage prepaid.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(d)        ",
                        " Any notice must be given, if (x) to the Company, to the Company's Principal Office Location, facsimile number or email address, to the attention of the Manager and (y) to any Member or Manager, to that Member's or Manager's address or number specified in the records of the Company. Any Party may by notice pursuant to this Section designate any other physical address or email address to which notice to that Party must be given.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Waiver.", bold: true},
                        " No course of dealing or omission or delay on the part of any Party in asserting or exercising any right under this Agreement will constitute or operate as a waiver of any right. No waiver of any provision of this Agreement will be effective, unless in writing and signed by or on behalf of the Party to be charged with the waiver. No waiver will be deemed a continuing waiver or future waiver or waiver in respect of any other breach or default, unless expressly so stated in writing.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Governing Law.", bold: true},
                        " This Agreement will be construed, performed and enforced in accordance with the laws of the State of Delaware, without giving effect to its conflict of laws principles to the extent those principles or rules would require or permit the application of the laws of another jurisdiction.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Dispute Resolution.", bold: true},
                        " Any dispute, controversy or claim arising out of or relating to this Agreement, or the breach of this Agreement, except for any claim or action that the Manager or Company may elect to commence to enforce any of its rights or the Members obligations under this Agreement or the Subscription Agreement, will be settled by binding arbitration, before three arbitrators, administered by the American Arbitration Association under and in accordance with its Commercial Arbitration Rules, and judgment on the award rendered by the arbitrators may be entered in any court having jurisdiction.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                               ", 
                        "(a)        ",
                        {text: "Location.", italics: true},
                        " Any arbitration will be held in the Arbitration Location.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(b)        ",
                        {text: "Costs.", italics: true},
                        " Each of the Parties will equally bear any arbitration fees and administrative costs associated with the arbitration. The prevailing Party, as determined by the arbitrators, will be awarded its costs and reasonable attorneys' fees incurred in connection with the arbitration.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                               ", 
                        "(c)        ",
                        {text: "Consent to Jurisdiction.", italics: true},
                        " The Parties hereby irrevocably and unconditionally submits, for itself and its property, to the exclusive jurisdiction of any Arbitration Location, for recognition or enforcement of any award determined pursuant to this Section.",
                        
                    ], style: 'def_item'
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Remedies.", bold: true},
                        " In the event of any actual or prospective breach or default of this Agreement by any Party, the other parties will be entitled to seek equitable relief, including remedies in the nature of injunction and specific performance (without being required to post a bond or other security or to establish any actual damages). In this regard, the Parties acknowledge that they will be irreparably damaged in the event this Agreement is not specifically enforced, since (among other things) the Interests are not readily marketable. All remedies under this Agreement are cumulative and not exclusive, may be exercised concurrently and nothing in this Agreement will be deemed to prohibit or limit any Party from pursuing any other remedy or relief available at law or in equity for any actual or prospective breach or default, including the recovery of damages.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Severability.", bold: true},
                        " The provisions of this Agreement are severable and in the event that any provision of this Agreement is determined to be illegal, invalid or unenforceable in any respect by a court of competent jurisdiction, the remaining provisions of this Agreement will not be affected, but will, subject to the discretion of that court, remain in full force and effect, and any illegal, invalid or unenforceable provision will be deemed, without further action on the part of the Parties, amended and limited to the extent necessary to render that provision, as so amended and limited, legal, valid and enforceable, it being the intention of the Parties that this Agreement and each provision will be legal, valid and enforceable to the fullest extent permitted by applicable law.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Counterparts.", bold: true},
                        " This Agreement may be executed in counterparts, each of which will be deemed an original, but all of which together will constitute one and the same agreement. A facsimile, PDF or DocuSign (or similar service) signature will be deemed an original. The Parties hereby Consent to transact business with the Company and each of the other via electronic signature (including via DocuSign, eSignLive, or a similar service). Each Party understands and agrees that their signature page may be disassembled and attached to the final version of this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Further Assurances.", bold: true},
                        " Each Party shall promptly execute, deliver, file or record those agreements, instruments, certificates and other documents and take other actions as the Manager may reasonably request or as may otherwise be necessary or proper to carry out the terms and provisions of this Agreement and to consummate and perfect the transactions contemplated hereby.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Assignment.", bold: true},
                        " Except as otherwise provided in this Agreement, and any right, interest or obligation may not be assigned by any Party without the prior written Consent of the Manager as set forth in Article VIII. Any purported assignment without Consent will be ab initio null and void and without effect.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Binding Effect.", bold: true},
                        " This Agreement will be binding upon and inure to the benefit of the Parties and their respective legal representatives, successors and permitted assigns. This Agreement is not intended, and will not be deemed, to create or confer any right or interest for the benefit of any Person not a party to this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Titles and Captions.", bold: true},
                        " The titles and captions of the Articles and Sections of this Agreement are for convenience of reference only and do not in any way define or interpret the intent of the Parties or modify or otherwise affect any of the provisions hereof and shall not have any effect on the construction or interpretation of this Agreement.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Construction.", bold: true},
                        " This Agreement will not be construed against any party by reason of that party having caused this Agreement to be drafted.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        {text:"Entire Agreement.", bold: true},
                        " This Agreement constitutes the entire understanding and agreement among the Parties and supersedes all prior and contemporaneous understandings and agreements whether written or oral.",
                    ], 
                    style: 'def_item',
                },
                { 
                    text:[
                        "                       ", 
                        " IN WITNESS WHEREOF, the undersigned has executed this Operating Agreement effective as of the Effective Date.",
                    ], 
                    style: 'def_item',
                },
                {
                    margin: [0,60,0,0],
                    layout: 'noBorders',
                    table: {
                        widths: [ '*', '*' ],
                        body: [
                          [ 
                              { text: "" },
                              [ 
                                  { text: "COMPANY: ", bold: true, fontSize: 14 },
                                  " ",
                                  " ",
                                  {
                                      text: [
                                          { text: "By:      ", fontSize: 14 },
                                          { text: "[ETH Wallet ADDRESS]", bold: true, fontSize: 14 },
                                          { text: ", Manager", fontSize: 14},
                                      ]
                                  }
                              ]
                          ]
                        ]
                    },
                    pageBreak: "after"
                },
                { 
                    text: "Member Signature Page", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "The undersigned Member hereby executes the Limited Liability Company Operating Agreement of the Company, dated as of the Effective Date, and hereby authorizes this signature page to be attached to a counterpart of that document executed by the Manager of the Company.", 
                    style: 'def_item',
                },
                { 
                    margin: [0,60,0,0],
                    fontSize: 14,
                    text: "[ETH WALLET ADDRESS - MEMBER]",
                    pageBreak: "after",
                },
                { 
                    text: "SCHEDULE A", 
                    alignment: 'center',
                    margin: [ 0, 20, 0, 0 ], 
                    fontSize: 12,
                    bold: true,
                },
                { 
                    text: "DISCLAIMERS", 
                    alignment: 'center',
                    margin: [ 0, 10, 0, 0 ], 
                    fontSize: 14, 
                    bold: true,
                },
                { 
                    text: "Each Series, its members and managers hereby agree as follows:", 
                    style: 'def_item',
                },
                {
                    margin: [10,0,0,0],
                    ul: 
                    [
                        { 
                            text: 'The use of a “Series”, “Protected”, “Registered” or similar LLC is a recent legal advent and is subject to various legal uncertainties regarding its validity and use cases, including, without limitation, uncertainties relating to:',
                            style: 'def_item',
                        },
                        {
                            margin: [10,10,0,0],
                            type: "circle",
                            ul:
                            [
                                { 
                                    text: 'the non-recognition of such type of legal entity and structure by other U.S. States, such as California, New York and Massachusetts;',
                                    style: 'def_sub_item',
                                },
                                { 
                                    text: 'the novelty and lack of established precedent regarding Series LLCs and any liability “spill-over” risks between the Series and the Company;',
                                    style: 'def_sub_item',
                                },
                                { 
                                    text: 'the lack of regulatory clarity regarding the taxation of a Series LLC; and',
                                    style: 'def_sub_item',
                                },
                                { 
                                    text: 'the lack of regulatory clarity regarding bankrupcy proceedings of a Series LLC under federal law;',
                                    style: 'def_sub_item',
                                },
                                
                            ]
                        },
                        { 
                            text: 'Notwithstanding anything to the contrary in the Agreement, the Member and Manager shall be entitled to dissolve the Company at any time, in the event where there is any risk or threatened risk of liability to the Company, Otonomos or the Manager in relation to the Company’s or any Series’ affairs;',
                            style: 'def_item',
                        },
                        { 
                            text: 'Each Series, its members and managers may be required by the Company, at any time, to provide basic Know Your Customer (KYC) information, such as copy of national ID, name, proof of address, among others, in the event where: i) such Series desires to obtain a bank account; ii) the Company, Otonomos or the Manager are legally required to provide such information; or iii) such Series desires to become a “registered” series in the State of Delaware; and',
                            style: 'def_item',
                        },
                        { 
                            text: 'THE CODE, SOFTWARE AND DOCUMENTATION FOR THE IMPLEMENTATION OF A SERIES ARE PROVIDED "AS IS" AND THE COMPANY, OTONOMOS AND THE MANAGER HEREBY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND ALL WARRANTIES ARISING FROM COURSE OF DEALING, USAGE, OR TRADE PRACTICE. NO WARRANTY OF ANY KIND IS MADE THAT THE CODE, SOFTWARE AND DOCUMENTATION, OR ANY PRODUCTS OR RESULTS OF THE USE THEREOF, WILL MEET LICENSEE\'S OR ANY OTHER PERSON\'S REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, ACHIEVE ANY INTENDED RESULT, BE COMPATIBLE OR WORK WITH ANY SOFTWARE, SYSTEM OR OTHER SERVICES, OR BE SECURE, ACCURATE, COMPLETE, FREE OF HARMFUL CODE, OR ERROR FREE.',
                            style: 'def_item',
                        },
                        { 
                            text: 'The Series, its members and managers shall indemnify and hold harmless the Company, Otonomos and the Manager (the "Indemnified Parties") against any claims, liabilities, legal fees, judgements, or other losses incurred by the Indemnified Parties that relate to the disclaimers set forth above or that may arise from i) a Series’ non-compliance with the provisions of the Agreement; ii) any business or action undertaken of the Series, its members or managers; iii) the use of the Ethereum blockchain.',
                            style: 'def_item',
                        },
                        
                    ]
                },
            ],
            pageMargins: [ 50, 80, 50, 80 ],
            header: {
                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA3CAYAAAAyuMeeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACsVJREFUeNrsXYGVnDgM9UwDOx0sHSxXwbIVhKsgXAUhHZAKjq0gXAXHdsBWcEwHTAdMBXOQEwlHsC2DZMFm/Z5fXhbGlmTLkr9kc7jdbgpbDofDqfsnVDSl6fpuKBoipmtV6XiqqNraqrzfy4ZKr8C22pV+ImVdbfufENZ+socYGgx05cQ0UdRsKU/AV9DVgknepzW0UdauxDCverpqA90NvNOPdYyVoUc++vFKYMwqw7gNfGRYPmz1gLHAnSXoCfvItIZcQInbBRaq7P75sNG18UvHU7bQ8vaD/MhE17mjS8xb6XiLYLLr5tPrzN8eZ+ZMPyfzuXnT9dHz909XP3fPcyY+TsBHXx8mtNVQxyWEej/627WrJfBRs1hgsHLcFitZuOrdNlzbFas5N22xgLWNwAL9JCewrKHl9yFYrmby22zqVYCVY+Fz5PVNrWyB8SaBj0LjHTl7DRiC0y26nDAhtqzAt4UTJNu6i79gwpcaOvIlLj3MyXbimibwbKwcATEv6YziLlO8/xS5WTs27wr8aypw4tHqthqrmxDsO2tq+TsuQgVBu/UarGIrLl24UADNhhW4WshT6IG2wIPyJtwuvEEBboC6c/ZRMrffoFxygsFYW9MVzIcMSC3J/nclup7s2fpa6E8ZXPSWagF1UK4TIQ+hwVMJUSj04XAIwF0eEMoaCO1Xmgaeh4RxyXbSdgwCG0rdPSsd0MDTAhoiA9r7Cq6Mc7wV+GotdAfgLgfwp2r8WwZ5NzCpG0Bp48lzlLwR49GPxVfN45euj5gBEe7b/Hs6fl1f0UqUuZogzEN5ooz3Q3+97v3pHKVBWrKEcbU2xXFrzrilBg0k2d+s8BxaZnkXXPJG8MU5lhWlBTa45iUjD7otYW10oW1gwJp9KgEQVTEJCwMWZZ4HinWfinTNixXuZiOFfM/wljEZlUBo65FrfoMGqTIhJeKazI3E4uGAnqcMfZeM6HluwQROHvbe7dr5ahmfygMPpnkZTd8/jvZgEgW7R+Gg8R7xjmR+9WknbQ6ZT58Mr+RLMu0WlJKgjXzhM6piyt4rpn84zqR8+SxYIICDxrNQv9iJ3Aj2TTnpfU18l/lkAuAeNI+vFCDfykXovqPxfwp+hJXxGdFwIbRivjCt3jkRfa6pq7Waz/dVMzmyEjw/O076UJnztl88Wd/VCmyxfpUPBkBWL4ZXUkDIf6DQlv1oM+d7e8jWucEk5kQuM1fQgDifVocEh4x9xwZ558Sotresr5k9ZEYM8CUeeUDTckS4bBWnmw3xtFIT/+LeOxUaV/rVshpTrLI6edeLT6bgrVSlkXfhaH1PM/FkEctFsPWw8eFzq2mTWTqNA9vQYJZ4rDKnwrGufIjYd8MVMlD2M8w1o+W3yTt2tOamthqf1neSu586yoUcmWeOkoTjODAmHTFhFDb5sTyikErB0C82bBcLLBxOSodwn0vfE380tiGhy1oJ8WAN6x7hgPWdUCgHE6a5A6BEIoTF0W9AKBsOed8TylAkwtGnazpuQ2x8NAJs1Biaj4yhBcrCEb+8E+r3TRTY/9qUvdoJO+EGFdgmu8chjFRD2EIJMIFZJa/UieMjoIqCviU8Y+RdCsn7IughSJWHDSowZhGNsGBEKQiqJIzhK7YjgSv3XMXW5Y3BL7ZyeR7B+etIiDYrLnWEPUO/2v+msQx/cRwBG8IpcMHaXOC6p6U/tlUw9V0Bz3NhpDMob83Ud8/Tk+bxc/c8YQxfRUTyfivbiz3zERxH+5lcsy+M4bwllxsQa0CEO+ibU8ChBlQKlD0uuIbnUOmzohIAFrmKUd4MYNzmlQDxjhROdLXSrjlL6etEUIDoN2fMSBK5vVHZY3wtk7wjKnkj5ky1Exc62+pWACPjI9z8gLmDmMOtw7T5ickKZ4h3Uibra0Nv7xT+pBa1vBP1XnZT9nKckAPxfBDqF7sYcYwLps27d7XYlwJLQuRYkIiDxishfRyl3Umb70VSgeGDV5iYaMHQf4V458L0Ua6SiD6nAuj3hYg+Dp5f39ViXxZ4AHTOBkv1B4cSQfjKdP70ovjQ4FSZD/X3E5nrILpN3r8zybtfhP8yvHJ22APbvJPHneiA1csCnGibZYIIzx1qyDygbYVivnvXEemrBBMIEiGe67eC3jIg81KJHLakmxwbUik8K6/T7fQM3+xh/RSn2m4mFlreCB72osAntd9MrMzlOGEsMJHZzpQq3NG6jGnCYOQdCh3frAgtV7gTJW6VQD4AgQLHR4hLYkIHYsfbmI4TYvbWERPPd0T0cfD8iNx6YQC+vaQp1gJzn2LfXR+FhYwFBzho3Pq1snsoNsQ6kiKsT/6BWyYpoiGnDerGt+iMy7WyHDFEVN9MxwkvVPQ5loZSNgx9Xx3as4WlJBfAXnm/Ir23LfJhU+BvOoG9VvaqeOLABWLCPDMJCMMP+cIB4aEXy2tnpjuIc4S88zeiwBHWesKps8vGQmIham4iwgLc15wGBmQ085DITnbFKtG1smzo9yh8pZN3yhDqCIQAoMYFQUaExcINHWT4/qmaI9J9kkjBuyr+NM9C08dFMX5NALyeVkjWLbG8bXKKfU8cAIDuHeVp88h87+dNVv/H52uRIZVG8V0ra4PwM0ZL1CqZGzkKJXOtbICQd0J8PLIWsL6JWhCLtoxLuaHkkmD8dUJMIFvyWtkbk5Aw18qWTEq05WtlW4Z4fuBZgcuFCmwbm5Mn+k3jVEy/TogFGgIGNyFCukQc7ssHoTASVo5ScXfn44SQY20KKaW+/E44O/5hyW8BYPyyge2AqZ9s/B/pa2Vb4vfeUtkbzyYlTZivRpqGj9Yi9ReM8jAtQJHS5yh8mR5ycblWtmKgF9PmlelyuRfEO2/tWllMm5clDcMYfTZY9XwDCwkWYNRZwHvm+8pMC1AfWszmCB5MtncgSfLrdmrb18omQocZWrUycd8ynpEv8GotfmIYo4Y5pOp0R9phQLIAek9gn3QaWYtyyISCrBYyV2jU7nBTYjixVDnTYf4xz71VepixQvGN8SuBGnlXAFI0HHv/kbwTkHcw8YYKCnl37VeaMMgFFsWWQZ7D4nQ/4fmwos1+MfqocWUzBh5Kzf79SZuN6BByaZDoqUttlefvx86ssq2GrlSQLi55N8pDQoLF0pc+PTlGDzEkpj9e4o1RHn9bUwMBJcGEsBIBugJmebcewyGF8nDe2eS2M7ZPtsUyjLl1/pHFaldWCUWpFdHZWN/3FBPUaAMLZUWxkMwoV8sRu9XsiVcrscZbabF5AEeEa+4D/g+U/yJ1rewvVbpJ1qPPc5+w6ffIjcORv5/CLV2tR3vUb3e3wVy6UI8hxLqnfPToetXRkS7kYchLH8/F4bM+JZYwqsyhNTW+ySW7b80CR2/JAs9YsUazN08w1hL2iuWMNQ80MoyYvIp2hobYwWUuKHCX7yj0QlSRorAhkwsRxnHpPzSW+rZaYFkemJo/wwflxApY3UQzp85glaZo+BClGGeKvUKIszLM2SeO8+SAeiegzGPk+woLTDPJczgB/fFkbC+gzPkiHVixYuwGFV0YE619gT0aFLpkkHethI73GeZVAnMLg0m0oBSpjQ9ou/I4XhnQhgEgK0hsWe0doCzwJHZJtl9lumnDdSWNZ/ZJNdOB+iWxYip5t5xxbQ881769tJV8zMXwG+q8hn8FGACsDzqoJbpABQAAAABJRU5ErkJggg==',                    
                    fit: [120, 120],
                    //text: "OTOCO",
                    alignment: 'right',
                    margin: [ 0, 30, 25, 0 ],
                    //fontSize: 24
                },
            footer: function(currentPage, pageCount) {
                return [
                  {
                      layout: 'noBorders',
                      table: {
                        widths: [ '*', '*' ],
                        body: [
                          [ 
                              { text: "Version 1.2 (27-Sep-19)", alignment: 'left', margin: [ 40, 20, 0, 0 ], fontSize: 10 },
                              { text: currentPage, alignment: 'right', margin: [ 0, 20, 40, 0 ], fontSize: 10 } 
                          ]
                        ]
                      }
                   }
                ]; 
            },
            styles: {
                def_paragraph: {
                    margin: [ 0, 0, 0, 0 ]
                },
                def_title: {
                    margin: [0,20,0,0], 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                },
                def_name: {
                    bold: true, 
                    italics: true,
                },
                def_item: {
                    margin: [0,20,0,0], 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                },
                def_sub_item: {
                    margin: [0,10,0,0], 
                    lineHeight: 1.2,
                    preserveLeadingSpaces: true,
                }
            },
            
        };
    }
}

module.exports = PDFTemplate;