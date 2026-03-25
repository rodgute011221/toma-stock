import * as x from 'xlsx';
import type { ProductType } from '../page/Product/Product';

export const importExcel = (file: File, pag: number = 1): Promise<any> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const buffer = event.target?.result;
                if (buffer instanceof ArrayBuffer) {
                    const workbook = x.read(buffer, { type: 'buffer' });
                    const sheetName = workbook.SheetNames[pag - 1];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = x.utils.sheet_to_json(worksheet);
                    const jsonTitles = x.utils.sheet_to_json(worksheet, { header: 1 });
                    const titles = jsonTitles[0] as string[];
                    const data = { titles: titles, content: json }
                    resolve(data);
                }
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
};

export function exportarExcel(datos: ProductType[]) {
    // 1. Convertir el JSON (arreglo de objetos) a una hoja de Excel
    const worksheet = x.utils.json_to_sheet(datos);

    // 2. Crear un libro de trabajo nuevo
    const workbook = x.utils.book_new();

    // 3. Añadir la hoja al libro (puedes ponerle el nombre que quieras a la pestaña)
    x.utils.book_append_sheet(workbook, worksheet, "Reporte de Usuarios");

    // 4. Generar el archivo y forzar la descarga en el navegador
    x.writeFile(workbook, "Datos_Exportados.xlsx");
};
