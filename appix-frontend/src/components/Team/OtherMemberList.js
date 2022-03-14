import { observer } from 'mobx-react-lite'
import React from 'react'
import OtherMemberItem from './OtherMemberItem'

const OtherMemberList = observer(({otherMembers}) => {
  return (
    <div>
      <div>
      {otherMembers.map((member) => (
        <OtherMemberItem key={member.id} otherMember={member}/>
      ))}
    </div>
    </div>
  )
})

export default OtherMemberList
