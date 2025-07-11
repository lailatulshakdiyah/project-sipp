const categoryEndpoints = {
  Balai: "balai/list",
  Korwil: "korwil/list",
  Daops: "daops/list",
  Posko: "posko/list",
  Wilayah: ({ tipe = "pulau" } = {}) =>
    `wilayah/list3?tipe=${tipe}`, // biarkan getAllPaginatedData yang mengatur page & perPage
};

export default categoryEndpoints;
