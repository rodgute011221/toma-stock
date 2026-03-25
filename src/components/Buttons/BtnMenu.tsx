import type { ComponentPropsWithRef } from "react";


export default function BtnMenu({ children, className, ...props }: ComponentPropsWithRef<"button">) {
    return (
        <button className={"transition p-3 px-6 hover:bg-[#ffffff27] active:translate-y-0.5" + " " + className}{...props}>
            {children}
        </button>
    )
}
