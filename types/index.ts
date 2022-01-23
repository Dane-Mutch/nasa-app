/**
 * Exercise says include video, but is not exposed in the docs here
 * https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf
 */
export type MediaType = 'audio' | 'image' | ''

export interface SearchRequestParams {
  keywords: string
  mediaType: MediaType
  yearStart?: string
}

export interface ManifestRequestParams {
  nasaId: string
}

export interface Photo {
  center: string
  title: string
  photographer: string
  location: string
  nasa_id: string
  media_type: 'photo'
  keywords: string[]
  date_created: Date
  description: string
  description_508: string
  album: string[]
}

export interface Audio {
  center: string
  title: string
  nasa_id: string
  media_type: 'audio'
  keywords: string[]
  date_created: Date
  description_508: string
  description: string
  album: string[]
}

export interface Link {
  href: string
  rel: string
  render: string
}

export interface Item {
  href: string
  data: Audio[] | Photo[]
  links: Link[]
}

export interface Metadata {
  total_hits: number
}

export interface CollectionLink {
  rel: string
  prompt: string
  href: string
}

export interface Collection {
  version: string
  href: string
  items: Item[]
  metadata: Metadata
  links: CollectionLink[]
}

export interface SearchResponse {
  collection: Collection
}

export interface SearchRequest {
  (arg: SearchRequestParams): void
}
