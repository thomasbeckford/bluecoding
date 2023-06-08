'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import debounce from 'lodash/debounce'
import LightBox from './components/LightBox'

export default function Home() {
  const [queryString, setQueryString] = useState('')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState({
    imageUrl: '',
    index: 0,
    hasNext: true,
    hasPrevious: true,
  })

  useEffect(() => {
    const fetchData = debounce(async (queryString) => {
      setLoading(true)
      try {
        const data = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_API_KEY}&q=${queryString}`
        )
        const res = await data.json()
        setData(res.data)
        setLoading(false)
      } catch (e) {
        return new Error("Can't fetch data")
      }
    }, 2000)

    fetchData(queryString)
  }, [queryString])

  const handleChange = (string: string) => setQueryString(string)

  const handleSelectImage = (image: string, index: number) => {
    setIsOpen(true)
    setSelectedItem({
      imageUrl: image,
      index,
      hasPrevious: true,
      hasNext: true,
    })
  }

  const handlePreviousImage = () => {
    if (selectedItem.index === 0) {
      setSelectedItem({
        imageUrl: selectedItem.imageUrl,
        index: selectedItem.index,
        hasPrevious: false,
        hasNext: true,
      })
      return
    }
    setSelectedItem({
      imageUrl: data[selectedItem.index - 1].images.downsized.url,
      index: selectedItem.index - 1,
      hasPrevious: true,
      hasNext: true,
    })
  }

  const handleNextImage = () => {
    if (selectedItem.index === data.length - 1) {
      setSelectedItem({
        imageUrl: selectedItem.imageUrl,
        index: selectedItem.index,
        hasPrevious: true,
        hasNext: false,
      })

      return
    }
    setSelectedItem({
      imageUrl: data[selectedItem.index + 1].images.downsized.url,
      index: selectedItem.index + 1,
      hasPrevious: true,
      hasNext: true,
    })
  }

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="">Blue Coding Excersise</h1>
      <form className="">
        <div className="text-sm font-bold text-white tracking-wide">
          Search gifs
        </div>
        <input
          className="text-black border-2 border-blue-300  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
          type="text"
          value={queryString}
          placeholder="q"
          onChange={(e) => handleChange(e.target.value)}
        />
      </form>

      <div className="grid grid-cols-10 gap-3">
        {loading ? (
          <div className="animated animate-bounce">Loading</div>
        ) : (
          data?.map((item, index) => (
            <>
              <Image
                key={item.name}
                width={100}
                height={100}
                src={item.images.downsized.url}
                alt="gif"
                unoptimized
                className="cursor-pointer transition-all hover:opacity-70"
                onClick={() =>
                  handleSelectImage(item.images.downsized.url, index)
                }
              />
            </>
          ))
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
