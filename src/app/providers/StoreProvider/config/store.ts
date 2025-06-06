import {configureStore, Middleware, ReducersMapObject} from "@reduxjs/toolkit";
import {StateScheme} from "app/providers/StoreProvider/config/StateScheme";
import {testReducer} from "entities/test/slice/testSlice";
export function createReduxStore(initialState?: StateScheme) {
    const rootReducers: ReducersMapObject<StateScheme> = {
        test: testReducer
    };
    return configureStore<StateScheme>({
        reducer: rootReducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['test/setImage'],
                    ignoredPaths: ['test.images'],
                },
            }),
        devTools: true,
        preloadedState: initialState,
    })
}