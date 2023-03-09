import React, { useEffect, useState } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import Scrollable from "~/components/Scrollable"
import InfiniteScrolling from "~/components/InfiniteScrolling"
import { IStaticImage } from "@layerhub-io/types"
import Search from "~/components/Icons/Search"
import { Input } from "baseui/input"
import LazyLoadImage from "~/components/LazyLoadImage"
import { SIZE, Spinner } from "baseui/spinner"
import api from "~/services/api"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import PixabayIcons from "~/components/Icons/PixabayIcons"
import { Link } from "react-router-dom"

import Pexels from "~/components/Icons/Pexels"
import PixabayI from "~/components/Icons/Pixabay"
import UnsplashIcons from "~/components/Icons/Unsplash"
import useAppContext from "~/hooks/useAppContext"
import { useStyletron } from "baseui"

const Pixabay = () => {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()

  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState<IStaticImage[]>([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const addObject = React.useCallback(
    (url: string) => {
      console.log(url);
      if (editor) {
        const options = {
          type: "StaticImage",
          src: url,
          name: "Pixabay"
        }
        editor.objects.add(options)
      }
    },
    [editor]
  )

  const fetchData = React.useCallback(
    async (reset?: boolean) => {
      setIsloading(true)

      const newImages = await api.getPixabayImages(category);

      if (newImages.length === 0) {
        setHasMore(false)
        setIsloading(false)
        return
      }

      let all = [...images, ...newImages]
      // Set only new images if reset = true. It should be useful for new queries
      if (reset) {
        all = newImages
      }
      // @ts-ignore
      setImages(all)
      setPageNumber(pageNumber + 1)
      setIsloading(false)
    },
    [pageNumber, hasMore, category, images]
  )

  const makeSearch = () => {
    setImages([])
    setPageNumber(1)
    setIsloading(true)
    fetchData(true)
  }
  useEffect(() => {
    if (isloading) {
      fetchData();
    }
  }, [isloading]);

  return (
    <Block flex={1} flexDirection="column" display={"flex"}>
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
            <div style={{ height: "50px" }}><UnsplashIcons size={40} /></div>
            <div style={{ textAlign: "center" }}>Unsplash</div>
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
            <div style={{ height: "50px" }}><div style={{ marginTop: "5px" }}><PixabayI size={32} /></div></div>
            <div style={{ textAlign: "center" }}>Pixabay</div>
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
            <div style={{ textAlign: "center" }}>Pexels</div>
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
          onKeyDown={(key) => key.code === "Enter" && makeSearch()}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Search"
          size={"compact"}
          startEnhancer={<Search size={16} />}
        />



        <Link target="_blank" style={{ color: "#444" }} to="https://pixabay.com/"><div style={{ float: "right", display: "flex" }}><span style={{ fontSize: "12px", marginTop: "5px", paddingRight: "10px" }}>Powered By </span> <PixabayI size={30} /></div></Link>

      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>

          <Block
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >
            {images.map((image) => {
              return (
                <Block
                  $style={{ cursor: "pointer", borderRadius: "10px", overflow: "hidden" }}
                  onClick={() => addObject(image.src)}
                  key={image.id}
                >
                  <LazyLoadImage url={image.src} />
                </Block>
              )
            })}
          </Block>
          <Block
            $style={{
              display: "flex",
              justifyContent: "center",
              paddingY: "2rem",
            }}
          >
            {isloading && <Spinner $size={SIZE.small} />}
          </Block>

        </Block>
      </Scrollable>
    </Block>
  )
}

export default Pixabay