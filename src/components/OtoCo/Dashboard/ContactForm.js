import React, { useState } from 'react'
import database from '../../../firebase'

// Redux Hook
import {useMappedState,useDispatch} from 'redux-react-hook';
import { useHistory, Link } from "react-router-dom";

// Semantic UI for React
import Input from 'semantic-ui-react/dist/commonjs/elements/Input'
import Button from 'semantic-ui-react/dist/commonjs/elements/Button'
import Label from 'semantic-ui-react/dist/commonjs/elements/Label'
import Message from 'semantic-ui-react/dist/commonjs/collections/Message'

export default () => {

    const dispatch = useDispatch();
    const {currentAccount} = useMappedState(({accountState}) => accountState);
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [website, setWebsite] = useState('')

    const contact = {
        email: '',
        name: '',
        website: ''
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangeName = (event) => {
        setName(event.target.value);
    }
    const handleChangeWebsite = (event) => {
        setWebsite(event.target.value);
    }

    const handleClickNext = (event) => {
        if (!email) {
            setError('* to save your contact we need at least your e-mail.')
            return;
        }
        if (!validateEmail(email)){
            setError('* please fill a valid e-mail.')
            return;
        }
        setError('');
        database.fillForm(currentAccount, email, name, website)
        dispatch({type: "Set Dashboard Contact Form", show:false})
    }
    const handleClickSkip = (event) => {
        window.localStorage.setItem('contactFormLastRequest', new Date())
        dispatch({type: "Set Dashboard Contact Form", show:false})
    }

    return (
        <div className="ui celled table contact-form">
            <p>
            Before accessing your dashboard, we ask you to provide us with basic contact information. 
            The only required field is your email address. 
            We will only ever use your address to send you reminders about expiring services (annual company renewal, etc) and to update you about OtoCo's development.
            </p>
            <p></p>
            <Input 
                type='text' 
                className="contact-input-container" 
                labelPosition='left'
                defaultValue=''
                placeholder='johndoe@domain.com'
                onChange={handleChangeEmail}
                style={{width: '60%', marginRight:"5%"}}
            >
                <Label basic>E-mail Address</Label>
                <input className="placeholder" />
            </Input>
            <Input 
                type='text' 
                className="contact-input-container" 
                labelPosition='left' 
                defaultValue=''
                placeholder='John Doe'
                onChange={handleChangeName}
                style={{width: '60%', marginRight:"5%"}}
            >
                <Label basic>Your Name</Label>
                <input className="placeholder" />
            </Input>
            <Input 
                type='text' 
                className="contact-input-container"
                labelPosition='left' 
                defaultValue=''
                placeholder='http://www.johndoe.com'
                onChange={handleChangeWebsite}
                style={{width: '60%'}}
            >
                <Label basic>Website</Label>
                <input className="placeholder" />
            </Input>
            {error && <p className="contact-error">{error}</p>}
            <p>
                <Button className="primary" onClick={handleClickNext}>Save Contact Information</Button>
            </p>
            <p style={{fontSize:'11px', width:'60%'}}>You can also decide not to provide any contact information, but in this case we can’t remind you about expiry dates and other important deadlines. <a onClick={handleClickSkip}>Click Here</a> to skip this form.</p>
        </div>
    )
}
