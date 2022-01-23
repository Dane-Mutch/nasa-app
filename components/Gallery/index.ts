import styled from "styled-components";

export const Gallery = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-template-rows: repeat(8, auto);
  grid-gap: 20px;
`

export const GalleryItem = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`