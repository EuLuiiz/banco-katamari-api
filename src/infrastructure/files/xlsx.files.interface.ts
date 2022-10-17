import { IFile } from "./files.interface";
import xlsx from 'xlsx';

class XlsxFiles implements IFile {
    parse(filename: string): any[] {
        //Vai ler o arquivo informado
        const data = xlsx.readFile(filename);
        //Vai retornar em formato de json a primeira página do arquivo (indice 0)
        return xlsx.utils.sheet_to_json(data.Sheets[data.SheetNames[0]])
    }
}

export default new XlsxFiles();