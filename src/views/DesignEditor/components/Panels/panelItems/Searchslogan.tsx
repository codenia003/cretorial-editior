import React, { useState } from "react"
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
import searchText from "~/images/search_text.png";
import { slice } from "lodash"
import toast from "baseui/toast/toast"
import {
  Card,
  StyledBody,
  StyledAction
} from "baseui/card";
import { Button } from "baseui/button"
import { FontItem } from "~/interfaces/common"
import { loadFonts } from "~/utils/fonts"
import { nanoid } from "nanoid"
import Filter from "~/components/Icons/Filter"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './styles.css';
import Delete from "baseui/icon/delete"
import { Fade } from "react-reveal/Fade";

const Searchslogan = () => {

  const editor = useEditor()
  const [hasMore, setHasMore] = React.useState(true)
  const [isChecked, setIsChecked] = React.useState(false)
  const [isFilter, setIsFilter] = React.useState(false)
  const [images, setImages] = useState<IStaticImage[]>([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [isloading, setIsloading] = React.useState(false)
  const [category, setCategory] = useState<string>("")
  const setIsSidebarOpen = useSetIsSidebarOpen()
  const [searchResults, setSearchResults] = useState([]);

  const [tonalityChecked, setTonalityChecked] = useState([]);
  const [wordChecked, setWordChecked] = useState([]);
  const [categoryChecked, setCategoryChecked] = useState([]);

  const [post, setPost] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(10);
  const initialPosts = slice(post, 0, index);
  const [tonality, setTonality] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [words, setWords] = useState([]);

  const addObject = async (text: any) => {
    if (editor) {
      const font: FontItem = {
        name: "OpenSans-Regular",
        url: "https://fonts.gstatic.com/s/opensans/v27/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4nY1M2xLER.ttf",
      }
      await loadFonts([font])
      const options = {
        id: nanoid(),
        type: "StaticText",
        width: 420,
        text: text,
        fontSize: 92,
        fontFamily: font.name,
        textAlign: "center",
        fontStyle: "normal",
        fontURL: font.url,
        fill: "#333333",
        metadata: {},
      }
      editor.objects.add(options)
    }
  }

  const makeSearch = () => {

    setSearchResults([]);
    getCategoryData(category);
  }

  const searchSlogan = async (event: any) => {
    //console.log(event.target.value);
    setCategory(event.target.value);
    const response = await api.searchSlogans(event.target.value);
    let output: any = [];
    for (var i = 0; i < response.length; i++) {
      output.push(response[i]);
    }

    //alert(JSON.stringify(output));
    setSearchResults(output);

  };


  let contextual = false;
  const getCategoryData = async (categoryid: any) => {
    clear();
    setIndex(10);
    setPost([]);
    setIsloading(true);
    // category results
    const response = await api.getCategoryResultFromFrank(
      categoryid,
      0,
      contextual,
      "",
      "",
      "",
      categoryChecked.length > 0 ? categoryChecked.join(",") : ""
    );

    let output: any = [];
    for (var i = 0; i < response.length; i++) {
      output.push(response[i]);
    }

    setPost(output);

    const tonality = await api.tonality();
    const allTonality: any = [];
    for (var i = 0; i < tonality.length; i++) {
      allTonality.push(tonality[i]);
    }

    setTonality(allTonality);

    const category = await api.filterCategory();
    const allFilterCategory: any = [];
    for (var i = 0; i < category.length; i++) {
      allFilterCategory.push(category[i]);
    }
    setFilterCategory(allFilterCategory);

    const allWord: any = [];
    allWord.push({ word_id: "1-5", word_name: "1-5" });
    allWord.push({ word_id: "6-10", word_name: "6-10" });
    allWord.push({ word_id: "11-20", word_name: "11-20" });
    allWord.push({ word_id: "21-30", word_name: "21-30" });
    allWord.push({ word_id: ">30", word_name: ">30" });
    setWords(allWord);

    setIsloading(false);
  };

  const loadMore = () => {
    setIndex(index + 10);
    if (index >= post.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };


  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };


  const handleTonalityCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...tonalityChecked];

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setTonalityChecked(updatedList);
  };
  const handleCategoryCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...categoryChecked];

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setCategoryChecked(updatedList);
  };
  const handleWordCheck = (event: any) => {
    let value: String = event.target.value;
    const updatedList: any = [...wordChecked];

    if (event.target.checked) {
      updatedList.push(value);
    } else {
      updatedList.splice(updatedList.indexOf(value), 1);
    }
    setWordChecked(updatedList);
  };

  const switchFilter = () => {

    if (isChecked) {
      setIsChecked(false)
      contextual = false;
      getCategoryData("");
    } else {
      setIsChecked(true)
      contextual = true;
      getCategoryData("");
    }
  };

  const clear = () => {
    setIsFilter(false);
    setTonalityChecked([]);
    setWordChecked([]);
    setCategoryChecked([]);
    apply();
  };
  const apply = async () => {

    setIndex(10);
    setPost([]);

    setIsFilter(false);
    setIsloading(true);
    const response = await api.getCategoryResultFromFrank(
      category,
      0,
      contextual,
      "",
      tonalityChecked.join(","),
      wordChecked.join(","),
      categoryChecked.length > 0 ? categoryChecked.join(",") : ""
    );
    let output: any = [];
    for (var i = 0; i < response.length; i++) {
      output.push(response[i]);
    }
    setPost(output);
    setIsloading(false);
  };


  return (
    <>


      {
        isFilter ? (<>
          <div>





            <Block
              $style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                justifyContent: "space-between",
                padding: "1.5rem 1.5rem 0",
              }}
            >
              <Block>Filters</Block>

              <Block style={{ display: "flex" }}>
                {category != "" ? (<div style={{ cursor: "pointer", display: "flex", padding: "5px" }} onClick={() => setIsFilter(false)} ><Delete size={24} /></div>) : (<></>)}
                <div style={{ cursor: "pointer", display: "flex", padding: "5px" }} onClick={() => setIsSidebarOpen(false)} ><AngleDoubleLeft size={18} /></div>
              </Block>
            </Block>



            <Tabs>
              <TabList>
                <Tab>
                  <p>Tonality</p>
                </Tab>
                <Tab>
                  <p>Category</p>
                </Tab>
                <Tab>
                  <p>Words</p>
                </Tab>

              </TabList>

              <TabPanel>
                <div className="panel-content" style={{
                  textAlign: "left",
                  paddingLeft: "16px",
                  maxHeight: "400px",
                  overflowY: "scroll"
                }}>

                  {tonality.map((item, index) => (
                    <div className="form-check">
                      <input
                        checked={
                          tonalityChecked.includes(item["name"])
                            ? true
                            : false
                        }
                        onClick={handleTonalityCheck}
                        type="checkbox"
                        className="form-check-input"
                        value={item["name"]}
                        id={`task-${item["name"]}`}
                      />{" "}
                      {item["name"]}
                    </div>
                  ))}

                </div>
              </TabPanel>
              <TabPanel>
                <div className="panel-content" style={{
                  textAlign: "left",
                  paddingLeft: "16px",
                  maxHeight: "400px",
                  overflowY: "scroll"
                }}>


                  {filterCategory.map((item, index) => (
                    <div className="form-check">
                      <input
                        checked={
                          categoryChecked.includes(
                            item["categoryName"]
                          )
                            ? true
                            : false
                        }
                        onClick={handleCategoryCheck}
                        type="checkbox"
                        className="form-check-input"
                        value={item["categoryName"]}
                        id={`task-${item["categoryName"]}`}
                      />
                      {item["categoryName"]}
                    </div>
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="panel-content" style={{
                  textAlign: "left",
                  paddingLeft: "16px"
                }}>

                  {words.map((item, index) => (
                    <div className="form-check">
                      <input
                        checked={
                          wordChecked.includes(item["word_id"])
                            ? true
                            : false
                        }
                        onClick={handleWordCheck}
                        type="checkbox"
                        className="form-check-input"
                        value={item["word_id"]}
                        id={`task-${item["word_name"]}`}
                      />
                      {item["word_name"]}
                    </div>
                  ))}
                </div>
              </TabPanel>

            </Tabs>

            <Block
              $style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                justifyContent: "space-between",
                padding: "16px",
              }}
            >
              <Button style={{ width: "35%", height: "30px" }} onClick={() => apply()}>Apply</Button>


              <Button style={{ width: "35%", height: "30px" }} onClick={() => clear()}>Clear</Button>


            </Block>

          </div>
        </>) : (<Block flex={1} flexDirection="column" display={"flex"}>


          <Block
            $style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #ddd"
            }}
          >
            <Block>Search Text</Block>



            <Block style={{ display: "flex" }}>

              <div style={{ cursor: "pointer", display: "flex", padding: "5px" }} onClick={() => setIsSidebarOpen(false)} ><AngleDoubleLeft size={18} /></div>
            </Block>
          </Block>


          {category != "" && searchResults.length == 0 ? (<Block
            $style={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              justifyContent: "space-between",
              padding: "1.5rem 1.5rem 0",
            }}
          >
            <Block>Keyword Match</Block>
            <Block style={{ display: "flex" }}>

              <label className="switch">
                <input type="checkbox" value={isChecked ? "true" : "false"} onChange={() => switchFilter()} />
                <div className="slider"></div>
              </label>

              <div style={{ cursor: "pointer", display: "flex", padding: "0px 5px" }} onClick={() => setIsFilter(true)} ><Filter size={24} /></div>

            </Block>
          </Block>) : (<></>)}




          <Block $style={{ padding: "1.5rem 1.5rem 1rem" }}>

            <Input
              overrides={{
                Root: {
                  style: {
                    paddingLeft: "1px",
                  },
                },
              }}
              onKeyDown={(key) => key.code === "Enter" && makeSearch()}
              onChange={(e) => searchSlogan(e)}
              placeholder="Search expression and slogans"
              size={"compact"}
              value={category}
              startEnhancer={<Search size={16} />}
            />
          </Block>

          {category != '' ? <Block $style={{ border: searchResults.length > 0 ? "1px solid #ddd" : "0px solid #ddd", margin: searchResults.length > 0 ? "16px" : "0px" }}>
            {searchResults.map(item => {
              return <Block $style={{ cursor: "pointer", padding: "10px" }}>
                <div onClick={makeSearch}>{item}</div>
              </Block>;
            })}
          </Block> : (<img src="https://cretorial.ai/cretorial/images/search_text.png" style={{ width: "250px" }} />)
          }




          <Scrollable>
            <Block padding={"0 1.5rem"}>

              <Block
                $style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingY: "2rem",
                }}
              >
                <ul style={{ padding: "0px" }}>
                  {initialPosts.map((item, key) => {
                    let text: string = item["Quote"];
                    let newText =
                      text != null ? text.split("\n").join(" ") : "";

                    return <li style={{ listStyle: "none", padding: "10px 0px" }}> <Card>
                      <StyledBody>
                        <div style={{ fontSize: "14px" }}>{newText}</div>
                      </StyledBody>

                      <Button type="button" onClick={() => addObject(newText)} style={{
                        background: 'rgba(102, 102, 102, 0.75)', borderRadius: '5px', fontFamily: 'Poppins', fontStyle: 'normal', fontWeight: '500', fontSize: '15px', display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        padding: '8px 6px',
                        gap: '2px',
                        width: '150px',
                        height: '38px',


                      }}> Add To Canvas

                      </Button>
                    </Card></li>

                  })}
                </ul>
              </Block>

              <Block
                $style={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {isloading && <Spinner $size={SIZE.small} />}
              </Block>


            </Block>
          </Scrollable>





        </Block >)
      }

    </>
  )
}


export default Searchslogan

