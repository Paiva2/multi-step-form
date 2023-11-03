export const nameField = document.querySelector(".nameField") as HTMLInputElement
export const emailField = document.querySelector(".emailField") as HTMLInputElement
export const phoneNumber = document.querySelector(".phoneNumber") as HTMLInputElement

export const nextButton = document.querySelector(
  ".next-step-btn"
) as HTMLButtonElement
export const backButton = document.querySelector(".back-step") as HTMLButtonElement
export const confirmButton = document.querySelector(
  ".confirm-btn"
) as HTMLButtonElement

export const planCardButtons = document.querySelectorAll(".plan-card") as NodeList

export const planSwitch = document.querySelector(".plan-switch-btn")
export const planIndicator = planSwitch?.querySelector(
  ".switch-indicator"
) as HTMLSpanElement

export const addOnsWrapper = document.querySelector(
  ".add-ons-wrapper"
) as HTMLDivElement
export const addOnsCheckboxs = document.querySelectorAll(".add-on") as NodeList

export const changePlanButton = document.querySelector(
  ".change-plan-button"
) as HTMLButtonElement

export const getResumeWrapper = document.querySelector(
  ".resume-wrapper .resume"
) as HTMLDivElement
