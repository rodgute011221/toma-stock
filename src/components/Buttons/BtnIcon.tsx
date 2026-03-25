import type { ComponentPropsWithRef } from "react";

export default function BtnIcon({ children, ...props }: ComponentPropsWithRef<"button">) {
    return (
        <button className="transition text-2xl rounded p-2 hover:bg-[#21212123] active:scale-90" {...props}>
            {children}
        </button>
    )
}
