import type { ComponentPropsWithRef, CSSProperties } from "react";

export interface BoxInterface extends ComponentPropsWithRef<"div"> {
    max?: boolean,
    width?: string,
    height?: string,
    basis?: string,
    grow?: string,
    shrink?: string
}

export default function Box(props: BoxInterface) {
    const style: CSSProperties = {
        width: props.width ?? "max-content",
        height: props.height ?? "max-content",
        minHeight: 0,
        minWidth: 0,

        flexShrink: props.shrink,
        flexBasis: props.basis,
        flexGrow: props.grow
    }
    return (
        <div style={style} className={props.className} {...props}>
            {props.children}
        </div >
    )
}
