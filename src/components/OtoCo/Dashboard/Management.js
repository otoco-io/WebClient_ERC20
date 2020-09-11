import React from 'react'
import SeriesStep from './Nav'
import Agreement from './Agreement'
import Shares from './Shares/Base'
import Ens from './ENS/Base'

// Redux Hook
import {useMappedState} from 'redux-react-hook';

import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid'

export default () => {

    const {manageOption} = useMappedState(({managementState}) => managementState);

    return (
        <tr>
            <td colSpan="6">
                <Grid>
                    <Grid.Row style={{minHeight: "500px"}}>
                        <Grid.Column width={4} style={{textAlign: "right"}}>
                            <SeriesStep />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            {manageOption == 0 && <Shares></Shares>}
                            {manageOption == 1 && <Ens></Ens>}
                            {manageOption == 2 && <Agreement></Agreement>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </td>
        </tr>
    )

}