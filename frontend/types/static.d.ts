/* Use this file to declare any custom file extensions for importing */
/* Use this folder to also add/extend a package d.ts file, if needed. */

/* CSS MODULES */
declare module '*.module.css' {
  const classes: {[key: string]: string};
  export default classes;
}
declare module '*.module.sass' {
  const classes: {[key: string]: string};
  export default classes;
}

/* CSS */
declare module '*.css';
declare module '*.sass';

/* IMAGES */
declare module '*.svg' {
  const ref: string;
  export default ref;
}
declare module '*.bmp' {
  const ref: string;
  export default ref;
}
declare module '*.gif' {
  const ref: string;
  export default ref;
}
declare module '*.jpg' {
  const ref: string;
  export default ref;
}
declare module '*.jpeg' {
  const ref: string;
  export default ref;
}
declare module '*.png' {
  const ref: string;
  export default ref;
}

interface ImportMeta {
  // TODO: Import the exact .d.ts files from "esm-hmr"
  // https://github.com/pikapkg/esm-hmr
  hot: any;
  env: any
}

/* CUSTOM: ADD YOUR OWN HERE */