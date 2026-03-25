import type { ComponentPropsWithRef } from "react";


export default function BtnModal({ children, className, ...props }: ComponentPropsWithRef<"button">) {
    return (
        <button className={"transition rounded bg-[#212121] text-white w-full p-3 active:translate-y-0.5" + " " + className}{...props}>
            {children}
        </button>
    )
}
