import { IsNotEmpty, IsString } from "class-validator";

export class CreateCollageMakerDto {

    @IsString()
    @IsNotEmpty()
    columns: string
}
