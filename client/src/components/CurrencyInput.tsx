import { Input, InputProps } from 'reactstrap'
import React from 'react'
import { getIn, useFormikContext } from 'formik'
import { IMaskInput } from 'react-imask'
// const IMaskInput = lazy(() => import('react-imask').then((m) => m.IMaskInput))

interface CurrencyInputProps extends InputProps {
  value: string
  onChange(value: any): void
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  ...props
}) => {
  return (
    <Input
      tag={IMaskInput}
      mask="Rp num"
      value={value}
      unmask={true}
      blocks={{
        num: {
          mask: Number,
          thousandsSeparator: '.',
          scale: 0,
        },
      }}
      onAccept={(value) => onChange(value)}
      placeholder="Rp 0"
      {...props}
    />
  )
}

interface FormikCurrencyInputProps extends InputProps {
  name: string
}

export const FormikCurrencyInput: React.FC<FormikCurrencyInputProps> = ({
  name,
  ...props
}) => {
  const {
    values,
    setFieldValue,
    errors,
    handleBlur,
    touched,
  } = useFormikContext()
  const value = getIn(values, name) || ''
  const error = getIn(errors, name)
  const touch = getIn(touched, name)

  return (
    <>
      <CurrencyInput
        name={name}
        value={(value + '') as any}
        onChange={(value) => setFieldValue(name, parseInt(value))}
        invalid={error && touch && true}
        onBlur={handleBlur}
        {...props}
      />
      {error && touch && (
        <div className="text-danger">
          <small>{error}</small>
        </div>
      )}
    </>
  )
}
