export function setStepActive(stepNumber: string, stepPage: string) {
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
