import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MgtSpFxDemoWebPartStrings';
import MgtSpFxDemo from './components/MgtSpFxDemo';
import { IMgtSpFxDemoProps } from './components/IMgtSpFxDemoProps';

import '@webcomponents/webcomponentsjs/webcomponents-bundle.js';

import { Providers, SharePointProvider} from '@microsoft/mgt/dist/commonjs';
import { AadTokenProviderFactory } from "@microsoft/sp-http";
import { DemoService } from './common/Service';

export interface IMgtSpFxDemoWebPartProps {
  description: string;
  service: DemoService;
}

export default class MgtSpFxDemoWebPart extends BaseClientSideWebPart <IMgtSpFxDemoWebPartProps> {

  protected async onInit() {
    // AadTokenProviderFactory service key
    const tokenProviderFactory = this.context.serviceScope.consume(AadTokenProviderFactory.serviceKey);

    // Create a new SharePoint provider 
    const provider = new SharePointProvider({
      aadTokenProviderFactory: tokenProviderFactory
    });

    // Set the Global provider so the components work
    Providers.globalProvider = provider;  
  }

  public render(): void {

    // Get the serviceScoped provider with Graph spun up
    // Instanciate the service and pass to top level component to be used globally
    const service = new DemoService(Providers.globalProvider as SharePointProvider); 

    const element: React.ReactElement<IMgtSpFxDemoProps> = React.createElement(
      MgtSpFxDemo,
      {
        description: this.properties.description,
        service: service //Only top component needs this
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
