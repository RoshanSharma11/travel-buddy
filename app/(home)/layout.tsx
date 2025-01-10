import NavBar from "@/components/NavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-screen flex flex-col">
        <NavBar />
        <div className="relative flex-1 bg-gray-50">
          {children}
        </div>
      </main>
    </>
  );
}
