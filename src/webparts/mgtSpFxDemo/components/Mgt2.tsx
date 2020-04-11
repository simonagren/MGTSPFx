// import * as React from "react";
// import * as ReactDom from "react-dom";
// import { useEffect, useState, useRef } from "react";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       template: any;
//     }
//   }
// }

// const Mgt2: React.FunctionComponent<any> = (props) => {
//   let mgtComponent = null;
//   let ignoredProps = new Set(["children", "type"]);
//   let templates = null;

//   const usePreviousProps = (value): any => {
//     const ref = useRef();
//     useEffect(() => {
//       ref.current = value;
//     });
//     return ref.current;
//   };

//   const isEventProp = (prop: any, eprops: any): boolean => {
//     return prop &&
//       prop.length > 2 && 
//       prop.startsWith('on') &&
//       prop[2] === prop[2].toUpperCase() &&
//       typeof(eprops[prop]) === 'function';
//   };

//   const syncProps = (sprops) => {
//       if (this.mgtComponent) {
//         for (let prop in sprops) {
  
//           if (this.ignoredProps.has(prop)){
//             continue;
//           }
  
//           if (this.isEventProp(prop, sprops)) {
//               this.mgtComponent.addEventListener(prop[2].toLowerCase() + prop.substring(3), sprops[prop]);
//           }
            
//           this.mgtComponent[prop] = sprops[prop];
//         }
//       }
//   };

//   useEffect(() => {
//     const prevProps = usePreviousProps(props);
//     let newProps = {};

//     for (let prop in props) {
//       if (props.hasOwnProperty(prop)) {
//         continue;
//       }

//       if (!prevProps[prop] || prevProps[prop] !== props[prop]) {
//         newProps[prop] = props[prop];

//         if (prevProps[prop] && isEventProp(prop, prevProps)) {
//           mgtComponent.removeEventListener(
//             prop[2].toLowerCase() + prop.substring(3),
//             prevProps[prop]
//           );
//         }
//       }
//     }
//     for (let prop in prevProps) {
//       if (!prevProps.hasOwnProperty(prop)) {
//         continue;
//       }

//       if (!props[prop] && isEventProp(prop, prevProps)) {
//         mgtComponent.removeEventListener(
//           prop[2].toLowerCase() + prop.substring(3),
//           prevProps[prop]
//         );
//       }
//     }

//     syncProps(newProps);
//   }, [props]);

//   const handleTemplateRendered = (e): void => {
//     let templateType = e.detail.templateType;
//     let dataContext = e.detail.context;
//     let delement = e.detail.element;

//     let template = this.templates[templateType];
//     if (template) {
//       template = React.cloneElement(template, {...dataContext});
//       ReactDom.render(template, delement);
//     }
//   };
//   const processTemplates = (children): void => {
//     if (!children) {
//       return;
//     }

//     let tempTemplates = {};

//     React.Children.forEach(children, (child) => {
//       if (child.props.template) {
//         tempTemplates[child.props.template] = child;
//       }
//     });

//     templates = tempTemplates;
//   };

//   const cleanUp = (): void => {
//     if (!mgtComponent) {
//       return;
//     }

//     mgtComponent.removeEventListener(
//       "templateRendered",
//       handleTemplateRendered
//     );

//     for (let prop in props) {
//       if (!props.hasOwnProperty(prop)) {
//         continue;
//       }

//       if (isEventProp(prop, props)) {
//         mgtComponent.removeEventListener(
//           prop[2].toLowerCase() + prop.substring(3),
//           props[prop]
//         );
//       }
//     }

//     mgtComponent = null;
//   };

//   const setRef = (component: React.Component): void => {
//     if (component) {
//       if (component !== mgtComponent) {
//         cleanUp();
//       }

//       mgtComponent = component;
//       mgtComponent.addEventListener("templateRendered", handleTemplateRendered);
//       syncProps(props);
//     } else {
//       cleanUp();
//     }
//   };

//   // Render
//   let { type } = props;
//   if (!type.startsWith("mgt-")) {
//     type = "mgt-" + type;
//   }

//   processTemplates(props.children);

//   let templateElements = [];

//   if (templates) {
//     for (let template in templates) {
//       if (templates.hasOwnProperty(template)) {
//         templateElements.push(
//           <template key={template} data-type={template}></template>
//         );
//       }
//     }
//   }

//   const element: React.ReactElement<any> = React.createElement(
//     type,
//     { ref: setRef },
//     templateElements
//   );

//   return element;
// };

// export default Mgt;
