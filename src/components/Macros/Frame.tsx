import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";

interface FrameInterface extends ComponentPropsWithRef<"div"> {
    children?: ReactNode,
    template?: {
        row?: string,
        col?: string
    },
    row?: string,
    col?: string,
    content?: string,
    items?: string
    width?: string,
    height?: string,
    center?: boolean,
    gap?: string,
    basis?: string,
    grow?: string,
    shrink?: string
}

export default function Frame({ children, className, ...props }: FrameInterface) {
    const style: CSSProperties = {
        display: "grid",
        gridTemplateRows: props.template?.row ?? "1fr",
        gridTemplateColumns: props.template?.col ?? "1fr",
        gridRow: props.row,
        gridColumn: props.col,

        placeContent: props.center ? "center" : props.content,
        placeItems: props.center ? "center" : props.items,
        gap: props.gap,

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
            {children}
        </div>
    )
}
