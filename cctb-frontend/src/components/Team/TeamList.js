import { observer } from 'mobx-react-lite'
import React from 'react'
import TeamItem from './TeamItem'

const TeamList = observer(({members}) => {
  return (
    <div>
      {members.map((m) => (
        <TeamItem key={m.id} member={m}/>
      ))}
    </div>
  )
})

export default TeamList
