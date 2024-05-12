import { useImagesQuery } from '@/queries/useImages'

const ImageList = () => {
  const { data } = useImagesQuery()

  return (
    <div className="grid grid-cols-2 gap-2 h-[calc(100vh-360px)] overflow-y-auto">
      {data?.map((image) => (
        <div key={image._id}>
          <img
            className="w-full h-36 object-cover"
            src={`http://localhost:4000/static/images/${image.key}`}
            alt={image.originalName}
          />
        </div>
      ))}
    </div>
  )
}

export default ImageList
