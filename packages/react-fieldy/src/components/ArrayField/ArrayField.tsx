import React from "react"
import { memo } from "react"
import { Field } from "../Field"

//动态增加字段用这个，否则不要碰它
export const ArrayField = memo((
  props: {
    name: string,
    value?: any[],
    children?: React.ReactNode
  }
) => {
  const { name, value, children } = props
  return (
    <Field name={name} value={value} type="array">
      {children}
    </Field>
  )
})