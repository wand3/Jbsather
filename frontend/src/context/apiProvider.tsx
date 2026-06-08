import React, { createContext, useContext, useCallback, useMemo } from 'react';
import satherApiClient from '../satherClient';

export const ApiContext = createContext<satherApiClient | null>(null)

export function ApiProvider({ children, onError }: React.PropsWithChildren<{ onError?: (error: any) => void; }>) {
    
    const api = useMemo(() => new satherApiClient(onError), [onError]);
    return (
        <ApiContext.Provider value={api}>
            {children}
        </ApiContext.Provider>
    
    )

}

export default ApiProvider;