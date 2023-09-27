import React from 'react'

interface InputProps {
  label: string
  name: string
  type: string
  size?: string
  defaultValue?: string
}

const FormInput: React.FC<InputProps> = ({
  name,
  label,
  type,
  size = '',
  defaultValue = '',
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input input-bordered ${size}`}
      />
    </div>
  )
}

export default FormInput
