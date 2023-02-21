import axios, { AxiosInstance } from "axios"
import { IDesign, IComponent } from "~/interfaces/DesignEditor"
import { Resource } from "~/interfaces/editor"

type IElement = any
type IFontFamily = any
type IUpload = any
type Template = any

class ApiService {
  base: AxiosInstance
  constructor() {
    this.base = axios.create({
      baseURL: "https://cretorial.ai",
      withCredentials: true,
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      }
    })
  }

  signin(props: any) {
  
    return new Promise((resolve, reject) => {
      this.base
        .post("/auth/signin", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  // UPLOADS
  getSignedURLForUpload(props: { name: string }): Promise<{ url: string }> {
   
    return new Promise((resolve, reject) => {
      this.base
        .post("/uploads", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  updateUploadFile(props: { name: string }): Promise<any> {
    
    return new Promise((resolve, reject) => {
      this.base
        .put("/uploads", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  getUploads(): Promise<IUpload[]> {
   
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/uploads")
        resolve(data.data)
      } catch (err) {
        reject(err)
      }
    })
  }

  deleteUpload(id: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.base.delete(`/uploads/${id}`)
        resolve(response)
      } catch (err) {
        reject(err)
      }
    })
  }

  // TEMPLATES

  createTemplate(props: Partial<Template>): Promise<Template> {

    return new Promise((resolve, reject) => {
      this.base
        .post("/templates", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  createComponent(props: Partial<any>): Promise<any> {

    return new Promise((resolve, reject) => {
      this.base
        .post("/components", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  getComponents(): Promise<any[]> {
   
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/components")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getComponentById(id: string): Promise<IComponent> {
  
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/components/${id}`)
        resolve(data.component)
      } catch (err) {
        reject(err)
      }
    })
  }

  getPublicComponents(): Promise<IComponent[]> {

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/components/published")
        resolve(data.components)
      } catch (err) {
        reject(err)
      }
    })
  }

  deleteTemplate(id: string): Promise<Template> {

    return new Promise((resolve, reject) => {
      this.base
        .delete(`/templates/${id}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  deleteComponent(id: string): Promise<Template> {
   
    return new Promise((resolve, reject) => {
      this.base
        .delete(`/components/${id}`)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  downloadTemplate(props: Partial<Template>): Promise<{ source: string }> {
   
    return new Promise((resolve, reject) => {
      this.base
        .post("/templates/download", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  getPublicDesigns(category: any): Promise<IDesign[]> {

    return new Promise(async (resolve, reject) => {
      try {
        //alert(`https://www.cretorial.ai/cretorial/api/editor/template.php?search=`+category);
        const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/template.php?search=`+category, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
    
        resolve(data.templates)
      } catch (err) {
        reject(err)
      }
    })
  }

  getStickers(search: any): Promise<any> {

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/stickers.php?search=`+search, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        resolve(data.stickers)
      } catch (err) {
        reject(err)
      }
    })
  }
  
  getUnsplash(search: any): Promise<any> {

    return new Promise(async (resolve, reject) => {
      try {
       //alert(`https://www.cretorial.ai/cretorial/api/editor/unsplash.php?search=`+search);
        const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/unsplash.php?search=`+search, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        resolve(data.unsplash)
      } catch (err) {
        reject(err)
      }
    })
  }

  getPublicDesignById(id: string): Promise<IDesign> {

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/template.php?id=`+id, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        resolve(data.template)
      } catch (err) {
        reject(err)
      }
    })
  }

  //CREATIONS

  createCreation(props: Partial<Template>): Promise<Template> {
   
    return new Promise((resolve, reject) => {
      this.base
        .post("/creations", props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  getCreations(): Promise<any[]> {

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/creations")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  getCreationById(id: string): Promise<any> {

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get(`/creations/${id}`)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateCreation(id: string, props: Partial<Template>): Promise<Template> {

    return new Promise((resolve, reject) => {
      this.base
        .put(`/creations/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  // ELEMENTS
  getElements(): Promise<IElement[]> {

    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.base.get("/elements")
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
  updateTemplate(id: string, props: Partial<Template>): Promise<Template> {

    return new Promise((resolve, reject) => {
      this.base
        .put(`/templates/${id}`, props)
        .then(({ data }) => {
          resolve(data)
        })
        .catch((err) => reject(err))
    })
  }

  // FONTS
  getFonts(): Promise<IFontFamily[]> {
    
  
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://www.cretorial.ai/cretorial/api/editor/fonts.php`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
      
        resolve(data.fonts) 
      } catch (err) {
        reject(err)
      }
    })
  }

  getPixabayImages = (text:any): Promise<Resource[]> => {
   
    return new Promise(async (resolve, reject) => {
      
      try {
      
        const response = await fetch(`https://cretorial.ai/cretorial/api/editor/getpixabay.php?text=${text}&per_page=100&type=search`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();

        //https://cretorial.ai/cretorial/api/editor/getpixabay.php

        resolve(data.images)
      } catch (err) {
        reject(err)
      }
    })
  }
  getPexelsImages = (text:any): Promise<Resource[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        if(text != ""){
          const response = await fetch(`https://cretorial.ai/cretorial/api/editor/pexels.php?text=${text}&per_page=100&type=search`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        resolve(data.images)
        }else{  
          const response = await fetch(`https://cretorial.ai/cretorial/api/editor/pexels.php?text=${text}&per_page=100&type=search1`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        resolve(data.images)
        }
        
        
      } catch (err) {
        reject(err)
      }
    })
  }

  getLogoMakerImages = (props: { query: string; perPage: number; page: number }): Promise<Resource[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://cretorial.ai/cretorial/api/editor/logomaker.php`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }

  contentPost = (postName:any, {searchData}: any): Promise<Resource[]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://casaahaanahotels.com/` + `${postName}`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(searchData),
        });
        const data = await response.json();
        resolve(data.result)
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default new ApiService()
