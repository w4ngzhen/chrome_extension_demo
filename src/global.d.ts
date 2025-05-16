declare module "*.module.less" {
  const classes: { [key: string]: string };
  // css-loader >= v7:
  // d.ts:
  // export = classes
  // code:
  // import * as style from "./style.css";
  // console.log(style.myClass);
  export = classes;
  // css-loader < v7:
  // export default classes;
  // code:
  // import style from "./style.css";
  // console.log(style.myClass);
}
