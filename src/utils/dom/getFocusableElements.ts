export type FocusableElement =
  | HTMLButtonElement
  | HTMLAnchorElement
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | HTMLDetailsElement
  | HTMLElement

// https://piccalil.li/blog/load-all-focusable-elements-with-javascript/
const getAllFocusableElements = (
  parent: HTMLElement | EventTarget,
): NodeListOf<FocusableElement> | [] => {
  if (!parent) {
    console.warn('You need to pass a parent HTMLElement')
    return [] // Return array so length queries will work
  }

  return (parent as HTMLElement).querySelectorAll(
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), details:not([disabled]), summary:not(:disabled)',
  )
}

export default getAllFocusableElements
