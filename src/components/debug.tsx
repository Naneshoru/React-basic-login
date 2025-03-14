/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

type Props = {
  value: any
  lowOpacity?: boolean
  children?: any
}
function Debug ({ value, lowOpacity, children }: Props): any {
  const [valueLocal, setValueLocal] = useState<any>()
  useEffect(() => { setValueLocal(value) }, [value])

  const elem = (document.getElementsByClassName('debug')?.[1] as any)
  if (elem) {
    elem.style.left = ''
    elem.style.right = '30px'
  }

  return (
    <div className='debug custom-scroll'
      style={{
        overflow: 'auto',
        position: 'fixed',
        left: '30px',
        top: '100px',
        maxHeight: '80vh',
        background: 'white',
        zIndex: 100,
        opacity: lowOpacity ? 0.6 : 1
      }}
    >
      <pre>
        {JSON.stringify(valueLocal, null, 2)}
        <br></br>
        {children}
      </pre>
    </div>
  )
}

export default Debug
