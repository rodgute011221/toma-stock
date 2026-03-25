import type { CSSProperties } from "react";
import Panel, { type PanelInterface } from "../Macros/Panel";

interface MainInterface extends PanelInterface {
    className?: string
}

export default function Main({ children, ...props }: MainInterface) {
    const style: CSSProperties = {
        width: "100dvw",
        height: "100dvh",
        position: "relative",
        overflow: "hidden"
    }
    return (
        <div style={style}>
            <Panel width="100%" height="100%" {...props}>
                {children}
            </Panel>

        </div>
    )
}
