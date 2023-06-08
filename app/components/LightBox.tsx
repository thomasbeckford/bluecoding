import Image from 'next/image'

interface LightBoxProps {
  mainSrc: string
  onClose: () => void
  previousImage: () => void
  nextImage: () => void
  hasNext: boolean
  hasPrevious: boolean
}

const LightBox = (props: LightBoxProps) => {
  const { mainSrc, onClose, previousImage, nextImage, hasNext, hasPrevious } =
    props

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-95 flex justify-center items-center">
      <button className="absolute top-0 right-0 m-20" onClick={onClose}>
        Close
      </button>

      {hasPrevious && (
        <button onClick={previousImage} className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-10 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      <Image src={mainSrc} alt="gif" width={500} height={500} unoptimized />

      {hasNext && (
        <button onClick={nextImage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white mx-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default LightBox
