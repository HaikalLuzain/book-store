import { MediaImageData } from '@book-store/server/types'
import React, { Fragment, useRef, useState } from 'react'
import { FaImage } from 'react-icons/fa'
// import { Api } from 'src/config/Api'
import { storage } from 'src/utils/firebaseUpload'
import style from './MediaImage.module.scss'
import uuid from 'uuid'
import path from 'path'

interface Props {
  onBeginUpload?(): void
  onFinished?(value: MediaImageData): void
  onFail?(e: Error): void
  multiple?: boolean
  maxFiles?: number
}

const ImageUploader: React.FC<Props> = ({
  children,
  onBeginUpload,
  onFinished,
  onFail,
  multiple,
  maxFiles,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const file = useRef<HTMLInputElement>(null)

  // const handleHighlight = (e: React.DragEvent) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }

  const handleFiles = async (files: FileList) => {
    Array.from(files).forEach(async (file) => {
      if (/image\/[png|jpg|jpeg]/.test(file.type)) {
        if (file.size / 1024 > 2048) {
          alert('Ukuran File terlalu besar')
          return
        }

        try {
          if (typeof onBeginUpload === 'function') onBeginUpload()
          setIsLoading(true)
          // const form = new FormData()
          // form.append('file', file)
          // const { data } = await Api().post('/media', form)
          const _id = uuid.v4()
          const filename = _id + path.extname(file.name)

          await storage.ref(`media/${filename}`).put(file)

          const getImgUrl = await storage
            .ref('media')
            .child(filename)
            .getDownloadURL()

          if (typeof onFinished === 'function')
            onFinished({
              _id: _id,
              image: getImgUrl,
            })
        } catch (error) {
          alert('Upload file tidak berhasil')
          if (typeof onFail === 'function') onFail(error)
        }

        setIsLoading(false)
        return
      }
      alert('Jenis file ini tidak didukung')
    })
  }

  // const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  //   const { files } = e.dataTransfer
  //   let firstFiles: any = []

  //   firstFiles = [files[0]]

  //   if (multiple) {
  //     if (maxFiles !== undefined) {
  //       let d = []
  //       let max =
  //         maxFiles - images.length < files.length
  //           ? maxFiles - images.length
  //           : files.length
  //       for (let i = 0; i < max; i++) {
  //         d[i] = files[i]
  //       }
  //       handleFiles(d as any)
  //       return
  //     }
  //     handleFiles(files)
  //     return
  //   }

  //   handleFiles(firstFiles)
  //   return
  // }

  const onChangeInput = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { validity, files } = target

    if (validity && files.length > 0) {
      handleFiles(files)
    }
  }

  return (
    <Fragment>
      <input
        type="file"
        onChange={onChangeInput}
        accept="image/png,image/jpeg"
        ref={file}
        className="d-none"
        disabled={isLoading}
        {...props}
      />
      <div
        className={style.ImagePicker}
        // style={images.length ? { background: '#e9ecef' } : {}}
        onClick={() => file.current.click()}
        // onDragEnter={handleHighlight}
        // onDragOver={handleHighlight}
        // onDragLeave={handleHighlight}
        // onDrop={handleDrop}
      >
        <div>
          <FaImage size="25" />
          <p className="mb-0 mt-1">Click to add or drop the file here</p>
        </div>
      </div>
    </Fragment>
  )
}

export default ImageUploader
