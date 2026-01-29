;(function () {
    const DEV_URL = "http://127.0.0.1:3000/app.js"
    const PROD_URL = "https://jouw-project.pages.dev/app.js"
    const TIMEOUT = 300
  
    function loadScript(src) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.defer = true
        script.onload = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }
  
    const timeout = new Promise((_, reject) =>
      setTimeout(reject, TIMEOUT)
    )
  
    Promise.race([
      loadScript(DEV_URL),
      timeout
    ])
      .catch(() => loadScript(PROD_URL))
  })()
  