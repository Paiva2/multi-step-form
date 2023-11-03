export function toggleErrorColors(field: string, showError: boolean) {
  const fieldName = document.querySelector(`label[for=${field}]`) as HTMLInputElement

  if (fieldName) {
    const errorMessage = fieldName.querySelector(
      ".form-label .error-label"
    ) as HTMLSpanElement

    const errorInputColor = fieldName.querySelector(
      `input.${field}`
    ) as HTMLInputElement

    if (showError) {
      errorInputColor.classList.add("error")
      errorMessage.style.display = "flex"
    } else {
      errorInputColor.classList.remove("error")
      errorMessage.style.display = "none"
    }
  }
}

function checkIfTheresAnyFieldWithError(stepSchema: any) {
  let isThereAnyError: boolean

  const stepSchemaKeysArr = Object.keys(stepSchema)

  stepSchemaKeysArr.forEach((field) => {
    if (stepSchema[field].error) {
      toggleErrorColors(field, true)
    } else {
      toggleErrorColors(field, false)
    }
  })

  isThereAnyError = stepSchemaKeysArr.some(
    (field) => stepSchema[field].error && !stepSchema[field].value
  )

  return isThereAnyError
}

export function setErrorsIfTheresEmptyField(stepSchema: any) {
  const stepSchemaKeysArr = Object.keys(stepSchema)

  stepSchemaKeysArr.forEach((field) => {
    if (!stepSchema[field].value.length) {
      stepSchema[field].error = true
    } else {
      stepSchema[field].error = false
    }
  })

  return checkIfTheresAnyFieldWithError(stepSchema)
}
