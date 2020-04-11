import { SharePointProvider} from '@microsoft/mgt/dist/commonjs';

export interface IDemoService {
  getMe(): Promise<any>;
}

export class DemoService {
  private _client;
  
  constructor(provider: SharePointProvider) {
    if (!provider) {
      throw new Error('DemoService: Invalid SharePointProvider.');
    }
    debugger;
    this._client = provider.graph.client;

  }
  
  public getMe(): Promise<any> {
    return this._client.api('me').get();
  }
}
