import React, { useState } from 'react'
import { formatPrice } from '../utils'

interface IRangeProps {
  label: string
  name: string
  price: number
  size?: string
}

const FormRange: React.FC<IRangeProps> = ({
  label,
  name,
  price,
  size = '',
}) => {
  const step = 1000
  const maxPrice = 100000

  const [selectedPrice, setSelectedPrice] = useState<number>(price || maxPrice)

  return (
    <div className="form-control">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
        <span>{formatPrice(String(selectedPrice))}</span>
      </label>
      <input
        type="range"
        name={name}
        min={0}
        max={maxPrice}
        value={selectedPrice}
        onChange={(e) => setSelectedPrice(+e.target.value)}
        step={step}
        className={`range range-primary ${size}`}
        id={name}
      />
      <div className="w-full flex justify-between text-xs px-2 mt-2">
        <span className="font-bold text-md">0</span>
        <span className="font-bold text-md">
          MAX : {formatPrice(String(maxPrice))}
        </span>
      </div>
    </div>
  )
}

export default FormRange
