import React, {ReactNode} from 'react';
import {Provider} from "react-redux";
import {createReduxStore} from "app/providers/StoreProvider/config/store";
import {StateScheme} from "app/providers/StoreProvider/config/StateScheme";

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateScheme;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const {
        children,
        initialState
    } = props

    const store = createReduxStore(initialState as StateScheme);
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};