import React from "react"
import { Block } from "baseui/block"

const EditorContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Block
      $style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#FFFFFF",
        fontFamily: "system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {children}
    </Block>
  )
}

export default EditorContainer
