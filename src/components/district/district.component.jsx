import React from 'react';


const District = ( props ) => {
    return (
      <div className="districts">
        You are located in {props.dist.state} {props.dist.type} {props.dist.name}
      </div>
    );
  }



  export default District;