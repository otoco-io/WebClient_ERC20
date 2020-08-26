import React from 'react'

import Step from 'semantic-ui-react/dist/commonjs/elements/Step'

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
                <Step.Title>Deployment</Step.Title>
                <Step.Description>Create the token contract</Step.Description>
            </Step.Content>
            </Step>
            <Step completed={sharesStep > 2} active={sharesStep === 2}>
            <Step.Content>
                <Step.Title>Claim Ownership</Step.Title>
                <Step.Description>by the controlling wallet</Step.Description>
            </Step.Content>
            </Step>
        </Step.Group>
    )

}