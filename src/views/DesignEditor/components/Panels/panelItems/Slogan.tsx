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



const Slogan = () => {
  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()


  useEffect(() => {

  }, [])

  const fetchData = React.useCallback(
    async (reset?: boolean) => {



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
        <Block>Slogan</Block>

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
          placeholder="Slogan"
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

            <div className="logomaker" >Slogan</div>

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


export default Slogan

