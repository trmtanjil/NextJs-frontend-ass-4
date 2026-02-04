import { Navbar } from "@/components/Sheared/navbar1";
import { Toaster } from "sonner"; // ১. Sonner থেকে Toaster ইমপোর্ট করো

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ১. নেভবার সবসময় উপরে থাকবে */}
      <Navbar />
      
      {/* ২. মেইন কন্টেন্ট যা পেজ অনুযায়ী চেঞ্জ হবে */}
      <main className="flex-grow">
        {children}
      </main>

      {/* ৩. টোস্টার কম্পোনেন্টটি এখানে রাখো */}
      {/* richColors দিলে সাকসেস মেসেজ সবুজ আর এরর লাল দেখাবে */}
      <Toaster richColors position="top-right" closeButton />

      {/* ৪. একটি ফুটার অ্যাড করলে সাইটটি কমপ্লিট দেখাবে */}
      {/* <Footer /> */}
    </div>
  );
}