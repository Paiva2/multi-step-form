interface IAddOn {
  benefit: string
  value: string
}

const nameField = document.querySelector(".nameField") as HTMLInputElement
const emailField = document.querySelector(".emailField") as HTMLInputElement
const phoneNumber = document.querySelector(".phoneNumber") as HTMLInputElement

const nextButton = document.querySelector(".next-step-btn") as HTMLButtonElement
const backButton = document.querySelector(".back-step") as HTMLButtonElement
const confirmButton = document.querySelector(".confirm-btn") as HTMLButtonElement

const planCardButtons = document.querySelectorAll(".plan-card") as NodeList

const planSwitch = document.querySelector(".plan-switch-btn")
const planIndicator = planSwitch?.querySelector(
  ".switch-indicator"
) as HTMLSpanElement

const addOnsWrapper = document.querySelector(".add-ons-wrapper") as HTMLDivElement
const addOnsCheckboxs = document.querySelectorAll(".add-on") as NodeList

let step = 2

let firstStepFields = {
  nameField: {
    value: "",
    error: false,
  },
  emailField: {
    value: "",
    error: false,
  },
  phoneNumber: {
    value: "",
    error: false,
  },
}

let planType = planIndicator?.classList.contains("month") ? "month" : "year"
let planCardSelected = {
  plan: "arcade",
  value: "$9/mo",
}

let addOnsSelected: IAddOn[] = []

function toggleErrorColors(field: string, showError: boolean) {
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

function setErrorsIfTheresEmptyField(stepSchema: any) {
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

function changeStepActive() {
  if (step > 2) {
    nextButton.style.display = "none"
    confirmButton.style.display = "flex"
  } else {
    nextButton.style.display = "flex"
    confirmButton.style.display = "none"
  }

  if (step > 0) {
    backButton.style.display = "flex"
  }

  switch (step) {
    case 0:
      setStepActive("one", "first-step")
      break

    case 1:
      setStepActive("two", "second-step")
      break

    case 2:
      setStepActive("three", "third-step")
      break

    case 3:
      setStepActive("four", "fourth-step")

    default:
      return null
  }
}

nextButton?.addEventListener("click", () => {
  firstStepFields = {
    nameField: {
      value: nameField.value,
      error: false,
    },
    emailField: {
      value: emailField.value,
      error: false,
    },
    phoneNumber: {
      value: phoneNumber.value,
      error: false,
    },
  }

  const isThereAnyError = setErrorsIfTheresEmptyField(firstStepFields)

  if (isThereAnyError) return

  if (step < 3) {
    step = step + 1
  }

  changeStepActive()
})

backButton.addEventListener("click", () => {
  if (step > 0) {
    step = step - 1
  }

  if (step < 1) {
    backButton.style.display = "none"
  }

  changeStepActive()
})

function setStepActive(stepNumber: string, stepPage: string) {
  const getAllSteps = document.querySelectorAll(
    ".form-wrapper .form .fields-wrapper .field-steps"
  )
  const getAllStepsIndicator = document.querySelectorAll(".step-indicator-wrapper")

  for (let page of getAllSteps) {
    const pageStep = page as HTMLDivElement

    if (page.classList.contains(stepPage)) {
      pageStep.style.display = "flex"
    } else {
      pageStep.style.display = "none"
    }
  }

  for (let indicator of getAllStepsIndicator) {
    const stepIndicator = indicator.querySelector(
      ".step-indicator"
    ) as HTMLSpanElement

    if (indicator.classList.contains(stepNumber)) {
      stepIndicator?.classList.add("step-active")
    } else {
      stepIndicator?.classList.remove("step-active")
    }
  }
}

planSwitch?.addEventListener("click", () => {
  planIndicator.classList.toggle("month")
  planIndicator.classList.toggle("year")

  planType = planIndicator?.classList.contains("month") ? "month" : "year"
})

function changeActivePlanCard(planCard: HTMLButtonElement, planName: string) {
  planCard.addEventListener("click", () => {
    const planValue = planCard.querySelector(".plan-info .plan-value")

    planCardSelected = {
      plan: planName,
      value: planValue?.textContent as string,
    }

    for (let card of planCardButtons) {
      const singleCard = card as HTMLButtonElement

      if (singleCard.classList.contains(planCardSelected.plan)) {
        singleCard.classList.add("active")
      } else {
        singleCard.classList.remove("active")
      }
    }
  })
}

planCardButtons.forEach((card) => {
  const cardButton = card as HTMLButtonElement
  const planName = cardButton.querySelector(".plan-name") as HTMLParagraphElement

  changeActivePlanCard(cardButton, planName.textContent!.toLowerCase())
})

function setActiveCheckboxPlan(
  selectedValue: string,
  optionElement: HTMLInputElement
) {
  const addOnMonthlyValue = optionElement.querySelector(
    ".add-on-value"
  ) as HTMLParagraphElement

  const doesSelectedValueAlreadyExists = addOnsSelected.find(
    (addOnSelected) => addOnSelected.benefit === selectedValue
  )

  if (doesSelectedValueAlreadyExists) {
    const valueToRemove = addOnsSelected.indexOf(doesSelectedValueAlreadyExists)

    addOnsSelected.splice(valueToRemove, 1)
  } else {
    addOnsSelected.push({
      benefit: selectedValue,
      value: addOnMonthlyValue.textContent as string,
    })
  }

  const doesExistentBenefitHasSelectedValue = addOnsSelected.find(
    (addOnSelected) => addOnSelected.benefit === selectedValue
  )

  if (doesExistentBenefitHasSelectedValue) {
    optionElement.classList.add("checked")
  } else {
    optionElement.classList.remove("checked")
  }
}

addOnsCheckboxs.forEach((option) => {
  option.addEventListener("change", (e) => {
    const optionElement = option as HTMLInputElement
    const optionCheckbox = e.target as HTMLInputElement

    setActiveCheckboxPlan(optionCheckbox.value, optionElement)
  })
})

changeStepActive()
