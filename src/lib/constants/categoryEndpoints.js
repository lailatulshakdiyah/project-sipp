const categoryEndpoints = {
  Balai: "balai/list",
  Korwil: "korwil/list",
  Daops: "daops/list",
  Posko: "posko/list",
  Wilayah: ({ page = 1, perPage = 9051, tipe = "pulau" } = {}) =>
  `wilayah/list3?page=${page}&perPage=${perPage}&tipe=${tipe}`,
};

export default categoryEndpoints;
