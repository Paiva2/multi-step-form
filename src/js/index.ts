import {
  addOnsCheckboxs,
  backButton,
  changePlanButton,
  confirmButton,
  emailField,
  getResumeWrapper,
  nameField,
  nextButton,
  phoneNumber,
  planCardButtons,
  planIndicator,
  planSwitch,
} from "./globals/index.js"
import { setErrorsIfTheresEmptyField } from "./utils/inputErrorHandling/index.js"
import { setUpAddOnsResume } from "./utils/resume/index.js"
import { setStepActive } from "./utils/stepControl/index.js"

let step = 0

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

function setUpResumePage() {
  nextButton.style.display = "none"
  confirmButton.style.display = "flex"

  const getAllAddOnsResume = document.querySelectorAll(".add-ons-selected-resume")

  const selectedPlan = document.querySelector(
    ".selected-plan-name"
  ) as HTMLParagraphElement

  const selectedPlanValue = document.querySelector(
    ".selected-plan-value-resume"
  ) as HTMLSpanElement

  const totalResume = document.querySelector(".total-resume") as HTMLSpanElement

  for (let addOnResume of getAllAddOnsResume) {
    getResumeWrapper.removeChild(addOnResume)
  }

  const planSelectedValue = planCardSelected.value

  const formatPlanSelectedValue = planCardSelected.value
    .replace("+", "")
    .replace("$", "")
    .replace("/mo", "")
    .replace("/yr", "")

  const totalCalculation = addOnsSelected.reduce((acc, add) => {
    return (acc += Number(
      add.value.replace("+", "").replace("$", "").replace("/mo", "")
    ))
  }, 0)

  totalResume.innerText = `$${totalCalculation + Number(formatPlanSelectedValue)}/${
    planType === "month" ? "mo" : "year"
  }`

  selectedPlan.innerText = `${planCardSelected.plan} (${
    planType === "month" ? "Monthly" : "Yearly"
  })`

  selectedPlanValue.innerText = `${planSelectedValue}`

  for (let addOn of addOnsSelected) {
    setUpAddOnsResume(addOn)
  }
}

function changeStepActive() {
  if (step === 3) {
    setUpResumePage()
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
      break

    case 4: {
      setStepActive("fifth", "fifth-step")
      const containLastStepActive = document.querySelector(
        ".step-indicator-wrapper.four"
      )

      nextButton.style.display = "none"
      confirmButton.style.display = "none"
      backButton.style.display = "none"

      containLastStepActive
        ?.querySelector(".step-indicator")
        ?.classList.add("step-active")
      break
    }

    default:
      return null
  }
}

confirmButton.addEventListener("click", (e: Event) => {
  e.preventDefault()

  step = 4

  changeStepActive()
})

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

  if (step < 4) {
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

function changePlanType() {
  planType = planIndicator?.classList.contains("month") ? "month" : "year"

  let yearlyPlans = ["$90/yr", "$120/yr", "$150/yr"]
  let monthlyPlans = ["$9/mo", "$12/mo", "$15/mo"]

  let switchPlanTypeValues = planType === "month" ? monthlyPlans : yearlyPlans

  for (let plan of planCardButtons) {
    const card = plan as HTMLButtonElement
    const monthsFree = card.querySelector(".free-months") as HTMLParagraphElement

    const getThisCardValue = card.querySelector(
      ".plan-value"
    ) as HTMLParagraphElement

    if (card.classList.contains("arcade")) {
      getThisCardValue.textContent = switchPlanTypeValues[0]
    }

    if (card.classList.contains("advanced")) {
      getThisCardValue.textContent = switchPlanTypeValues[1]
    }

    if (card.classList.contains("pro")) {
      getThisCardValue.textContent = switchPlanTypeValues[2]
    }

    if (card.classList.contains("active")) {
      planCardSelected = {
        ...planCardSelected,
        value: getThisCardValue?.textContent as string,
      }
    }

    if (planType === "year") {
      monthsFree.style.display = "flex"
    } else {
      monthsFree.style.display = "none"
    }
  }
}

planSwitch?.addEventListener("click", () => {
  planIndicator.classList.toggle("month")
  planIndicator.classList.toggle("year")

  changePlanType()
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

changePlanButton.addEventListener("click", () => {
  step = 1

  changeStepActive()
})

changeStepActive()
