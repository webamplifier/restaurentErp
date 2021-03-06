import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="mr-1">Developed by</span>
        <a href="https://web-amplifier.com" target="_blank" rel="noopener noreferrer">Web Amplifier</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
