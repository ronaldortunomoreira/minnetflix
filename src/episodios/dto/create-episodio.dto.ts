import { IsNumber, IsString } from "class-validator";

export class CreateEpisodioDto {


    @IsString({ message: 'El titulo debe ser una cadena de texto' })
    titulo: string;
    // Columna para almacenar el apellido
    @IsString({ message: 'Debe ingresar la duracion en cadena' })
    duracion: string;
    // Columna para almacenar la fecha de nacimiento
    @IsNumber({}, { message: 'Debe ingresar un número válido' })
    numeroCapitulo: number;

    @IsString( { message: 'Debe ingresar un titulo de serie en formato cadena de texto' })
    tituloSerie: string;
}
