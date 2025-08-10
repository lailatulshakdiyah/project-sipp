export default function DataDarat({ formData, handleNestedChange, handleChange, handleCheckbox, options }) {
  const renderInput = (field, label, parent = "lokasi") => (
    <div key={field}>
      <label className="block text-sm font-medium capitalize mb-1">{label || field.replace(/_/g, " ")}</label>
      <input
        type="text"
        className="w-full border p-2 rounded"
        value={formData?.[parent]?.[field] || ""}
        onChange={(e) => handleNestedChange(parent, field, e.target.value)}
        placeholder={label?.toLowerCase()}
      />
    </div>
  );

  const renderDropdown = (field, label, parent = "kondisi_lain") => (
    <div key={field}>
      <label className="block text-sm font-medium capitalize mb-1">{label || field.replace(/_/g, " ")}</label>
      <select
        className="w-full border p-2 rounded"
        value={formData[parent][field] || ""}
        onChange={(e) => handleNestedChange(parent, field, e.target.value)}
      >
        <option value="">Pilih</option>
        {options.kondisiLain[field]?.map((opt) => (
          <option key={opt.id} value={opt.id}>{opt.text}</option>
        ))}
      </select>
    </div>
  );

  const renderCuacaDropdown = (field) => (
    <div key={field}>
      <label className="block text-sm font-medium capitalize mb-1">Cuaca {field}</label>
      <select
        className="w-full border p-2 rounded"
        value={formData.cuaca[field] || ""}
        onChange={(e) => handleNestedChange("cuaca", field, e.target.value)}
      >
        <option value="">Pilih</option>
        {options.cuacaDropdown.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const renderCuacaInput = (field, label) => (
    <div key={field}>
      <label className="block text-sm font-medium capitalize mb-1">{label || field.replace(/_/g, " ")}</label>
      <input
        type="number"
        className="w-full border p-2 rounded"
        value={formData.cuaca[field] || ""}
        onChange={(e) => handleNestedChange("cuaca", field, e.target.value)}
        placeholder={label?.toLowerCase()}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Kondisi Umum Lokasi Patroli */}
      <div>
        <h3 className="text-md font-semibold mb-2">Kondisi Umum Lokasi Patroli</h3>
        <div className="grid grid-cols-2 gap-4">
          {renderInput("lat", "Latitude (desimal)")}
          {renderInput("lng", "Longitude (desimal)")}
          {renderInput("desa", "Desa/Kelurahan")}
          {renderInput("kecamatan")}
          {renderInput("kabupaten", "Kabupaten/Kota")}
          {renderInput("provinsi")}
        </div>
      </div>

      {/* Data Patroli Lainnya */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Data Patroli Lainnya</h3>
        <div className="grid grid-cols-2 gap-4">
          {["kondisi_lapang", "potensi_karhutla", "ffcm_kkas", "fwi_ick", "dc_kk", "aktivitas_masyarakat"].map((field) =>
            renderDropdown(field)
          )}
        </div>
      </div>

      {/* Kondisi Cuaca */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Kondisi Cuaca</h3>
        <div className="grid grid-cols-2 gap-4">
          {["pagi", "siang", "sore"].map(renderCuacaDropdown)}
          {renderCuacaInput("curah_hujan", "Curah Hujan (mm)")}
          {renderCuacaInput("suhu", "Suhu (°C)")}
          {renderCuacaInput("kelembapan", "Kelembapan (%)")}
          {renderCuacaInput("angin", "Kecepatan Angin (km/jam)")}
        </div>
      </div>

      {/* Aksesibilitas */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Aksesibilitas</h3>
        <div className="grid grid-cols-2 gap-2">
          {options.aksesibilitas?.map((opt, idx) => (
            <label key={idx} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.aksesibilitas?.includes(opt)}
                onChange={() => handleCheckbox("aksesibilitas", opt)}
                className="mr-2"
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}