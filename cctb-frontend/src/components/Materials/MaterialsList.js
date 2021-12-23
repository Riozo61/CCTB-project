import React from 'react'
import MaterialItem from './MaterialItem'

const MaterialsList = ({materials}) => {
  return (
    <div>
      {materials.map((mat) => (
        <MaterialItem key={mat.id} material={mat} />
      ))}
    </div>
  )
}

export default MaterialsList
