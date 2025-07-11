export const payloadMapper = {
  Balai: (data) => ({
    kode: data.kode,
    nama: data.nama,
    r_wilayah_id: data.r_wilayah_id,
  }),
  Korwil: (data) => ({
    kode: data.kode,
    nama: data.nama,
    daops_id: data.daops_id,
  }),
  Daops: (data) => ({
    kode: data.kode,
    nama: data.nama,
    balai_id: data.balai_id,
  }),
}