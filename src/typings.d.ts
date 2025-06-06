declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}
declare module "*.png" {
    const value: any;
    export = value;
}
declare module "*.jpg" {
    const value: any;
    export = value;
}
declare module "*.json" {
    const value: any;
    export default value;
}
declare module "*.svg" {
    import * as React from "react";
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    export default ReactComponent;
}
declare module 'dotenv-webpack';