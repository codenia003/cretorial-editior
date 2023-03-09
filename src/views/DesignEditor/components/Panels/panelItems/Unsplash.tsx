import React, { useEffect, useState } from "react"
import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
//import { images } from "~/constants/mock-data"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import api from "~/services/api"
import Spinner from "baseui/icon/spinner"
import Search from "~/components/Icons/Search"
import { Input } from "baseui/input"
import { Link } from "react-router-dom"
import Pexels from "~/components/Icons/Pexels"
import Pixabay from "~/components/Icons/Pixabay"
import UnsplashIcons from "~/components/Icons/Unsplash"


import useAppContext from "~/hooks/useAppContext"

const Unsplashs = () => {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [category, setCategory] = useState<string>("")

  const [spinner, setSpinner] = useState(true);
  const [images, setImages] = useState([]);

  const addObject = React.useCallback(
    (url: string) => {
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          name: "Unsplash"
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const _getUnsplash = async () => {
    setSpinner(true);
    const unsplash = await api.getUnsplash(category);
    setImages(unsplash);
    setSpinner(false);
  }
  const getSearchData = () => {

    _getUnsplash();

  }

  useEffect(() => {
    _getUnsplash();
  }, [])

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
              setActiveSubMenu("Unsplash");
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
            <div style={{ height: "50px" }}><UnsplashIcons size={40} /></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Unsplash</div>
          </Block>


          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Pixabay");
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
            <div style={{ height: "50px" }}><div style={{ marginTop: "5px" }}><Pixabay size={32} /></div></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Pixabay</div>
          </Block>

          <Block
            id="EditorPanelList"
            onClick={() => {
              setActiveSubMenu("Pexels");
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
            <div style={{ height: "50px" }}><Pexels size={32} /></div>
            <div style={{ textAlign: "center", fontFamily: 'system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif' }}>Pexels</div>
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



        <Link target="_blank" style={{ color: "#444" }} to="https://unsplash.com/"><div style={{ float: "right", display: "flex" }}><span style={{ marginTop: "10px", fontSize: "12px" }}>Powered By</span> <UnsplashIcons size={32} /></div></Link>

      </Block>
      <Scrollable>
        <Block padding="0 1.5rem">
          <div style={{ display: "grid", gap: "8px", gridTemplateColumns: "1fr 1fr" }}>

            {spinner ?
              <Spinner style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }} />
              : <>
                {images.map((img: any, index) => {
                  return <ImageItem key={index} onClick={() => addObject(img.src.large)} preview={img.src.small} />
                })}
              </>
            }


          </div>
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

export default Unsplashs
