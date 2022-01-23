import { Button, Select, TextField } from '@cruk/cruk-react-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { StyledForm } from './Form.styles'
import { FormProps, FormValues } from './Form.types'

const currentYear = new Date().getFullYear()

const SearchSchema = Yup.object().shape({
  keywords: Yup.string()
    .min(2, 'Search term must be at least 2 characters long')
    .max(50, 'Search term is a maximum of 50 characters')
    .required('This field is required'),
  mediaType: Yup.string().oneOf(['audio', 'image']).required('Must be audio or images'),
  yearStart: Yup.number().max(
    currentYear,
    'Must not exceed current year'
  ),
})

const initialValues: FormValues = {
  keywords: '',
  yearStart: '',
  mediaType: '',
}

export const Form = ({
  children,
  onSubmit,
  buttonText,
  ...rest
}: FormProps) => {
  const { errors, handleChange, handleSubmit, values } = useFormik({
    initialValues,
    validationSchema: SearchSchema,
    onSubmit,
    validateOnChange: false
  })

  return (
    <StyledForm onSubmit={handleSubmit} {...rest}>
      <TextField
        label="Keywords"
        name="keywords"
        value={values.keywords}
        onChange={handleChange}
        errorMessage={errors.keywords}
      />

      <Select
        label="Media Type"
        name="mediaType"
        value={values.mediaType}
        onChange={handleChange}
        errorMessage={errors.mediaType}
      >
        <option disabled value="">
          Please choose a media type
        </option>
        <option value="audio">Audio</option>
        <option value="image">Images</option>
      </Select>

      <TextField
        label="Year Start"
        name="yearStart"
        value={values.yearStart}
        onChange={handleChange}
        errorMessage={errors.yearStart}
      />

      <Button type="submit">{buttonText}</Button>
    </StyledForm>
  )
}
