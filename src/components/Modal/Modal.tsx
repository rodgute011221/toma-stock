import type { ComponentPropsWithRef } from "react";

export default function Modal({ children, className, ...props }: ComponentPropsWithRef<"div">) {
    return (
        <div className={"absolute z-20" + " " + className} {...props}>
            {children}
        </div>
    )
}