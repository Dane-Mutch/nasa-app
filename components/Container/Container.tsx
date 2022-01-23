import React from 'react'
import { StyledContainer } from './Container.styles'

export const Container = ({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) => (
  <StyledContainer {...rest}>{children}</StyledContainer>
)
