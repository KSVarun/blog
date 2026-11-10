import type { PropsWithChildren } from 'react'

export const Container = (props: PropsWithChildren) => {
  return (
    <div style={{
        fontFamily: 'system-ui, sans-serif',
        lineHeight: '1.4',
        minHeight: '100vh',
      }}>{props.children}</div>
  )
}
