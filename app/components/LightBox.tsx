import Image from 'next/image'
import { useEffect } from 'react'

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

  const onClickOutside = (e: MouseEvent) => {
    if ((e.target as HTMLElement).id === 'lightbox') {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', onClickOutside)
    return () => {
      document.removeEventListener('click', onClickOutside)
    }
  }, [])

  return (
    <div
      id="lightbox"
      className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-95 flex justify-center items-center "
    >
      <div className="bg-gray-900 flex py-20 rounded-lg">
        <button onClick={previousImage} disabled={!hasPrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 p-4 text-white mx-10 bg-gray-800 rounded-full transition-all hover:bg-gray-700 ${
              hasPrevious ? 'block' : 'invisible transition-none'
            }`}
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

        <Image src={mainSrc} alt="gif" width={500} height={500} unoptimized />

        <button onClick={nextImage} disabled={!hasNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 p-4 text-white mx-10 bg-gray-800 rounded-full transition-all hover:bg-gray-700 ${
              hasNext ? 'block' : 'invisible transition-none'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default LightBox
