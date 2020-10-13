import React from 'react';

export default function Horses(props) {
  if (!props.loggedInUser){
    return <div>Loading</div>
  } else {
  const { username, horses } = props.loggedInUser;
  return (
    <div>
      <div>Bienvenue {username}</div>
      <div>Search box</div>
      <div>Ajouter un cheval</div>
      <div>
        {
          horses.map((horse, i) => {
            return (
              <div key={"horse" + i}>
                {horse.name}
              </div>
            )
          })
        }
      </div>
    </div>
  )}
}
