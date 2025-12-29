import { IsString } from "class-validator";

export class CreateSeriesDto {

    @IsString({ message: 'El titulo debe ser una cadena de texto' })
    titulo: string;
    // Columna para almacenar el apellido
    @IsString({ message: 'El genero debe ser una cadena de texto' })
    genero: string;
    // Columna para almacenar la fecha de nacimiento
    @IsString()
    sinopsis: string;
    //fechaNacimiento: string;
     @IsString()
    urlPortada: string;
}

