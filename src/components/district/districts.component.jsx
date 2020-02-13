import React from 'react';
import District from './district.component'

const Districts = (props) => {


    return (
        <div>
        Districts from your location: {props.dist.map((d, i) => (<District key={i} dist={d} />))}
        </div>
    )
}

export default Districts;