export interface User {
    id?: number
    nama: string
    email: string
    telepon?: string
    alamat?: string
    kabupaten?: string
    created_at?: string
    updated_at?: string
    role?: string | undefined;
  }