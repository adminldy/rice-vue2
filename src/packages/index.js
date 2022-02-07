const req = require.context('./', true, /[^.]+\.vue/)
let componentsName = req.keys()

const components = componentsName.reduce((component, moduleName) => {
  let mod = req(moduleName)
  component[mod.default.name] = mod.default
  return component
}, {})

const install = (app) => {
  Object.keys(components).forEach(name => {
    app.component(name, components[name])
  })
}

export default {
  install
}