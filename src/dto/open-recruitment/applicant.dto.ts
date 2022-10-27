import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsUrl } from "class-validator";

export class ApplicantDto {
    @ApiProperty({
        readOnly: true,
        type: Number,
        description: 'Akan dibuat oleh server'
    })
    id: number;

    @ApiProperty({
        example: '5026211118',
        type: BigInt,
        description: "Merupakan NRP dari mahasiswa"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    nrp: bigint;


    @ApiProperty({
        example: 'Fahrul Ramadhan Putra',
        type: String,
        description: "Merupakan nama lengkap dari mahasiswa"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    namaLengkap: string

    @ApiProperty({
        example: 'Fahrul',
        type: String,
        description: "Merupakan nama panggilan dari mahasiswa"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    namaPanggilan: string;

    @ApiProperty({
        example: 21,
        type: Number,
        description: "Merupakan angkatan dari mahasiswa"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    angkatan: number;

    @ApiProperty({
        example: 1,
        type: Number,
        description: "Merupakan id dari departemen"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    departemenId: number;

    @ApiProperty({
        example: 2,
        type: Number,
        description: "Merupakan id dari fakultas"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    fakultasId: number;

    @ApiProperty({
        example: 1,
        type: Number,
        description: "Merupakan id dari divisi pilihan pertama yang ada di ILITS"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    divisiIlitsId: number;

    @ApiProperty({
        example: 2,
        type: Number,
        description: "Merupakan id dari divisi pilihan kedua yang ada di ILITS"
    })
    @IsNumber({},{message: "Wajib diisi angka"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    divisiIlits2Id: number;

    @ApiProperty({
        example: "Alasan saya memilih divisi ini adalah...",
        type: String,
        description: "Merupakan alasan mahasiswa untuk masuk divisi pilihan pertama yang ada di ILITS"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    alasan_divisi_pertama: string;

    @ApiProperty({
        example: "Alasan saya memilih divisi ini adalah...",
        type: String,
        description: "Merupakan alasan mahasiswa untuk masuk divisi pilihan kedua yang ada di ILITS"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    alasan_divisi_kedua: string;

    @ApiProperty({
        example: 'ILITS merupakan ...',
        type: String,
        description: "Merupakan pemahaman mahasiswa mengenai ILITS"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    pemahaman_ilits: string;

    @ApiProperty({
        example: 'Semangat perguruan tinggi sangat penting karena...',
        type: String,
        description: "Merupakan pemahaman mahasiswa mengenai semangat perguruan tinggi"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    semangat_perguruan_tinggi: string;

    @ApiProperty({
        example: 'Saya ingin...',
        type: String,
        description: "Merupakan motivasi mahasiswa mengikuti ILITS"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    motivasi: string;


    @ApiProperty({
        example: 'Kesibukan saya saat ini adalah...',
        type: String,
        description: "Merupakan deskripsi kesibukan mahasiswa selama beberapa bulan kedepan"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    kesibukan: string;  

    @ApiProperty({
        example: 'Kesibukan saya saat ini adalah...',
        type: Number,
        minimum: 0,
        maximum: 10,
        description: "Merupakan deskripsi prioritas mahasiswa terhadap ILITS"
    })
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    skala_prioritas: number;

    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url file CV mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    cv: string;

    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url hasil MBTI mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    mbti: string;

    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url file bukti mengupload Twibbon ILITS"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    twibbon: string;
    
    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url file bukti mengikuti IG ILITS"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    follow_ig: string;

    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url file bukti menmbagikan Open Recruitment"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    share_oprec: string;

    @ApiProperty({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url file KTM atau KRS mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    @IsNotEmpty({message: "Pertanyaan wajib dijawab"})
    ktm_krs: string; 

    @ApiPropertyOptional({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url portofolio mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    porto: string;

    @ApiPropertyOptional({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url special requirements mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    special_req: string;

    @ApiPropertyOptional({
        example: 'https://drive.google.com/',
        type: String,
        description: "Merupakan url github mahasiswa"
    })
    @IsUrl({message: "Masukkan harus berupa URL"})
    github: string;

    @ApiProperty({
        readOnly: true,
        type: String,
        description: 'Akan dibuat oleh server, dan zona waktu akan mengikuti zona waktu server'
    })
    @Type(() => Date)
    createdAt: Date;

    @ApiProperty({
        readOnly: true,
        type: String,
        description: 'Akan dibuat oleh server, dan zona waktu akan mengikuti zona waktu server'
    })
    @Type(() => Date)
    updatedAt: Date;
}