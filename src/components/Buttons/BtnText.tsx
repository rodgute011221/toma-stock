import type { ComponentPropsWithRef } from "react";


export default function BtnText({ children, className, ...props }: ComponentPropsWithRef<"button">) {
    return (
        <button className={"transition w-max h-max text-2xl bg-blue-600 rounded-3xl p-3 px-10 text-white active:translate-y-0.5" + " " + className}{...props}>
            {children}
        </button>
    )
}
