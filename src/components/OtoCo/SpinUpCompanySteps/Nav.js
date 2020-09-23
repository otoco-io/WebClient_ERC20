import React from 'react'
import OtoCoStep from '../UIComponents/Step'

export default ({stepNum}) => {

    return (
        <OtoCoStep.Wrap pointing secondary vertical>
            <OtoCoStep.Item active={stepNum === 0}>Check Name</OtoCoStep.Item>
            <OtoCoStep.Item active={stepNum === 1}>Connect Wallet</OtoCoStep.Item>
            <OtoCoStep.Item active={stepNum === 2}>Approve Payment</OtoCoStep.Item>
            <OtoCoStep.Item active={stepNum === 3}>Activate Company</OtoCoStep.Item>
        </OtoCoStep.Wrap>
    )
}