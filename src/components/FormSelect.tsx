import React from 'react'

interface ISelectProps {
  label: string
  name: string
  list: string[]
  defaultValue?: string
  size?: string
}

const FormSelect: React.FC<ISelectProps> = ({
  label,
  list,
  name,
  defaultValue = 'all',
  size = '',
}) => {
  return (
    <div className="form-control">
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <select
        name={name}
        id="name"
        defaultValue={defaultValue}
        className={`select select-bordered ${size}`}
      >
        {list.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}

export default FormSelect
