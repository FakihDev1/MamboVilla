import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TabsNav from '@/components/TabsNav';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <Header />

      <TabsNav />

      <main className="flex-grow">{children}</main>

      <Footer />
    </div>
  );
}
