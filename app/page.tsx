'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import LightBox from './components/LightBox'
import DebouncedInput from './components/DebouncedInput'
import Spinner from './components/Spinner'
import useLightBox from './hooks/useLightBox'

interface SelectedItem {
  imageUrl: string
  index: number
  hasNext: boolean
  hasPrevious: boolean
}

export default function Home() {
  const [queryString, setQueryString] = useState<string>('')
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<SelectedItem>({
    imageUrl: '',
    index: 0,
    hasNext: true,
    hasPrevious: true,
  })
  const { handlePreviousImage, handleNextImage } = useLightBox({
    selectedItem,
    setSelectedItem,
    data,
  })

  useEffect(() => {
    const fetchData = async (queryString: string) => {
      setLoading(true)
      try {
        const data = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_API_KEY}&q=${queryString}`
        )
        const res = await data.json()
        setData(res.data)
        setLoading(false)
      } catch (e) {
        console.error("Can't fetch data", e)
        setLoading(false)
      }
    }
    if (!queryString) return
    fetchData(queryString)
  }, [queryString])

  const handleChange = (string: string) => setQueryString(string)

  const handleOpenLightBox = (item: any, index: number) => {
    setIsOpen(true)
    setSelectedItem({
      imageUrl: item.images.downsized.url,
      index,
      hasNext: true,
      hasPrevious: true,
    })
  }

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="">Blue Coding Excersise</h1>

      <form>
        <div className="text-sm font-bold text-white tracking-wide">
          Search gifs
        </div>
        <DebouncedInput onChange={handleChange} delay={1000} />
      </form>

      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-10 gap-3">
            {data?.map((item, index) => (
              <div key={item.name}>
                <Image
                  width={100}
                  height={100}
                  src={item.images.downsized.url}
                  alt="gif"
                  unoptimized
                  className="cursor-pointer transition-all hover:opacity-70 rounded-md"
                  onClick={() => handleOpenLightBox(item, index)}
                />
              </div>
            ))}
          </div>
        )}

        {isOpen && (
          <LightBox
            mainSrc={selectedItem.imageUrl}
            onClose={() => setIsOpen(false)}
            previousImage={handlePreviousImage}
            nextImage={handleNextImage}
            hasNext={selectedItem.hasNext}
            hasPrevious={selectedItem.hasPrevious}
          />
        )}
      </div>
    </div>
  )
}
