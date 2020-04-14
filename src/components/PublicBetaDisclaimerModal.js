import React,{useState} from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const triggerStyle = {
    'color': '#eeeeee',
    'cursor': 'pointer',
    'font-weight': 'bolder',
    'text-decoration': 'underline',
};

const modalBgColorStyle = {
    'background-color': '#424242'
}

const modalTextColor = {
    'color': '#eeeeee'
}

const modalHeaderStyle = {
    ...modalBgColorStyle,
    ...modalTextColor,
    'font-weight': 'bold'
}

const ModalExampleScrollingContent = () => {
  const [isOpen, setIsOpen] = useState(false)

  return(
    <Modal 
        size="small"
        open={isOpen}
        onClose={()=>setIsOpen(false)} 
        trigger={<a style={triggerStyle} onClick={() => setIsOpen(true)}>Public Beta Disclaimer</a>}
        style={modalBgColorStyle}
    >
        <Modal.Content style={{...modalBgColorStyle, ...modalTextColor}} scrolling>
            <Header style={modalHeaderStyle}>Public Beta Disclaimer</Header>
            <Modal.Description>
                <p>
                Please note that this is a public beta version of the OtoCo platform running on the Ethereum Kovan Testnet. 
                It is still undergoing final testing before its official release. 
                The platform, its software and all content found on it are provided on an “as is” and “as available” basis. 
                Otonomos does not give any warranties, whether express or implied, as to the suitability or usability of the website, 
                its software or any of its content.
                </p>
                <p>
                Otonomos will not be liable for any loss, whether such loss is direct, indirect, special or consequential, 
                suffered by any party as a result of their use of the OtoCo platform, its software or content. 
                Any transactions on the website are done at the user’s own risk and the user will be solely responsible 
                for any damage to any computer system or loss of data or funds that results from such activities.
                </p>
                <p>
                Should you encounter any bugs, glitches, lack of functionality or other problems on the website, 
                please let us know immediately so we can rectify these accordingly. 
                Your help in this regard is greatly appreciated! 
                </p>
                <p>
                You can write to us at this address: <a href='mailto:support@otonomos.com' target='_blank'>support@otonomos.com</a>
                </p>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions style={modalBgColorStyle}>
            <Button primary onClick={() => setIsOpen(false)}>
            <Icon name='check' />&nbsp;&nbsp;OK
            </Button>
        </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleScrollingContent