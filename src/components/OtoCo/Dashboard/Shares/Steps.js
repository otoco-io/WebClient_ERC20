import React from 'react'
import { Step } from 'semantic-ui-react'

export default () => {

    return (
        <Step.Group ordered className="deploy-steps">
            
            <Step completed>
            <Step.Content>
                <Step.Title>Settings</Step.Title>
                <Step.Description>Token parameters</Step.Description>
            </Step.Content>
            </Step>
            <Step active>
            <Step.Content>
                <Step.Title>Deploy Tokens</Step.Title>
                <Step.Description>Create token contract</Step.Description>
            </Step.Content>
            </Step>
            <Step>
            <Step.Content>
                <Step.Title>Ownership</Step.Title>
                <Step.Description>to the tokens</Step.Description>
            </Step.Content>
            </Step>
        </Step.Group>
    )

}