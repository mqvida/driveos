import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="max-w-xl text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Drive<span className="text-blue-600">OS</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          Compare veículos de diversas marcas e agende seu test-drive. Seu celular vira sensor — receba um relatório personalizado.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/veiculos"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Ver veículos
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-md px-6 py-3 border border-gray-300 bg-white text-gray-900 font-semibold hover:bg-gray-50 transition-colors"
          >
            Criar conta
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-400">Gratuito para o consumidor</p>
      </div>
    </main>
  );
}
