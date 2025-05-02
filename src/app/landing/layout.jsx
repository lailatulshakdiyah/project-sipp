import Header from "@/components/header/Header"; // Header khusus beranda

export default function LandingLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}