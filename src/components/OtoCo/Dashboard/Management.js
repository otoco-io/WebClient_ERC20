import React from 'react'
import SeriesStep from './Nav'
import Agreement from './Agreement'
import Shares from './Shares/Base'

// Redux Hook
import {useMappedState} from 'redux-react-hook';

import { Container, Button, Image, Loader, Icon, Message, Grid } from 'semantic-ui-react'

export default () => {

    const {manageOption, manageSeries} = useMappedState(({managementState}) => managementState);

    return (
        <tr className="selected">
            <td colSpan="6">
                <Grid>
                    <Grid.Row style={{height: "500px"}}>
                        <Grid.Column width={4} style={{textAlign: "right"}}>
                            <SeriesStep />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            {manageOption == 0 && <p>On the left menu you can select different options accordingly to your needs.</p>}
                            {manageOption == 1 && <Agreement></Agreement>}
                            {manageOption == 2 && <Shares></Shares>}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </td>
        </tr>
    )

}