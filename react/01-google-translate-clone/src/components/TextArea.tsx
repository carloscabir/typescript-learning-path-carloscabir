import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'
import { type FC } from 'react'

// type Props =
//   | { type: SectionType.From, loading?: undefined, onChange: (value: string) => void, value: string }
//   | { type: SectionType.To, loading?: boolean, onChange: (value: string) => void, value: string }

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonStyles = { border: 0, height: '150px', resize: 'none' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Enter Text'
  if (loading === true) return 'Loading...'
  return 'Translation'
}

export const TextArea: FC<Props> = ({
  type,
  loading,
  onChange,
  value
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  const styles = type === SectionType.To
    ? { ...commonStyles, backgroundColor: '#f5f5f5', color: '#191919' }
    : commonStyles

  return (
    <Form.Control
      as='textarea'
      autoFocus={type === SectionType.From}
      disabled={ type === SectionType.To }
      placeholder={getPlaceholder({ type, loading })}
      onChange={handleChange}
      style={styles}
      value={value}
    />
  )
}
