import type { CSSProperties, ReactNode } from "react";

export interface PanelInterface {
    children: ReactNode,
    column?: boolean,
    row?: string,
    col?: string,
    content?: string,
    items?: string
    wrap?: boolean
    width?: string,
    height?: string,
    center?: boolean,
    gap?: string,
    basis?: string,
    grow?: string,
    shrink?: string
}

export default function Panel(props: PanelInterface) {
    const style: CSSProperties = {
        display: "flex",
        flexDirection: props.column ? "column" : undefined,
        placeContent: props.center ? "center" : props.content,
        placeItems: props.center ? "center" : props.items,
        gap: props.gap,
        flexWrap: props.wrap ? "wrap" : undefined,
        gridRow: props.row,
        gridColumn: props.col,
        width: props.width ?? "100%",
        height: props.height ?? "100%",
        minHeight: 0,
        minWidth: 0,

        flexShrink: props.shrink,
        flexBasis: props.basis,
        flexGrow: props.grow
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    )
}
