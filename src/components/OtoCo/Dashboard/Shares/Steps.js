import React from 'react'
import { Step } from 'semantic-ui-react'
import {useMappedState} from 'redux-react-hook';

export default () => {

    const {sharesStep} = useMappedState(({managementState}) => managementState);

    return (
        <Step.Group ordered className="deploy-steps">
            
            <Step completed={sharesStep > 0} active={sharesStep === 0}>
            <Step.Content>
                <Step.Title>Settings</Step.Title>
                <Step.Description>Token parameters</Step.Description>
            </Step.Content>
            </Step>
            <Step completed={sharesStep > 1} active={sharesStep === 1}>
            <Step.Content>
                <Step.Title>Deploy Tokens</Step.Title>
                <Step.Description>Create token contract</Step.Description>
            </Step.Content>
            </Step>
            <Step completed={sharesStep > 2} active={sharesStep === 2}>
            <Step.Content>
                <Step.Title>Ownership</Step.Title>
                <Step.Description>to the tokens</Step.Description>
            </Step.Content>
            </Step>
        </Step.Group>
    )

}