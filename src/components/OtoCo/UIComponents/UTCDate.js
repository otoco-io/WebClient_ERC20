import React from 'react'

export default (props) => {

    const getDate = (date) => {
        return ('0' + date.getDate()).slice(-2) + '/'
             + ('0' + (date.getMonth()+1)).slice(-2) + '/'
             + date.getFullYear();
    }

    const getTime = (date) => {
        const time = ('0' + date.getUTCHours()).slice(-2) + ':'
             + ('0' + (date.getUTCMinutes()+1)).slice(-2);
        return <span>{time}</span>
    }

    return (
        <span>{getDate(props.date)} {props.separator} {getTime(props.date)} UTC </span>
    )

}