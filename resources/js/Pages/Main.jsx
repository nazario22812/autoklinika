import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';

function Header() {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" />
                            </Link>
                        </div>

                        
                    </div>

                    <div className="flex items-center sm:flex-row sm:items-center sm:justify-end gap-3">
                        <Link href="/login" className=" inline-flex items-center justify-center h-10 px-4 py-2 bg-gray-700 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-wide hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            login
                        </Link>

                        <Link href="/register" className="inline-flex items-center justify-center h-10 px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-sm text-white uppercase tracking-wide hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
        
    );
}

function MainContent() {
    return (
        <section className="relative w-full min-h-[calc(100vh-4rem)] overflow-hidden bg-black">
            <div className="absolute inset-0">
                <picture>
                    <source media="(min-width: 1280px)" srcSet="https://th.bing.com/th/id/OIG1.nHpXwQwCbUFVzMZljy15?r=0&o=5&pid=ImgGn" />
                    <source media="(min-width: 768px)" srcSet="https://th.bing.com/th/id/OIG1.nHpXwQwCbUFVzMZljy15?r=0&o=5&pid=ImgGn" />
                    <img
                        className="h-full w-full object-cover object-center"
                        src="https://th.bing.com/th/id/OIG1.nHpXwQwCbUFVzMZljy15?r=0&o=5&pid=ImgGn"
                        alt="Mechanic at work"
                    />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            <div className="relative z-10 flex min-h-[60vh] items-end">
                <div className="w-full max-w-6xl mx-auto px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
                    <div className="max-w-3xl rounded-3xl bg-black/50 border border-white/10 p-6 sm:p-10 backdrop-blur-sm">
                        <p className="text-sm uppercase tracking-[0.3em] text-orange-300 mb-4">
                            Autoklinika - serwis samochodowy
                        </p>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
                            Profesjonalna naprawa i szybka rezerwacja online
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-gray-100 max-w-2xl">
                            Zadbaj o swoje auto w przyjaznym warsztacie. Wybierz usługę, umów termin i sprawdź status zamówienia wygodnie przez internet.
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
                            <Link
                                href="/booking"
                                className="inline-flex items-center justify-center rounded-full bg-[#F1511A] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600"
                            >
                                Zarezerwuj wizytę
                            </Link>
                            <Link
                                href="/services"
                                className="inline-flex items-center justify-center rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-white"
                            >
                                Sprawdź usługi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function Main() {
    return (
        <div className="min-h-screen overflow-hidden flex flex-col bg-white">
            <Head title="Autoklinika" />
            <Header />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
    );
}