import React, { FC } from 'react'

export const Container:FC = (props) => {
  return (
    <div style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        height: '100vh',
      }}>{props.children}</div>
  )
}
