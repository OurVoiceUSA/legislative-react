import React from 'react'

const Profile = ( {...otherProps} ) => (
  <div className="group">
    mimiced google civics: <pre>{JSON.stringify(otherProps.official.officials, otherProps.properties, 2)}</pre>
  </div>
)
  export default Profile;