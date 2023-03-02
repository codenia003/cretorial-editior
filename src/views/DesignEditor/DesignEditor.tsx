import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import GraphicEditor from "./GraphicEditor"
import PresentationEditor from "./PresentationEditor"
import VideoEditor from "./VideoEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"
import ContextMenu from "./components/ContextMenu"
import { useLocation } from "react-router-dom"

const DesignEditor = () => {


  if (localStorage.getItem("usersession") == null && window.location.hostname
    == "app.cretorial.ai") {
    window.location.href = "https://app.cretorial.ai/auth/login";
  }
  console.log("CUURENTDOMAIN" + window.location.hostname);


  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>

      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}
      {
        {
          NONE: <SelectEditor />,
          PRESENTATION: <PresentationEditor />,
          VIDEO: <VideoEditor />,
          GRAPHIC: <GraphicEditor />,
        }[editorType]
      }
    </>
  )
}

export default DesignEditor
