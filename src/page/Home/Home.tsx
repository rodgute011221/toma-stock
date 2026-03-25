import { useRef } from "react"
import { useNavigate } from "react-router"
import { importExcel } from "../../core/Excel";
import BtnText from "../../components/Buttons/BtnText";
import Main from "../../components/Main/Main";

export default function Home() {
    const navigate = useNavigate()
    const fileRef = useRef<HTMLInputElement>(null)

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const excelData = await importExcel(file);
            navigate("/product", { state: { items: excelData } });
        } catch (error) {
            console.error("Error al procesar el Excel", error);
        }
    }

    return (
        <Main center>
            <BtnText onClick={() => fileRef.current?.click()}>Upload</BtnText>
            <input ref={fileRef} onChange={handleFileChange} type="file" hidden />
        </Main>
    )
}
