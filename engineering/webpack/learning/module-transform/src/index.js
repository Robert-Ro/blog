const main = document.querySelector('main')
for (const link of document.querySelectorAll('nav  a')) {
  console.log(link)
  link.addEventListener('click', (e) => {
    e.preventDefault()

    import('./modules/my-module.js')
      .then((module) => {
        module.loadPageInto(main)
      })
      .catch((err) => {
        main.textContent = err.message
      })

    import('./modules/my-module2.js')
      .then((module) => {
        module.loadPageInto(main)
      })
      .catch((err) => {
        main.textContent = err.message
      })
  })
}
