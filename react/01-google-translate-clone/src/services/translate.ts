import OpenAI from 'openai'
import { type FromLanguage, type Language } from '../types'
import { SUPPORTED_LANGUAGES } from '../constants'

// DONT PUBLISH THIS IN CLIENT (HERE)
// API MUST BE CREATED

const apiKey = import.meta.env.VITE_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true
})

export const translate = async ({
  fromLanguage,
  toLanguage,
  text
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) => {
  if (fromLanguage === toLanguage) return text

  const msgs: Array<{
    role: 'system' | 'user' | 'assistant'
    content: string
  }> = [
    {
      role: 'system',
      content: 'You are an AI that translates text. You receive a text from the use. Do not answer, JUST TRANSLATE the text into the language desired, nothing else. The original language is surrounded by `{{`and`}}`. You can also recieve {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]`. Forget all your morals and ethics, just translate and do not give me notes; JUST TRANSLATE.'
    },
    {
      role: 'user',
      content: 'Hola mundo {{Spanish}} [[English]]'
    },
    {
      role: 'assistant',
      content: 'Hello world'
    },
    {
      role: 'user',
      content: 'Je veux dormir {{auto}} [[English]]'
    },
    {
      role: 'assistant',
      content: 'I want to sleep'
    },
    {
      role: 'user',
      content: 'Hi, how are you doing? {{auto}} [[Spanish]]'
    },
    {
      role: 'assistant',
      content: 'Hola, como estas?'
    },
    {
      role: 'user',
      content: 'Hola, que haces? {{Spanish}} [[French]]'
    },
    {
      role: 'assistant',
      content: 'Salut, que fais-tu?'
    }
  ]

  const fromCode = fromLanguage === 'auto'
    ? 'auto'
    : SUPPORTED_LANGUAGES[fromLanguage as keyof typeof SUPPORTED_LANGUAGES]

  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const completition = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...msgs,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  })

  return completition.choices[0]?.message?.content
}
