import {RouteProps} from "react-router-dom";
import React from "react";
import {MainPageAsync} from "pages/MainPage/MainPage.async";
export enum AppRoutes {
    MAIN = 'main',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPageAsync />,
        children: false
    },
}