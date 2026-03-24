import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

//ICONS
import { IoMdArrowDropdown } from "react-icons/io";
import { TbTableExport } from "react-icons/tb";
import { MdOutput } from "react-icons/md";

type ProductType = {
    id: number,
    Name: string,
    Price: string,
    Stock: string
}

const columns = ["Name", "Price", "Stock"]

const Productos: ProductType[] = [
    {
        id: 1,
        Name: "Coca Cola 500ml",
        Price: "3.5",
        Stock: "24"
    },
    {
        id: 2,
        Name: "Fanta 500ml",
        Price: "2.5",
        Stock: "10"
    },
    {
        id: 3,
        Name: "Oreo 50gr",
        Price: "1.5",
        Stock: "12"
    }
]

export default function Product() {
    //VARIABLES
    const navegate = useNavigate()
    const divRef = useRef<HTMLDivElement>(null);

    //VARIABLES DE ESTADO
    const [drop, setDrop] = useState("")
    const [edit, setEdit] = useState<Partial<ProductType> | undefined>(undefined)
    const [data, setData] = useState<ProductType[]>(Productos);

    //VARIABLES DE ESTILOS
    const panel = "w-full flex"
    const frame = "w-full grid grid-cols-[1fr_100px_100px_100px]"
    const btn = "transition rounded h-max"


    //CORE
    function clickSubmit(id?: number) {
        if (!id || !edit) return;

        setData((prevLista) =>
            prevLista.map((item) =>
                item.id === id ? { ...item, ...edit } : item
            )
        );

        setEdit(undefined);
    };

    function eliminarItem(id: number) {
        setData((prevLista) =>
            prevLista.filter((item) => item.id !== id)
        );
    };

    useEffect(() => {
        if (!drop) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setDrop("");
                console.log("Click afuera: Estado cambiado a false");
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drop]);

    return (
        <div className="w-screen h-screen relative flex flex-col p-10 gap-5 overflow-y-auto">
            <div className={panel + " h-max justify-end gap-3"}>
                <button className={btn + " text-2xl w-max hover:bg-[#21212123] p-2 active:scale-90"}><TbTableExport /></button>
                <button className={btn + " text-2xl w-max hover:bg-[#21212123] p-2 active:scale-90"} onClick={() => navegate("/")}><MdOutput /></button>
            </div>
            <div className={panel + " h-full flex-col gap-3 "}>
                <div className={frame + " bg-[#212121] text-white py-2 rounded px-5 text-center"}>
                    {
                        columns.map((e) => <span className={e == "Name" ? "text-left" : ""} key={e}>{e}</span>)
                    }
                    <span>#</span>
                </div>
                <div className={panel + " h-max flex-col flex-wrap gap-3"}>
                    {
                        data.map((row, i) =>
                            <div key={i} className={frame + " py-7 px-5 bg-slate-100 rounded text-center"} >
                                {
                                    columns.map((e) =>
                                        <span key={e} className={e == "Name" ? "text-left" : ""}>{row[e as keyof typeof row]}</span>)
                                }
                                <div className={panel + " h-full relative justify-center items-center text-2xl"}>
                                    <button onClick={() => setDrop(row["Name"])} className="transition p-1 hover:bg-[#21212131] rounded w-max h-max active:scale-90"><IoMdArrowDropdown /></button>
                                    {
                                        drop == row["Name"]
                                            ?
                                            <div ref={divRef} className="absolute z-20 flex flex-col top-10 text-sm right-0 w-max h-max gap-2 bg-[#212121] p-2 text-white rounded">
                                                <button onClick={() => { setEdit({ id: row["id"], Name: row["Name"], Price: row["Price"], Stock: row["Stock"] }); setDrop(""); }} className={btn + " p-3 px-6 hover:bg-[#ffffff27] active:translate-y-0.5"}>Edit</button>
                                                <button onClick={() => eliminarItem(row["id"])} className={btn + " p-3 px-6 hover:bg-[#ffffff27] active:translate-y-0.5"}>Delete</button>
                                            </div>
                                            : null
                                    }
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
            {
                edit
                    ?
                    <div className={panel + " absolute bg-[#21212127] justify-center items-center top-0 right-0 p-10 h-full"}>
                        <div className={panel + " h-max bg-white rounded flex-col p-10 gap-5"}>
                            <div className={panel + " h-full flex-col gap-5"}>
                                <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} type="text" placeholder="Producto" name="Name" className="bg-[#2121212c] rounded p-3" value={edit?.Name} />
                                <div className={panel + " gap-5"}>
                                    <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="bg-[#2121212c] rounded p-3 w-full" name="Price" type="text" placeholder="Precio" value={edit?.Price} />
                                    <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="bg-[#2121212c] rounded p-3 w-full" name="Stock" type="text" placeholder="Stock" value={edit?.Stock} />
                                </div>
                            </div>
                            <div className={panel + " h-max gap-5 justify-center items-center"}>
                                <button className={btn + " bg-[#212121] text-white w-full p-3 active:translate-y-0.5"} onClick={() => clickSubmit(edit?.id)}>Guardar</button>
                                <button className={btn + " bg-[#212121] text-white w-full p-3 active:translate-y-0.5"} onClick={() => setEdit(undefined)}>Cancelar</button>
                            </div>

                        </div>

                    </div>
                    : null
            }
        </div >
    )
}
