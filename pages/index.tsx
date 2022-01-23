import type { NextPage } from 'next'

import type {
  ManifestRequestParams,
  MediaType,
  Photo,
  Audio,
  SearchRequestParams,
  SearchResponse,
} from '../types'
import { useState } from 'react'
import { Form, FormValues } from '../components/Form'
import { Container } from '../components/Container'
import { FormikHelpers } from 'formik'
import { Heading } from '@cruk/cruk-react-components'
import { Stack } from '../components/Stack'
import Image from 'next/image'
import { Gallery, GalleryItem } from '../components/Gallery'

const searchApiBase = 'https://images-api.nasa.gov/search'
const manifestBase = 'https://images-api.nasa.gov/asset'

const searchApi = ({ mediaType, keywords, yearStart }: SearchRequestParams) => {
  return `${searchApiBase}?keywords=${keywords}&media_type=${mediaType}${
    yearStart ? `&year_start=${yearStart}` : ''
  }&page=1`
}

const manifestApi = ({ nasaId }: ManifestRequestParams) => {
  return `${manifestBase}/${nasaId}`
}

function isPhoto(data: Photo | Audio): data is Photo {
  return (data as Photo).media_type === 'photo'
}

interface Result {
  title: string
  data: string
  key: string
}

const Home: NextPage = () => {
  // const [audioResults, setAudioResults] = useState<Result[]>([])
  // const [imageResults, setImageResults] = useState<Result[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [contentType, setContentType] = useState<MediaType>('')
  const [isApiLoading, setIsApiLoading] = useState(false)

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
  ) => {
    helpers.setSubmitting(false)
    setIsApiLoading(true)
    const response = await fetch(searchApi(values))
    const json: SearchResponse = await response.json()
    const hits = json.collection.items.slice(0, 10)
    const data = hits.map(async (hit) => {
      const res = await fetch(manifestApi({ nasaId: hit.data[0].nasa_id }))
      const json = await res.json()

      const result: Result = {
        title: hit.data[0].title,
        // This ternary is to request smaller images for photos
        data: json.collection.items[values.mediaType === 'audio' ? 0 : 3].href,
        key: hit.data[0].nasa_id,
      }

      return result
    })

    const results = await Promise.allSettled(data)
    const successfulResults: Result[] = []
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        successfulResults.push(result.value)
      }
    })

    // if (values.mediaType === 'audio') {
    //   setAudioResults(successfulResults)
    // } else {
    //   setImageResults(successfulResults)
    // }
    setResults(successfulResults)
    setIsApiLoading(false)
    setContentType(values.mediaType)
  }

  return (
    <main>
      <Stack>
        <Container>
          <Heading h1>Welcome to the NASA photo and audio searcher</Heading>
          <Form
            buttonText={isApiLoading ? 'Submitting...' : 'Submit'}
            onSubmit={handleSubmit}
          />
        </Container>
        {contentType === 'audio' && (
          <Stack>
            {results.map((result) => (
              <div key={result.key}>
                <Heading h2>{result.title}</Heading>
                <audio controls>
                  <source src={result.data} type="audio/mp3" />
                </audio>
              </div>
            ))}
          </Stack>
        )}
        {contentType === 'image' && (
          <Gallery>
            {results.map((result) => (
              <GalleryItem key={result.key}>
                <Image
                  width="600"
                  height="600"
                  src={result.data}
                  alt={result.title}
                />
                <p>{result.title}</p>
              </GalleryItem>
            ))}
          </Gallery>
        )}
      </Stack>
    </main>
  )
}

export default Home
