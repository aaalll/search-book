import * as components from "./components";

import "./styles.scss";

for (let key in components) {
  const component = components[key];
  window.customElements.define(component.selector, component);
}

document.body.appendChild(new components.AppComponent());
