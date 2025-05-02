"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

const faqs = [
  {
    question: "Cek Penulisan Jabatan",
    answers: [
      "<strong class='text-accent'>Penulisan yang sering keliru :</strong>",
      "- Ketua Tim",
      "- Anggota Tim",
      "- Polisi",
      "- Tentara",
      "",
      "<strong class='text-accent'>Penulisan yang benar:</strong>",
      "- Ketua",
      "- Anggota",
      "- Polri",
      "- TNI",
      "- MPA",
    ],
  },
  {
    question: "Cek Reg, Email dan nomor Handphone",
    answers: [
      "Untuk TNI, Polri, dan MPA kolom reg, email serta no HP dituliskan sesuai dengan kolom nama tanpa spasi.",
    ],
  },
  {
    question: "Cek Daerah Operasi",
    answers: ["Daerah operasi diisikan dengan kodefikasi."],
  },
  {
    question: "Cek Nomor SK",
    answers: ["Nomor SK pada semua baris harus sama."],
  },
  {
    question: "Cek Format Tanggal pada Surat Tugas",
    answers: ["Format tanggal yang benar adalah text."],
  },
  {
    question: "Cek Daerah Patroli, Kecamatan, Kabupaten, Provinsi",
    answers: [
      "Penulisan nama daerah harus sesuai dengan di basis data. Jika nama daerah belum ada dalam basis data, maka nama daerah harus ditambahkan oleh admin.",
    ],
  },
  {
    question: "Error baris tidak dapat diproses",
    answers: [
      "Hapus baris kosong di bawah table yang berisi atau copy tabel ke file Excel baru.",
    ],
  },
  {
    question: "Format file yang diunggah",
    answers: ["Format file yang diunggah memiliki format .XLSX"],
  },
  {
    question: "Network Error",
    answers: [
      "Kendala sinyal, silahkan unggah kembali surat tugas pada kondisi sinyal yang bagus.",
    ],
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-5 mb-5">
      <h2 className="text-4xl font-bold text-center text-white mb-5 mt-10 bg-[#0099CC] rounded-xl">
        FAQs
        <p className="text-2xl font-semibold text-white text-center">
          (Frequently Asked Questions)
        </p>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 hover:bg-gray-100 opacity-75 transition-all duration-300"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-left"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>
        ))}
      </div>
      {openIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 mt-20 rounded-lg max-w-lg w-full relative overflow-hidden">
            <button
              onClick={() => setOpenIndex(null)}
              className="absolute top-2 right-2"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {faqs[openIndex].question}
            </h3>
            <div className="text-gray-700 max-h-96 overflow-auto">
              {faqs[openIndex].answers.map((answer, ansIndex) => (
                <p
                  key={ansIndex}
                  className="mb-2"
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
