import React from 'react';

export default function Userinfos(props) {
  if(props.loggedInUser){
    const {username, email} = props.loggedInUser
  return (
    <div>
      <h1>Paramètres</h1>
      <form onSubmit={props.onEdit}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input id="username" name="username" type="string" defaultValue={username} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={email} />
        <label htmlFor="password">Mot de passe actuel</label>
        <input id="password" name="password" type="string" placeholder="********" />
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <input id="newPassword" name="newPassword" type="string" placeholder="********" />
        <button type="submit">Valider les changements</button>
      </form>
      <button onClick={props.onDelete}>Supprimer mon compte</button>
    </div>
  )
  } else {
    return <div>Loading</div>
  }
}
 