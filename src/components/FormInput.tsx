import React from 'react'

interface InputProps {
  label: string
  name: string
  type: string
  defaultValue?: string
}

const FormInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  defaultValue = 'Enter Something',
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="input input-bordered"
      />
    </div>
  )
}

export default FormInput
