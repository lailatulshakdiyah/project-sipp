const categoryEndpoints = {
  Balai: "balai/list",
  Korwil: "korwil/list",
  Daops: "daops/list",
  Posko: "posko/list",
  Wilayah: ({ page = 10, perPage = 9051, tipe = "pulau" } = {}) =>
    `wilayah/list3?page=${page}&per_page=${perPage}&tipe=${tipe}`,
};

export default categoryEndpoints;