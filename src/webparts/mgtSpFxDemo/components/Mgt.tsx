import * as React from 'react';
import * as ReactDom from 'react-dom';
import { useEffect, useState, useRef } from 'react';

export default class Mgt extends React.Component<any, {}> {
    private mgtComponent;
    private ignoredProps;
    private templates;
  
    constructor(props) {
      super(props);
      this.mgtComponent = null;
  
      this.ignoredProps = new Set(['children', 'type']);
    }
  
    public render(): React.ReactElement<any> {
      
      let {type} = this.props;
      if (!type.startsWith('mgt-')){
        type = 'mgt-' + type;
      }
  
      this.processTemplates(this.props.children);
  
      let templateElements = [];
  
      if (this.templates) {
        for (let template in this.templates){
          if (this.templates.hasOwnProperty(template)){
            templateElements.push(<template key={template} data-type={template}></template>);
          }
        }
      }
      
      const element: React.ReactElement<any> = React.createElement(
          type, { ref: this.setRef }, templateElements
      );
      
      return element;

    }
  
    private setRef = (component: React.Component): void => {
      if (component) {
        if (component !== this.mgtComponent){
          this.cleanUp();
        }
  
        this.mgtComponent = component;
        debugger;
        this.mgtComponent.addEventListener('templateRendered', this.handleTemplateRendered);
        this.syncProps(this.props);
      } else {
        this.cleanUp();
      }
    }
  
    private cleanUp(): void {
      if (!this.mgtComponent){
        return;
      }
  
      this.mgtComponent.removeEventListener('templateRendered', this.handleTemplateRendered);
  
      for (let prop in this.props) {
        if (!this.props.hasOwnProperty(prop)){
          continue;
        }
  
        if (this.isEventProp(prop, this.props)) {
          this.mgtComponent.removeEventListener(prop[2].toLowerCase() + prop.substring(3), this.props[prop]);
        }
      }
  
      this.mgtComponent = null;
    }
  
    public componentDidUpdate(prevProps: any, prevState: any) {
      // only need to sync updated props
      // unsibscribe previous event handler if needed
  
      let newProps = {};
  
      for (let prop in this.props) {
        if (!this.props.hasOwnProperty(prop)){
          continue;
        }
  
        if (!prevProps[prop] || prevProps[prop] !== this.props[prop]) {
          newProps[prop] = this.props[prop];
  
          if (prevProps[prop] && this.isEventProp(prop, prevProps)) {
            this.mgtComponent.removeEventListener(prop[2].toLowerCase() + prop.substring(3), prevProps[prop]);
          }
        }
      }
  
      for (let prop in prevProps) {
        if (!prevProps.hasOwnProperty(prop)){
          continue;
        }
  
        if (!this.props[prop] && this.isEventProp(prop, prevProps)) {
          this.mgtComponent.removeEventListener(prop[2].toLowerCase() + prop.substring(3), prevProps[prop]);
        }
      }
  
      this.syncProps(newProps);
    }
  
    private handleTemplateRendered = (e): void => {
      let templateType = e.detail.templateType;
      let dataContext = e.detail.context;
      let element = e.detail.element;
  
      let template = this.templates[templateType];
      if (template) {
        template = React.cloneElement(template, {...dataContext});
        ReactDom.render(template, element);
      }
    }
  
    private processTemplates(children): void {
      if (!children){
        return;
      }
  
      let templates = {};
  
      React.Children.forEach(children, (child) => {
        if (child.props.template) {
          templates[child.props.template] = child;
        }
      });
  
      this.templates = templates;
    }
  
    private syncProps(props: {}) {
      if (this.mgtComponent) {
        for (let prop in props) {
  
          if (this.ignoredProps.has(prop)){
            continue;
          }
  
          if (this.isEventProp(prop, props)) {
              this.mgtComponent.addEventListener(prop[2].toLowerCase() + prop.substring(3), props[prop]);
          }
            
          this.mgtComponent[prop] = props[prop];
        }
      }
    }
  
    private isEventProp(prop: any, props: any): boolean {
      return prop &&
        prop.length > 2 && 
        prop.startsWith('on') &&
        prop[2] === prop[2].toUpperCase() &&
        typeof(props[prop]) === 'function';
    }
  }
  