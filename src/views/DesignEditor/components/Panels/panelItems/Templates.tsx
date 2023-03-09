import React, { useEffect, useState } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { loadTemplateFonts } from "~/utils/fonts"
import Scrollable from "~/components/Scrollable"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import { useStyletron } from "baseui"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import { useSelector } from "react-redux"
import { selectPublicDesigns } from "~/store/slices/designs/selectors"
import { IDesign } from "~/interfaces/DesignEditor"
import { IScene } from "@layerhub-io/types"
import { nanoid } from "nanoid"
import api from "~/services/api"
import useEditorType from "~/hooks/useEditorType"
import Search from "baseui/icon/search"
import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { SIZE, Spinner } from "baseui/spinner"
import { Input } from "baseui/input"
import Templates from "~/components/Icons/Templates"
import Customize from "~/components/Icons/Customize"
import useAppContext from "~/hooks/useAppContext"

export default function () {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()


  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const { setCurrentScene, currentScene, setScenes, setCurrentDesign } = useDesignEditorContext()
  const designs = useSelector(selectPublicDesigns)
  const editorType = useEditorType()
  const [category, setCategory] = useState<string>("")
  const [isloading, setIsloading] = React.useState(true)
  const [images, setImages] = useState<IDesign[]>([])



  const loadGraphicTemplate = async (payload: IDesign): Promise<{ scenes: IScene[]; design: IDesign }> => {
    const scenes: IScene[] = []
    const { scenes: scns, ...design } = payload
    //alert(JSON.stringify(scns));
    for (const scn of scns) {
      const scene: IScene = {
        name: scn.name,
        frame: payload.frame,
        id: scn.id || nanoid(),
        layers: scn.layers,
        metadata: {},
      }
      await loadTemplateFonts(scene)

      const preview = (await editor.renderer.render(scene)) as string
      scenes.push({ ...scene, preview })
    }

    return { scenes, design: design as IDesign }
  }

  const loadDesignById = React.useCallback(
    async (designId: string) => {
      if (editor) {
        const design = await api.getPublicDesignById(designId)
        const loadedDesign = await loadGraphicTemplate(design)
        setScenes(loadedDesign.scenes)
        setCurrentScene(loadedDesign.scenes[0])
        setCurrentDesign(loadedDesign.design)
      }
    },
    [editor, currentScene]
  )

  const addObject = React.useCallback(
    (url: string) => {

      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          name: "Template"
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )
  //alert(JSON.stringify(designs));
  const fetchData = async () => {

    const newImages = await api.getPublicDesigns(category)
    setImages(newImages)
    setIsloading(false)
  }
  const makeSearch = () => {
    setImages([])
    setIsloading(true)
    fetchData();

  }
  useEffect(() => {
    if (isloading) {
      fetchData();
    }
  }, [isloading]);


  return (
    <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem 1.5rem 0",
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
              setActiveSubMenu("Templates");
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
            <Templates size={18} />
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Templates</div>
          </Block>


          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Customize");
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
            <Customize size={18} />
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Customize</div>
          </Block>
        </Block>



        {/* <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block> */}
      </Block>

      <Block $style={{ padding: "1.5rem 1.5rem 1rem" }}>
        <Input
          overrides={{
            Root: {
              style: {
                paddingLeft: "8px",
              },
            },
          }}
          onKeyDown={(key) => key.code === "Enter" && makeSearch()}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search"
          size={"compact"}
          startEnhancer={<Search size={16} />}
        />
      </Block>
      <Scrollable>
        <Block
          $style={{
            display: "flex",
            justifyContent: "center",
            paddingY: "2rem",
          }}
        >
          {isloading && <Spinner $size={SIZE.small} />}
        </Block>
        <div style={{ padding: "0 1.5rem" }}>
          <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "1fr 1fr" }}>

            {images
              .filter((d) => d.type === editorType)
              .map((design, index) => {
                return (
                  <ImageItem
                    onClick={() => addObject(design.previews[0].src)}
                    //onClick={() => loadDesignById(design.id)}
                    key={index}
                    preview={`${design.previews[0].src}?tr=w-320`}
                  />
                )
              })}
          </div>
        </div>
      </Scrollable>
    </Block>
  )


}

function ImageItem({ preview, onClick }: { preview: any; onClick?: (option: any) => void }) {
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
      ></div>
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
function dispatch(arg0: { payload: IDesign[]; type: string }) {
  throw new Error("Function not implemented.")
}

