import React, { createRef, useState, useEffect } from "react"
import { useEditor } from "@layerhub-io/react"
import { Block } from "baseui/block"
import { FormControl } from "baseui/form-control";
import { Textarea } from "baseui/textarea";
import { Select, Value } from "baseui/select";
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
import copy_text from '../../../../../images/copy.svg';

import { Alert } from 'baseui/icon';
import { Button } from 'baseui/button';
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";


function Negative() {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.sizing.scale500,
        color: theme.colors.negative400,

      })}
    >
      <Alert size="18px" />
    </div>
  );
}

const Slogan = () => {
  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [images, setImages] = useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(true)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [value, setValue] = React.useState("");
  const [selectValue, setSelectValue] = React.useState<Value>([]);
  const [isSubmitting, setIsLoading] = useState(false);

  const [searchData, setsearchData] = useState<any>(null);
  const [postData, setData] = useState({
    userid: "",
    similar: "",
    keyword: "",
    topic: "",
    title: "",
    product: "",
    brand: "",
    words: "",
    desc: "",
    count: "",
    tone: "professional",
  });

  useEffect(() => {

  }, [])

  const fetchData = React.useCallback(
    async (reset?: boolean) => {
    },
    [pageNumber, hasMore, category, images]
  )

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setsearchData(null);
    postData.desc = value;
    postData.tone = selectValue[0].id as string;
    const searchData = postData;
    console.log(searchData);
    const data = await api.contentPost('sloganskykeywords', { searchData });
    const res = data?.map(function (val: any) {
      return val;
    }).join("\r\n");
    setsearchData(res);
    setIsLoading(false);

    // console.log(res);
  };

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
        <form onSubmit={handleSubmit}>
          <FormControl label={() => "What do you want a slogan on?"}>
            <Textarea
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="eg. Slogans for a women's apparel brand that deals in high-end styles."

              required
            />
          </FormControl>

          <FormControl label={() => "Tone"}>
            <Select
              options={[
                { label: "Professional", id: "professional" },
                { label: "Excited", id: "excited" },
                { label: "Encouraging", id: "encouraging" },
                { label: "Funny", id: "funny" },
                { label: "Dramatic", id: "dramatic" },
                { label: "Sarcastic", id: "sarcastic" },
                { label: "Engaging", id: "engaging" },
                { label: "Creative", id: "creative" },
                { label: "Persusasive", id: "persusasive" },
                { label: "Thoughtful", id: "thoughtful" },
                { label: "Persuasive", id: "persuasive" }
              ]}
              value={selectValue}
              placeholder="Select Tone"
              onChange={({ value }) => setSelectValue(value)}
              required
            />
          </FormControl>
          <Button type="submit" disabled={isSubmitting} style={{
            background: 'linear-gradient(54.96deg, #3A35CB -37.27%, #9277FF 124.46%)', borderRadius: '5px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '10px 20px',
            gap: '10px',
            width: '82px',
            height: '38px'
          }}>
            {isSubmitting ?
              <Spinner $size={SIZE.small} />
              : 'Create'}
          </Button>
        </form>
      </Block>
      <Scrollable>
        <Block padding={"0 1.5rem"}>
          <Block
            $style={{
              display: "flex",
              justifyContent: "center",
              paddingY: "2rem",
            }}
          >
            {searchData === null ? (
              ""
            ) : (
              <Card>
                <StyledBody>
                  {searchData}
                </StyledBody>

                <Button type="button" style={{
                  background: 'rgba(102, 102, 102, 0.75)', borderRadius: '5px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '500', fontSize: '16px', display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  padding: '8px 6px',
                  gap: '2px',
                  width: '150px',
                  height: '38px'
                }}> <img src={copy_text} style={{ marginTop: '1px', height: '19px' }} />Add To Canvas

                </Button>
              </Card>
            )}
            {/* <div className="logomaker" >Slogan</div> */}
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