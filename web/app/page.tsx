import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Logo */}
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="dark:invert"
        />

        {/* Mensaje de bienvenida */}
        <h1 className="text-2xl font-bold text-center sm:text-left">
          🎉 Bienvenido a <span className="text-green-600">MiniMarket</span>
        </h1>
        <p className="text-gray-600 text-center sm:text-left max-w-lg">
          Aquí encontrarás los mejores productos al mejor precio.
          Explora nuestro catálogo y descubre ofertas exclusivas.
        </p>

        {/* Botón para ir a productos */}
        <Link
          href="/products"
          className="rounded-full bg-green-600 text-white font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          Ver productos
        </Link>
      </main>

      {/* Footer */}
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} MiniMarket - Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
