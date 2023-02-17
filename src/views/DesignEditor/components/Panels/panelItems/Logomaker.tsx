import React, { createRef, useState, useEffect } from "react"
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
import { useStyletron } from "baseui"
import "../../../../../styles/styles.css";
import { useScreenshot } from 'use-react-screenshot'



const Logomaker = () => {
  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const ref = createRef();
  const [img, takeScreenShot] = useScreenshot();

  const addObject = React.useCallback(
    (refs: any) => {

      takeScreenShot(ref.current);

    },
    [editor]
  )

  useEffect(() => {

  }, [img])

  const fetchData = React.useCallback(
    async (reset?: boolean) => {

      const all: any = [
        { "id": 1, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_1_MS.png", "ref": createRef() },
        { "id": 2, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_2_MS.png", "ref": createRef() },
        { "id": 3, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_3_MS.png", "ref": createRef() },
        { "id": 4, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_4_MS.png", "ref": createRef() },
        { "id": 5, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_5_MS.png", "ref": createRef() },
        { "id": 6, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_6_MS.png", "ref": createRef() },
        { "id": 7, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_7_MS.png", "ref": createRef() },
        { "id": 8, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_8_MS.png", "ref": createRef() },
        { "id": 9, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_9_MS.png", "ref": createRef() },
        { "id": 10, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_10_MS.png", "ref": createRef() },
        { "id": 11, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_11_MS.png", "ref": createRef() },
        { "id": 12, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_12_MS.png", "ref": createRef() },
        { "id": 13, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_13_MS.png", "ref": createRef() },
        { "id": 14, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_14_MS.png", "ref": createRef() },
        { "id": 15, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_15_MS.png", "ref": createRef() },
        { "id": 16, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_16_MS.png", "ref": createRef() },
        { "id": 17, "src": "https://cretorial.ai/cretorial/api/images/PNG/Logo_17_MS.png", "ref": createRef() },

      ];
      setImages(all);
      //setIsloading(false);
      /*setIsloading(true)

      const newImages = await api.getLogoMakerImages({
        query: category || "nature",
        perPage: 12,
        page: pageNumber,
      })

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
      setPageNumber(pageNumber + 1)*/
      //setIsloading(false)*/
    },
    [pageNumber, hasMore, category, images]
  )

  const makeSearch = () => {
    setImages([])
    setPageNumber(1)
    setIsloading(true)
    fetchData(true)
  }
  return (
    <Block flex={1} flexDirection="column" display={"flex"}>
      <Block
        $style={{
          display: "flex",
          alignItems: "center",
          fontWeight: 500,
          justifyContent: "space-between",
          padding: "1.5rem 1.5rem 0",
        }}
      >
        <Block>Logo Maker</Block>

        <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
          <AngleDoubleLeft size={18} />
        </Block>
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
          onBlur={makeSearch}
          value={category}
          onChange={(e) => {

            setImages([]);
            setPageNumber(1);
            setCategory(e.target.value)
          }}
          placeholder="Logo Text"
          size={"compact"}
          startEnhancer={<Search size={16} />}
        />
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>

          {/* <img src={img} alt={'Screenshot'} /> */}

          <Block
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
            }}
          >

            {images.map((image, index) => {
              return (
                <>

                  <div className="logomaker" ref={ref}><GraphicItem ref={image["ref"]} onClick={() => addObject(image["ref"])} key={index} preview={image["src"]} category={category} /></div>
                </>
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
            {/* {isloading && <Spinner $size={SIZE.small} />} */}
          </Block>

        </Block>
      </Scrollable>
    </Block>
  )
}



const GraphicItem = ({ preview, category, onClick, ref }: { preview: any; category: any, ref: any, onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}
      ref={ref}
      // onClick={() => onClick(component.layers[0])}
      className={css({
        position: "relative",
        height: "84px",
        background: "#f8f8fb",
        cursor: "pointer",
        padding: "30px",
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
      <div style={{ textAlign: "center" }}>{category}</div>
    </div>
  )
}

export default Logomaker

