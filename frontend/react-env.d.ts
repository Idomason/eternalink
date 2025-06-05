/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace React {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // Custom attributes here
  }
}

declare module "react" {
  export = React;
  export as namespace React;
}
