import React, { useEffect, useState } from 'react'
import { Col, Container, Progress, Row } from 'reactstrap'
import style from './MediaImage.module.scss'
import { FaTimesCircle } from 'react-icons/fa'
import { MediaImageData } from '@book-store/server/types'
import ImageUploader from './ImageUploader'
import { getImageUrl } from 'src/utils/getImageUrl'

interface Props {
  value: Array<MediaImageData> | MediaImageData
  onChange?(value: Array<MediaImageData> | MediaImageData): void
  multiple?: boolean
  error?: boolean
  maxFiles?: number
  update?: boolean
}

const MediaImage: React.FC<Props> = ({
  value,
  onChange,
  multiple,
  maxFiles,
  error,
}) => {
  const [isUploading, setIsUploading] = useState(false)
  const data = value as Array<MediaImageData>

  useEffect(() => {}, [value])

  const ImagePicker = () =>
    isUploading ? (
      <>
        <div className={style.ImagePicker}>
          <div>
            <Progress value={100} animated striped />
            <p className="mt-2 mb-0">Uploading file</p>
          </div>
        </div>
      </>
    ) : (
      <ImageUploader
        multiple={multiple}
        maxFiles={maxFiles}
        onFinished={onFinishedUpload}
        onFail={onFailUpload}
        onBeginUpload={onBeginUpload}
      />
    )

  const onBeginUpload = () => {
    setIsUploading(true)
  }

  const onFailUpload = () => {
    setIsUploading(false)
  }

  const onFinishedUpload = (item) => {
    setIsUploading(false)
    changeImage(item)
  }

  const changeImage = (item) => {
    if (multiple) {
      onChange([...data, item])
    } else {
      onChange(item)
    }
  }

  const handleDelete = (index: number) => {
    console.log(index)
  }

  const SingleImage = () => {
    const image: any = data[0]

    const HasImage = () => (
      <div className="p-1">
        <div className={style.ImageContainer}>
          <figure
            className={style.Image}
            style={{
              backgroundImage: `url(${getImageUrl(image)})`,
            }}
          />
          <div className={style.ImageOverlay}>
            <span onClick={() => handleDelete(0)}>
              <FaTimesCircle />
            </span>
            <p className="mb-0">{image.name}</p>
          </div>
        </div>
      </div>
    )

    return data.length ? HasImage() : <ImagePicker />
  }

  const MultipleImage = () => {
    const HasImage = () => (
      <Row>
        {data &&
          data.map((item, i) => (
            <Col xs={6} className="p-1" key={i}>
              <div className={style.ImageContainer}>
                <figure
                  className={style.Image}
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                  }}
                />
                <div className={style.ImageOverlay}>
                  <span onClick={() => handleDelete(i)}>
                    <FaTimesCircle />
                  </span>
                  <p className="mb-0">{item.name}</p>
                </div>
              </div>
            </Col>
          ))}

        {maxFiles && data.length === maxFiles ? (
          ''
        ) : (
          <Col xs={6} className="p-1">
            <ImagePicker />
          </Col>
        )}
      </Row>
    )

    return data.length ? HasImage() : <ImagePicker />
  }

  return (
    <div className={error ? style.error : ''}>
      <div className={style.MediaContainer}>
        <Container className={data.length && multiple ? '' : 'px-0'}>
          {multiple ? <MultipleImage /> : <SingleImage />}
        </Container>
      </div>
    </div>
  )
}

MediaImage.defaultProps = {
  multiple: false,
  value: [],
  error: false,
  maxFiles: undefined,
  update: false,
}

export default MediaImage
