import React from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"
import { captureFrame, loadVideoResource } from "~/utils/video"
import { ILayer } from "@layerhub-io/types"
import { toBase64 } from "~/utils/data"
import api from "~/services/api"
import { Spinner } from "baseui/spinner"

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const [isloading, setIsloading] = React.useState(false)
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const handleDropFiles = async (files: FileList) => {
    setIsloading(true);
    const file = files[0]

    const isVideo = file.type.includes("video")
    const base64 = (await toBase64(file)) as string
    let preview = base64
    var strImage = preview.replace(/^data:image\/[a-z]+;base64,/, "");

    const rmBackground = await api.removeBackground(strImage);
    //alert(JSON.stringify(rmBackground));
    //data:image/jpeg;base64,
    if (isVideo) {
      const video = await loadVideoResource(base64)
      const frame = await captureFrame(video)
      preview = frame
    }

    const type = isVideo ? "StaticVideo" : "StaticImage"

    const upload = {
      id: nanoid(),
      src: rmBackground,
      preview: rmBackground,
      type: type,
    }

    setUploads([...uploads, upload])
    setIsloading(false);
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (props: Partial<ILayer>) => {
    editor.objects.add(props)
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
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
          <Block>Remove Background</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
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
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />


            <Block
              $style={{
                display: "flex",
                justifyContent: "center"
              }}
            >

              <div
                style={{
                  marginTop: "1rem",
                  display: "grid",
                  gap: "0.5rem",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >

                {isloading ? <Spinner /> : <>

                  {uploads.map((upload) => (
                    <div
                      key={upload.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => addImageToCanvas(upload)}
                    >
                      <div>
                        <img width="100%" src={upload.preview ? upload.preview : upload.url} alt="preview" />
                      </div>
                    </div>
                  ))}
                </>}

              </div>
            </Block>


          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}
