import { createContext } from 'react';
import { DemoService } from './Service';

export interface AppContextProps {
    service: DemoService;
}

const AppContext = createContext<AppContextProps>(undefined);

export default AppContext;