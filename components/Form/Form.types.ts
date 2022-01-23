import { FormikHelpers } from 'formik'
import type { ComponentPropsWithRef } from 'react'
import { MediaType } from '../../types'

export interface FormValues {
  keywords: string
  mediaType: MediaType
  yearStart: string
}

// Override onSubmit for expected formik shape
export interface FormProps
  extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  onSubmit: (values: FormValues, helpers: FormikHelpers<FormValues>) => void,
  buttonText: string;
}
