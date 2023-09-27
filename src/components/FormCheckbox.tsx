import React from 'react'

interface ICheckboxProps {
  label: string
  name: string
  size?: string
  defaultValue?: boolean
}

const FormCheckbox: React.FC<ICheckboxProps> = ({
  label,
  name,
  defaultValue = false,
  size = '',
}) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        name={name}
        id={name}
        defaultChecked={defaultValue}
        className={`checkbox checkbox-primary ${size}`}
      />
    </div>
  )
}

export default FormCheckbox
