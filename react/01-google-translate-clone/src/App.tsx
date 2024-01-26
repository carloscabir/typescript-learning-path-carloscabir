import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'

import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { CopyIcon, SpeechIcon, SwitchIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { type Language, SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

export function App () {
  const {
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 1000)

  useEffect(() => {
    if (fromText === '') return

    // Hola mundo!!
    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        console.log(result)
        // setResult(result)
      })
      .catch(err => {
        console.log(err)
        setResult('Error')
      })
  }, [debouncedFromText, fromLanguage, toLanguage])

  const handleClipboard = () => { void navigator.clipboard.writeText(result) }

  const handleSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage as Language]
    utterance.rate = 0.85
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h1>Google Translate</h1>

      <Row>
        <Col>
          <Stack gap={2}>
          <LanguageSelector
            type={ SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage} />

          <TextArea
              type={SectionType.From}
              value={ fromText}
              onChange={setFromText}
            />
            </Stack>
        </Col>

        <Col xs='auto'>
          <Button variant='link' disabled={ fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <SwitchIcon/>
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>

          <LanguageSelector
            type={ SectionType.To}
            value={ toLanguage }
            onChange={setToLanguage}
            />
            <div style={{ position: 'relative' }}>
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
              />
              <div
                style={{ position: 'absolute', left: 0, bottom: 0, color: '#9aa0a6', display: 'flex' }} >
              <Button
                variant='link'
                onClick={handleClipboard}
              >
                <CopyIcon/>
              </Button>
              <Button
                  variant='link'
                  onClick={handleSpeech}
              >
                <SpeechIcon/>
              </Button>
              </div>
          </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
