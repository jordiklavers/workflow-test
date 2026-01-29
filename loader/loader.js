;(function () {
    const DEV_URL = "http://127.0.0.1:3000/app.js"
    const PROD_URL = "https://workflow-test.pages.dev/app.js"
    const TIMEOUT = 300
  
    function loadScriptWithTimeout(src, timeoutMs) {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        let done = false
  
        const cleanup = () => {
          script.onload = null
          script.onerror = null
          if (script.parentNode) {
            script.parentNode.removeChild(script)
          }
        }
  
        const timer = setTimeout(() => {
          if (done) return
          done = true
          cleanup()
          reject(new Error("timeout"))
        }, timeoutMs)
  
        script.src = src
        script.defer = true
  
        script.onload = () => {
          if (done) return
          done = true
          clearTimeout(timer)
          resolve()
        }
  
        script.onerror = () => {
          if (done) return
          done = true
          clearTimeout(timer)
          cleanup()
          reject(new Error("error"))
        }
  
        ;(document.head || document.body || document.documentElement)
          .appendChild(script)
      })
    }
  
    function whenDOMReady() {
      return new Promise((resolve) => {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", resolve)
        } else {
          resolve()
        }
      })
    }
  
    whenDOMReady()
      .then(() => loadScriptWithTimeout(DEV_URL, TIMEOUT))
      .catch(() => loadScriptWithTimeout(PROD_URL, TIMEOUT))
  })()
  