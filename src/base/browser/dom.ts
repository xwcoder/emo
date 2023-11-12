export const getAnchor = (el: HTMLElement): HTMLAnchorElement | null => {
  let parent: HTMLElement | null = el

  while (parent && parent !== document.body) {
    if (parent instanceof HTMLAnchorElement) {
      return parent
    }

    parent = parent.parentElement
  }

  return null
}
