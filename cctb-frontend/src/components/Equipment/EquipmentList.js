import React from 'react'
import EquipmentItem from './EquipmentItem'

const EquipmentList = ({equipments}) => {
  return (
    <div>
      <div>
      {equipments.map((eq) => (
        <EquipmentItem key={eq.id} equipment={eq} />
      ))}
    </div>
    </div>
  )
}

export default EquipmentList
