interface LightBoxItem {
  imageUrl: string
  index: number
  hasPrevious: boolean
  hasNext: boolean
}

interface LightBoxHookProps {
  setSelectedItem: React.Dispatch<React.SetStateAction<LightBoxItem>>
  data: any
}

const useLightBox = (props: LightBoxHookProps) => {
  const { setSelectedItem, data } = props

  const handlePreviousImage = () => {
    setSelectedItem((prevSelectedItem) => {
      const newIndex = prevSelectedItem.index - 1

      return {
        ...prevSelectedItem,
        imageUrl: data[newIndex].images.downsized.url,
        index: newIndex,
        hasNext: newIndex < data.length - 1,
        hasPrevious: newIndex > 0,
      }
    })
  }

  const handleNextImage = () => {
    setSelectedItem((prevSelectedItem) => {
      const newIndex = prevSelectedItem.index + 1

      return {
        ...prevSelectedItem,
        imageUrl: data[newIndex].images.downsized.url,
        index: newIndex,
        hasNext: newIndex < data.length - 1,
        hasPrevious: newIndex > 0,
      }
    })
  }

  return {
    handlePreviousImage,
    handleNextImage,
  }
}

export default useLightBox
