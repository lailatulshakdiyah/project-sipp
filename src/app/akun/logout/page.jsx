"use client";

// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/lib/store/authStore";

// export default function LogoutModal({ setIsOpen }) {
//   const router = useRouter();
//   const { logout } = useAuthStore();

//   const handleLogout = () => {
//     logout();
//     router.replace("/homepage");
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//       <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">Konfirmasi Logout</h2>
//         <p className="text-gray-500 mb-6">Apakah Anda yakin ingin keluar?</p>
//         <div className="flex justify-center gap-4">
//           <button
//             onClick={handleLogout}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//           >
//             Ya, Logout
//           </button>
//           <button
//             onClick={() => setIsOpen(false)}
//             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
//           >
//             Batal
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }