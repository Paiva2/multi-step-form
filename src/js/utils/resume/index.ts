import { getResumeWrapper } from "../../globals/index.js"

export function setUpAddOnsResume(addOn: IAddOn) {
  const selectedResume = document.createElement("div")
  const addOnName = document.createElement("p")
  const addOnValue = document.createElement("p")

  selectedResume.classList.add("add-ons-selected-resume")
  addOnName.classList.add("add-on-name-resume")
  addOnValue.classList.add("add-on-value-resume")

  addOnName.textContent = addOn.benefit.replaceAll("-", " ")
  addOnValue.textContent = addOn.value

  selectedResume.appendChild(addOnName)
  selectedResume.appendChild(addOnValue)

  getResumeWrapper.appendChild(selectedResume)
}
