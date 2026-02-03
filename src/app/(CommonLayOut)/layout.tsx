import { Navbar } from "@/components/Sheared/navbar1";

 

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ১. নেভবার সবসময় উপরে থাকবে */}
      <Navbar />
      
      {/* ২. মেইন কন্টেন্ট যা পেজ অনুযায়ী চেঞ্জ হবে */}
      <main >
        {children}
      </main>

      {/* ৩. একটি ফুটার অ্যাড করলে সাইটটি কমপ্লিট দেখাবে */}
      {/* <Footer /> */}
    </div>
  );
}