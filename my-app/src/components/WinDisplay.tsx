import React from 'react'
import { WinProp } from '../typescript/Types'


const WinDisplay: React.FC<WinProp> = ({result}) => {
  return (
    result === 1 
    ? <span className="pi pi-crown"></span>
    : <span className="pi pi-crown" style={{ color: 'transparent' }}></span>
  )
}

export default WinDisplay
