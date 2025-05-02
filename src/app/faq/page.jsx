import FAQ from '@/components/card/FaQs'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import React from 'react'

export default function page() {
  return (
    <main>
      <Header />
      
      {/* FAQs Section */}
      <FAQ />

      <Footer />
    </main>
  )
}
