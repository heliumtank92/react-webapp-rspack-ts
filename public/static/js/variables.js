window.addEventListener('load', setVariables)
window.addEventListener('resize', setVariables)

function setVariables() {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty(
    '--100vh',
    `${window.innerHeight}px`
  )
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
