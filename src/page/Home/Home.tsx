import { useNavigate } from "react-router"

export default function Home() {
    const navegate = useNavigate()
    return (
        <div className="w-screen h-screen flex">
            <div className="w-full h-full bg-slate-300"></div>
            <div className="w-150 h-full flex flex-col px-10 gap-3 place-content-center">
                <button className="transition border-none rounded-[5px] text-start px-5 p-2 text-white bg-[#2ba158] active:translate-y-0.5">Google Sheet</button>
                <button onClick={() => navegate("/product")} className="transition border-none rounded-[5px] text-start px-5 p-2 text-white bg-[#212121] active:translate-y-0.5">Subir Archivo</button>
            </div>
        </div>
    )
}
