import React from "react"
import { useEditor } from "@layerhub-io/react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { graphics } from "~/constants/mock-data"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"

import Element from "~/components/Icons/Elements"
import useAppContext from "~/hooks/useAppContext"
import Stickers from "~/components/Icons/Stickers"
import Logomaker from "~/components/Icons/Logomaker"
const Elements = () => {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (item: any) => {
      if (editor) {
        editor.objects.add(item)
      }
    },
    [editor]
  )

  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem",
        }}
      >


        <Block $style={{
          display: "flex",
          justifyContent: "center",
          paddingY: "2rem",
        }}>


          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Elements");
            }}
            $style={{
              width: "80px",
              height: "80px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              margin: "5px",
              backgroundColor: theme.colors.primary100,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",
              userSelect: "none",
              transition: "all 0.5s",
              gap: "0.1rem",
              ":hover": {
                cursor: "pointer",
                backgroundColor: theme.colors.primary100,
                transition: "all 1s",
              },
            }}
          >
            <div style={{ height: "50px" }}><Element size={40} /></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Elements</div>
          </Block>


          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Stickers");
            }}
            $style={{
              width: "80px",
              height: "80px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              margin: "5px",
              backgroundColor: theme.colors.white,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",
              userSelect: "none",
              transition: "all 0.5s",
              gap: "0.1rem",
              ":hover": {
                cursor: "pointer",
                backgroundColor: theme.colors.primary100,
                transition: "all 1s",
              },
            }}
          >
            <div style={{ height: "50px" }}><div style={{ marginTop: "5px" }}><Stickers size={32} /></div></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Stickers</div>
          </Block>

          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Logomaker");
            }}
            $style={{
              width: "80px",
              height: "80px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              margin: "5px",
              backgroundColor: theme.colors.white,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              fontFamily: "system-ui, 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontWeight: 500,
              fontSize: "0.8rem",
              userSelect: "none",
              transition: "all 0.5s",
              gap: "0.1rem",
              ":hover": {
                cursor: "pointer",
                backgroundColor: theme.colors.primary100,
                transition: "all 1s",
              },
            }}
          >
            <div style={{ height: "50px" }}><Logomaker size={32} /></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Logo Maker</div>
          </Block>



        </Block>


      </Block>
      <Scrollable>
        {/* <Block padding={"0 1.5rem"}>
          <Button
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                },
              },
            }}
          >
            Computer
          </Button>
        </Block> */}
        <Block>
          <Block $style={{ display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            {graphics.map((graphic, index) => (
              <ImageItem onClick={() => addObject(graphic)} key={index} preview={graphic.preview} />
            ))}
          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

const ImageItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      className={css({
        position: "relative",
        background: "#f8f8fb",
        cursor: "pointer",
        borderRadius: "8px",
        overflow: "hidden",
        ":hover": {
          opacity: 1,
          background: "rgb(233,233,233)",
        },
      })}
    >
      <img
        src={preview}
        className={css({
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
    </div>
  )
}

export default Elements
