import React from 'react';

const Location = ( {...otherProps} ) => (
    <div className="group">
        Location from your browser: {
             JSON.stringify(otherProps.location)
      }
    </div>
  )

export default Location