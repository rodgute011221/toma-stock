import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

//ICONS
import { IoMdArrowDropdown } from "react-icons/io";
import { TbTableExport } from "react-icons/tb";
import { MdOutput } from "react-icons/md";
import { exportarExcel } from "../../core/Excel";
import BtnIcon from "../../components/Buttons/BtnIcon";
import Main from "../../components/Main/Main";
import BtnMenu from "../../components/Buttons/BtnMenu";
import BtnModal from "../../components/Buttons/BtnModal";
import Panel from "../../components/Macros/Panel";
import Modal from "../../components/Modal/Modal";
import Box from "../../components/Macros/Box";
import { Celda, Table } from "../../components/Table/Table";

export type ProductType = {
    id: number,
    Name: string,
    Price: string,
    Stock: string
}
type DataType = {
    titles: string[],
    content: ProductType[]
}

export default function Product() {
    //VARIABLES
    const navigate = useNavigate()
    const location = useLocation()
    const param = location.state?.items as DataType | undefined
    const divRef = useRef<HTMLDivElement>(null);

    const filasPorPagina = 10;


    useEffect(() => {
        if (!param) {
            console.warn("No se encontraron datos, redirigiendo...");
            navigate("/");
        }
    }, [param, navigate]);

    //VARIABLES DE ESTADO
    const [drop, setDrop] = useState(0)
    const [edit, setEdit] = useState<Partial<ProductType> | undefined>(undefined)
    const [data, setData] = useState<ProductType[] | undefined>(param?.content ?? []);
    const [paginaActual, setPaginaActual] = useState(1);


    const ultimoIndice = paginaActual * filasPorPagina;
    const primerIndice = ultimoIndice - filasPorPagina;
    const registro = data?.slice(primerIndice, ultimoIndice);
    const totalPaginas = Math.ceil((data?.length ?? 10) / filasPorPagina);
    const columns = param?.titles

    //CORE
    function clickSubmit(id?: number) {
        if (!id || !edit) return;

        setData((prevLista) =>
            prevLista?.map((item) =>
                item.id === id ? { ...item, ...edit } : item
            )
        );

        setEdit(undefined);
    };

    function eliminarItem(id: number) {
        setData((prevLista) =>
            prevLista?.filter((item) => item.id !== id)
        );
        setDrop(0)
    };

    if (!data) return <p>Cargando datos...</p>;

    useEffect(() => {
        if (!drop) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
                setDrop(0);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drop]);

    if (!param) return <p>Cargando datos...</p>;

    return (
        <Main column gap="20px">
            <Box basis="50px" width="100%">
                <Panel height="max-content" content="end">
                    <BtnIcon onClick={() => exportarExcel(data)}><TbTableExport /></BtnIcon>
                    <BtnIcon onClick={() => navigate("/")}><MdOutput /></BtnIcon>
                </Panel>
            </Box>

            <Table titles={columns}>
                {
                    registro?.map((row, i) =>
                        <Celda index={i} data={row}>
                            <Panel center>
                                <Box className="relative text-2xl">
                                    <BtnIcon onClick={() => setDrop(row["id"])}><IoMdArrowDropdown /></BtnIcon>
                                    {
                                        drop == row["id"]
                                            ?
                                            <Modal className="right-0 top-10">
                                                <Box ref={divRef} className="text-sm bg-[#212121] text-white rounded">
                                                    <Panel column>
                                                        <BtnMenu onClick={() => { setEdit({ id: row["id"], Name: row["Name"], Price: row["Price"], Stock: row["Stock"] }); setDrop(0); }}>Edit</BtnMenu>
                                                        <BtnMenu onClick={() => eliminarItem(row["id"])}>Delete</BtnMenu>
                                                    </Panel>
                                                </Box>
                                            </Modal>

                                            : null
                                    }
                                </Box>

                            </Panel>
                        </Celda>

                    )
                }
                <Panel height="max-content" gap="16px" center>
                    <button
                        disabled={paginaActual === 1}
                        onClick={() => setPaginaActual(prev => prev - 1)}
                        className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
                    >
                        Anterior
                    </button>

                    <span className="font-medium">
                        Página {paginaActual} de {totalPaginas}
                    </span>

                    <button
                        disabled={paginaActual === totalPaginas}
                        onClick={() => setPaginaActual(prev => prev + 1)}
                        className="px-4 py-2 bg-black text-white rounded disabled:bg-gray-300"
                    >
                        Siguiente
                    </button>
                </Panel>
            </Table>


            {
                edit
                    ?
                    <Modal className="w-full h-full top-0 right-0">
                        <Box className="bg-[#21212127] p-10">
                            <Panel center>
                                <Box max className="bg-white rounded p-10">
                                    <Panel center column gap="20px">
                                        <Panel column gap="20px">
                                            <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} type="text" placeholder="Producto" name="Name" className="bg-[#2121212c] rounded p-3" value={edit?.Name} />
                                            <Panel gap="20px">
                                                <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="bg-[#2121212c] rounded p-3 w-full" name="Price" type="text" placeholder="Precio" value={edit?.Price} />
                                                <input onChange={(e) => setEdit((prev) => ({ ...prev, [e.target.name]: e.target.value }))} className="bg-[#2121212c] rounded p-3 w-full" name="Stock" type="text" placeholder="Stock" value={edit?.Stock} />
                                            </Panel>
                                        </Panel>
                                        <Panel gap="20px">
                                            <BtnModal onClick={() => clickSubmit(edit?.id)}>Guardar</BtnModal>
                                            <BtnModal onClick={() => setEdit(undefined)}>Cancelar</BtnModal>
                                        </Panel>

                                    </Panel>
                                </Box>
                            </Panel>
                        </Box>

                    </Modal>

                    : null
            }
        </Main >
    )
}
