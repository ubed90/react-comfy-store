import React from 'react'

// * Checkg for the State of Whether the form is being submitted or not
import { useNavigation } from 'react-router-dom'

interface SubmitBtnProps {
  text?: string
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ text = 'Submit' }) => {
  const navigation = useNavigation()

  const isSubmitting: boolean = navigation.state === 'submitting'

  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>
          sending...
        </>
      ) : (
        text
      )}
    </button>
  )
}

export default SubmitBtn
