interface LightBoxItem {
  imageUrl: string
  index: number
  hasPrevious: boolean
  hasNext: boolean
}

interface LightBoxHookProps {
  selectedItem: LightBoxItem
  setSelectedItem: React.Dispatch<React.SetStateAction<LightBoxItem>>
  data: any
}

const useLightBox = (props: LightBoxHookProps) => {
  const { selectedItem, setSelectedItem, data } = props

  const handlePreviousImage = () => {
    if (selectedItem.index === 0) {
      setSelectedItem((prevSelectedItem) => ({
        ...prevSelectedItem,
        hasPrevious: false,
        hasNext: true,
      }))
      return
    }
    setSelectedItem((prevSelectedItem) => ({
      ...prevSelectedItem,
      imageUrl: data[prevSelectedItem.index - 1].images.downsized.url,
      index: prevSelectedItem.index - 1,
      hasPrevious: true,
      hasNext: true,
    }))
  }

  const handleNextImage = () => {
    if (selectedItem.index === data.length - 1) {
      setSelectedItem((prevSelectedItem) => ({
        ...prevSelectedItem,
        hasNext: false,
        hasPrevious: true,
      }))
      return
    }
    setSelectedItem((prevSelectedItem) => ({
      ...prevSelectedItem,
      imageUrl: data[prevSelectedItem.index + 1].images.downsized.url,
      index: prevSelectedItem.index + 1,
      hasNext: true,
      hasPrevious: true,
    }))
  }

  return {
    handlePreviousImage,
    handleNextImage,
  }
}

export default useLightBox
