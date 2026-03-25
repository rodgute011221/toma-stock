import { createContext, useContext, type ReactNode } from "react"
import Panel from "../Macros/Panel"
import Frame from "../Macros/Frame"
import Box from "../Macros/Box"
import type { ProductType } from "../../page/Product/Product"

type ContextType = { titles: string[] | undefined }
const TableContext = createContext<ContextType>({ titles: [] })

interface TableInterface {
    children: ReactNode,
    titles: string[] | undefined
}
export function Table(props: TableInterface) {
    if (!props.titles) return <span>No hay Titulos</span>
    return (
        <Panel column gap="12px">
            <Box width="100%" basis="40px" className="bg-[#212121] text-white rounded text-center">
                <Frame center template={{ col: "50px 1fr 100px 100px 100px" }}>
                    {
                        props.titles.map((e) => <span className={e == "Name" ? "text-left" : ""} key={e}>{e}</span>)
                    }
                    <span>#</span>
                </Frame>
            </Box>
            <Box width="100%" className="overflow-y-auto">
                <Panel height="max-content" wrap column gap="12px">
                    <TableContext.Provider value={{ titles: props.titles }}>
                        {props.children}
                    </TableContext.Provider>
                </Panel>
            </Box>

        </Panel>



    )
}

interface CeldaInterface {
    children?: ReactNode,
    data: ProductType,
    index: number
}
export function Celda(props: CeldaInterface) {
    const { titles } = useContext(TableContext)
    return (
        <Box key={props.index} width="100%" className="bg-slate-100">
            <Frame center basis="40px" template={{ col: "50px 1fr 100px 100px 100px" }}>
                {
                    titles?.map((e) =>
                        <span key={e} className={e == "Name" ? "text-left" : ""}>{props.data[e as keyof typeof props.data]}</span>)
                }
                {props.children}
            </Frame>
        </Box>

    )
}