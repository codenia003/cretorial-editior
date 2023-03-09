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
import { useScreenshot, createFileName } from 'use-react-screenshot'
import useDynamicRefs from 'use-dynamic-refs';
import html2canvas from "html2canvas"
import * as htmlToImage from 'html-to-image';
import useAppContext from "~/hooks/useAppContext"
import Logomakers from "~/components/Icons/Logomaker"
import Stickers from "~/components/Icons/Stickers"
import Elements from "~/components/Icons/Elements"

const Logomaker = () => {
  const { setActiveSubMenu } = useAppContext()
  const [css, theme] = useStyletron()

  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [getRef, setRef] = useDynamicRefs();

  const [img, takeScreenShot] = useScreenshot();

  const exportAsImage = async (element: any, imageFileName: any) => {
    html2canvas(element, { allowTaint: true, useCORS: true, backgroundColor: null, logging: true })
      .then(function (canvas) {
        let image = canvas.toDataURL("image/png", 1);

        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName("png", "logo");
        a.click();
      })
      .catch((e) => {

        console.log(e);
      });
  };

  const addObject = React.useCallback(
    (id: any) => {
      exportAsImage(getRef(id).current, "test");
    },
    [editor]
  )

  useEffect(() => {

  }, [img])

  const fetchData = React.useCallback(
    async (reset?: boolean) => {

      const all: any = [
        { "id": 1, "src": "https://text-stock.com/static/logomaker/PNG/Logo_1_MS.png", "color": "red", "family": "italic" },
        { "id": 2, "src": "https://text-stock.com/static/logomaker/PNG/Logo_2_MS.png", "color": "green", "family": "normal" },
        { "id": 3, "src": "https://text-stock.com/static/logomaker/PNG/Logo_3_MS.png", "color": "blue", "family": "italic" },
        { "id": 4, "src": "https://text-stock.com/static/logomaker/PNG/Logo_4_MS.png", "color": "orange", "family": "normal" },
        { "id": 5, "src": "https://text-stock.com/static/logomaker/PNG/Logo_5_MS.png", "color": "red", "family": "italic" },
        { "id": 6, "src": "https://text-stock.com/static/logomaker/PNG/Logo_6_MS.png", "color": "green", "family": "normal" },
        { "id": 7, "src": "https://text-stock.com/static/logomaker/PNG/Logo_7_MS.png", "color": "blue", "family": "italic" },
        { "id": 8, "src": "https://text-stock.com/static/logomaker/PNG/Logo_8_MS.png", "color": "orange", "family": "normal" },
        { "id": 9, "src": "https://text-stock.com/static/logomaker/PNG/Logo_9_MS.png", "color": "red", "family": "italic" },
        { "id": 10, "src": "https://text-stock.com/static/logomaker/PNG/Logo_10_MS.png", "color": "green", "family": "normal" },
        { "id": 11, "src": "https://text-stock.com/static/logomaker/PNG/Logo_11_MS.png", "color": "orange", "family": "italic" },
        { "id": 12, "src": "https://text-stock.com/static/logomaker/PNG/Logo_12_MS.png", "color": "blue", "family": "normal" },
        { "id": 13, "src": "https://text-stock.com/static/logomaker/PNG/Logo_13_MS.png", "color": "red", "family": "italic" },
        { "id": 14, "src": "https://text-stock.com/static/logomaker/PNG/Logo_14_MS.png", "color": "orange", "family": "normal" },
        { "id": 15, "src": "https://text-stock.com/static/logomaker/PNG/Logo_15_MS.png", "color": "blue", "family": "italic" },
        { "id": 16, "src": "https://text-stock.com/static/logomaker/PNG/Logo_16_MS.png", "color": "red", "family": "normal" },
        { "id": 17, "src": "https://text-stock.com/static/logomaker/PNG/Logo_17_MS.png", "color": "orange", "family": "italic" },
        { "id": 18, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_1_MS.png", "color": "red", "family": "italic" },
        { "id": 19, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_2_MS.png", "color": "green", "family": "normal" },
        { "id": 20, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_3_MS.png", "color": "blue", "family": "italic" },
        { "id": 21, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_4_MS.png", "color": "orange", "family": "normal" },
        { "id": 22, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_5_MS.png", "color": "red", "family": "italic" },
        { "id": 23, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_6_MS.png", "color": "green", "family": "normal" },
        { "id": 24, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_7_MS.png", "color": "blue", "family": "italic" },
        { "id": 25, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_8_MS.png", "color": "orange", "family": "normal" },
        { "id": 26, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_9_MS.png", "color": "red", "family": "italic" },
        { "id": 27, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_10_MS.png", "color": "green", "family": "normal" },
        { "id": 28, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_11_MS.png", "color": "orange", "family": "italic" },
        { "id": 29, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_12_MS.png", "color": "blue", "family": "normal" },
        { "id": 30, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_13_MS.png", "color": "red", "family": "italic" },
        { "id": 31, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_14_MS.png", "color": "orange", "family": "normal" },
        { "id": 32, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_15_MS.png", "color": "blue", "family": "italic" },
        { "id": 33, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_16_MS.png", "color": "red", "family": "normal" },
        { "id": 34, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_17_MS.png", "color": "orange", "family": "italic" },
        { "id": 34, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_18_MS.png", "color": "blue", "family": "italic" },
        { "id": 35, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_19_MS.png", "color": "red", "family": "normal" },
        { "id": 36, "src": "https://text-stock.com/static/logomaker/PNG2/FoodLogo_20_MS.png", "color": "orange", "family": "italic" },
        { "id": 37, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_1_MS.png", "color": "blue", "family": "normal" },
        { "id": 38, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_2_MS.png", "color": "red", "family": "italic" },
        { "id": 39, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_3_MS.png", "color": "orange", "family": "normal" },
        { "id": 40, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_4_MS.png", "color": "blue", "family": "italic" },
        { "id": 41, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_5_MS.png", "color": "red", "family": "normal" },
        { "id": 42, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_6_MS.png", "color": "orange", "family": "italic" },
        { "id": 43, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_7_MS.png", "color": "blue", "family": "italic" },
        { "id": 44, "src": "https://text-stock.com/static/logomaker/PNG3/TravelLogo_8_MS.png", "color": "red", "family": "normal" },
        { "id": 45, "src": "https://text-stock.com/static/logomaker/PNG4/BeautyLogo_1_MS.png", "color": "red", "family": "italic" }

      ];

      setImages(all);

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
            <div style={{ height: "50px" }}><Logomakers size={32} /></div>
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

                  <div className="logomaker" ref={setRef(image["id"])} ><GraphicItem onClick={() => addObject(image["id"])} key={index} preview={image["src"]} category={category} color={image["color"]} family={image["family"]} /></div>
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



const GraphicItem = ({ preview, category, onClick, color, family }: { preview: any; category: any, color: any, family: any, onClick?: (option: any) => void }) => {
  const [css] = useStyletron()
  return (
    <div
      onClick={onClick}

      // onClick={() => onClick(component.layers[0])}
      className={css({
        //position: "relative",
        //height: "84px",
        //background: "#f8f8fb",
        cursor: "pointer",
        padding: "16px",
        //borderRadius: "8px",
        overflow: "hidden",
        "::before:hover": {
          opacity: 1,
        },
      })}
    >

      <img
        src={preview}
        //src="https://images.pexels.com/photos/15436366/pexels-photo-15436366.jpeg?auto=compress&cs=tinysrgb&h=350"
        className={css({
          width: "100%",
          //height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          verticalAlign: "middle",
        })}
      />
      <div style={{ textAlign: "center", 'color': color, 'fontStyle': family, 'fontSize': '18px' }}>{category}</div>
    </div>
  )
}

export default Logomaker

