import React, { useState, useEffect } from 'react'

interface DebouncedInputProps {
  onChange: (value: string) => void
  delay: number
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({ onChange, delay }) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onChange(inputValue)
    }, delay)

    return () => {
      clearTimeout(debounceTimer)
    }
  }, [inputValue, onChange, delay])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      className="text-black border-2 border-blue-300  bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none "
    />
  )
}

export default DebouncedInput
