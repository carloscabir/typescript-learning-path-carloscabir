import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { type FC } from 'react'
import { SectionType, type FromLanguage, type Language } from '../types.d'

// For diferences between 'from' and 'to' languages, see:
// Two different contracts for each type of selector
type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (language: Language) => void }

export const LanguageSelector: FC<Props> = ({ value, type, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select onChange={handleChange} aria-label='Select Language' value={value}>
      {
      type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>}
      {
        Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
          <option value={key} key={key}>
            { literal }
          </option>
        ))
      }
    </Form.Select>
  )
}
