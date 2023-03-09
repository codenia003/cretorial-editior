import React, { useEffect, useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import { Button, SIZE } from "baseui/button"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
//import { vectors } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import api from "~/services/api"
import { Spinner } from "baseui/spinner"
import { Input } from "baseui/input"
import Search from "~/components/Icons/Search"
import Logomaker from "~/components/Icons/Logomaker"
import Elements from "~/components/Icons/Elements"
import Sticker from "~/components/Icons/Stickers"
import useAppContext from "~/hooks/useAppContext"

const Stickers = () => {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()

  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [spinner, setSpinner] = useState(true);
  const [category, setCategory] = useState<string>("")

  const [vectors, setVectors] = useState([]);

  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          name: "Stickers",
          scaleX: 0.5,
          scaleY: 0.5

        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    const url = URL.createObjectURL(file)
    editor.objects.add({
      src: url,
      type: "StaticVector",
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const _getStickers = async () => {
    const stickers = await api.getStickers(category);
    setVectors(stickers);
    setSpinner(false);
  }

  useEffect(() => {

    _getStickers();
  }, [])

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }
  const getSearchData = () => {
    setSpinner(true);
    _getStickers();

  }

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
            <div style={{ height: "50px" }}><Elements size={40} /></div>
            <div style={{ textAlign: "center" }}>Elements</div>
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
            <div style={{ height: "50px" }}><div style={{ marginTop: "5px" }}><Sticker size={32} /></div></div>
            <div style={{ textAlign: "center" }}>Stickers</div>
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
            <div style={{ textAlign: "center" }}>Logo Maker</div>
          </Block>



        </Block>


      </Block>

      <Block $style={{ padding: "0rem 1.5rem 1rem" }}>

        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          onKeyDown={(key) => key.code === "Enter" && getSearchData()}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search"
          size={"compact"}
          startEnhancer={<Search size={16} />}
        />
      </Block>

      {/* <Block padding="0 1.5rem">
        <Button
          onClick={handleInputFileRefClick}
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
      <Scrollable>
        <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
        <Block>
          <Block $style={{ display: "grid", gap: "8px", padding: "1.5rem", gridTemplateColumns: "1fr 1fr" }}>


            {spinner ?
              <Spinner style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} />
              : <>
                {vectors.map((vector, index) => (
                  <GraphicItem onClick={() => addObject(vector)} key={index} preview={vector} />
                ))}
              </>
            }


          </Block>
        </Block>
      </Scrollable>
    </Block>
  )
}

const GraphicItem = ({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      // onClick={() => onClick(component.layers[0])}
      className={css({
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >
      <div
        className={css({
          backgroundImage: `linear-gradient(to bottom,
          rgba(0, 0, 0, 0) 0,
          rgba(0, 0, 0, 0.006) 8.1%,
          rgba(0, 0, 0, 0.022) 15.5%,
          rgba(0, 0, 0, 0.047) 22.5%,
          rgba(0, 0, 0, 0.079) 29%,
          rgba(0, 0, 0, 0.117) 35.3%,
          rgba(0, 0, 0, 0.158) 41.2%,
          rgba(0, 0, 0, 0.203) 47.1%,
          rgba(0, 0, 0, 0.247) 52.9%,
          rgba(0, 0, 0, 0.292) 58.8%,
          rgba(0, 0, 0, 0.333) 64.7%,
          rgba(0, 0, 0, 0.371) 71%,
          rgba(0, 0, 0, 0.403) 77.5%,
          rgba(0, 0, 0, 0.428) 84.5%,
          rgba(0, 0, 0, 0.444) 91.9%,
          rgba(0, 0, 0, 0.45) 100%)`,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
          height: "100%",
          width: "100%",
          ":hover": {
            opacity: 1,
          },
        })}
      />
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

export default Stickers
