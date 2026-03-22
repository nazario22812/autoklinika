import React, { useState } from 'react'; // ДОДАНО useState
import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';

const servicesData = [
    {
        id: "diagnostyka",
        icon: "🔍",
        title: "Diagnostyka Ogólna",
        points: [
            "Pełny przegląd techniczny pojazdu",
            "Wstępna ocena stanu mechanicznego",
            "Wykrywanie źródeł nieszczelności i wycieków",
            "Ocena stanu zawieszenia і płynów eksploatacyjnych"
        ],
        price: "od 100 zł"
    },
    {
        id: "olej_filtry",
        icon: "🛢️",
        title: "Wymiana Oleju і Filtrów",
        points: [
            "Wymiana oleju silnikowego (syntetyczny, półsyntetyczny, mineralny)",
            "Wymiana filtra oleju",
            "Wymiana filtra powietrza і filtra kabinowego",
            "Wymiana filtra paliwa (w zależności od modelu)",
            "Kontrola poziomu pozostałych płynów"
        ],
        price: "od 150 zł"
    },
    {
        id: "uklad_hamulcowy",
        icon: "🛑",
        title: "Naprawa Układu Hamulcowego",
        points: [
            "Wymiana klocków hamulcowych (przód/tył)",
            "Wymiana tarcz hamulcowych",
            "Wymiana płynu hamulcowego i odpowietrzanie układu",
            "Regeneracja i naprawa zacisków hamulcowych",
            "Naprawa układu hamulca ręcznego"
        ],
        price: "od 200 zł"
    },
    {
        id: "klimatyzacja",
        icon: "❄️",
        title: "Serwis Klimatyzacji",
        points: [
            "Napełnianie układu czynnikiem chłodniczym (R134a lub nowy R1234yf)",
            "Sprawdzenie szczelności układu (test próżniowy)",
            "Wymiana oleju w sprężarce",
            "Ozonowanie lub odgrzybianie chemiczne kabiny",
            "Wymiana filtra osuszacza i zaworów"
        ],
        price: "od 250 zł"
    },
    {
        id: "zawieszenie",
        icon: "🔧",
        title: "Naprawa Zawieszenia",
        points: [
            "Wymiana amortyzatorów і sprężyn zawieszenia",
            "Wymiana wahaczy, sworzni і tulei",
            "Wymiana drążków kierowniczych i końcówek drążków",
            "Naprawa i wymiana łożysk kół",
            "Kontrola stanu zawieszenia na szarpakach"
        ],
        price: "od 180 zł"
    },
    {
        id: "diagnostyka_komputerowa",
        icon: "💻",
        title: "Diagnostyka Komputerowa",
        points: [
            "Odczyt i kasowanie błędów silnika (Check Engine)",
            "Diagnostyka układów bezpieczeństwa (ABS, ESP, AIRBAG)",
            "Diagnostyka elektroniki pokładowej i komfortu",
            "Podgląd parametrów pracy silnika w czasie rzeczywistym",
            "Programowanie i adaptacja nowych podzespołów"
        ],
        price: "od 150 zł"
    },
    {
        id: "wymiana_rozrzedu",
        icon: "⚙️",
        title: "Wymiana Rozrządu",
        points: [
            "Kompletna wymiana paska rozrządu (z rolkami i napinaczami)",
            "Wymiana łańcucha rozrządu (w zależności od silnika)",
            "Wymiana pompy wody",
            "Ustawienie faz rozrządu",
            "Gwarancja na wykonaną usługę i części"
        ],
        price: "od 600 zł"
    },
    {
        id: "geometria_kol",
        icon: "📐",
        title: "Geometria Kół",
        points: [
            "Ustawienie zbieżności kół przedniej osi",
            "Ustawienie zbieżności kół tylnej osi (jeśli regulowana)",
            "Regulacja kątów pochylenia kół і wyprzedzenia sworznia",
            "Diagnostyka geometrii 3D (laserowa)"
        ],
        price: "od 200 zł"
    },
    {
        id: "serwis_opon",
        icon: "🚗",
        title: "Serwis Opon / Wulkanizacja",
        points: [
            "Sezonowa wymiana opon (letnie/zimowe/całoroczne)",
            "Komputerowe wyważanie kół",
            "Naprawa przebitych opon (wulkanizacja)",
            "Wymiana zaworów i czujników ciśnienia TPMS",
            "Przechowywanie opon/kół (Hotel dla opon)"
        ],
        price: "od 160 zł"
    },
    {
        id: "naprawa_silnika",
        icon: "🔩",
        title: "Naprawa Silnika",
        points: [
            "Diagnostyka mechaniczna silnika (sprawdzenie kompresji)",
            "Remonty kapitalne silników (wymiana tłoków, pierścieni, panewek)",
            "Naprawa і regeneracja głowic silnika",
            "Wymiana uszczelek (pod głowicą, dekla zaworów, miski olejowej)",
            "Naprawa układu wtryskowego і turbodoładowania"
        ],
        price: "wycena indywidualna"
    }
];

function Header({ auth }) {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" />
                            </Link>
                            <h2 className="ml-4 text-xl font-semibold leading-tight text-gray-800">
                                Nasze usługi
                            </h2>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
                            <Link href="/booking" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                Rezerwacja
                            </Link>
                        </div>
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center border-b-[3px] border-gray-900 bg-gray-100">
                            <Link href="/services" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                Usługi
                            </Link>
                        </div>
                        

                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
                            <Link href="/check-order" className="text-sm font-medium text-gray-700 ml-5 mr-5">
                                Moje zamówienia
                            </Link>
                        </div>
                        
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
                            <Link href="/faq" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                FAQ
                            </Link>
                        </div>
                        
                        
                    
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ml-2 gap-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-3 px-3 py-2 transition duration-150 ease-in-out hover:opacity-80 focus:outline-none">
                                    <span className="text-sm font-medium text-gray-700">
                                        Cześć, {auth?.user?.name || 'Użytkowniku'}!
                                    </span>
                                    <img 
                                        src="https://cdn-icons-png.flaticon.com/128/18827/18827926.png" 
                                        className="h-10 w-10 rounded-full object-cover shadow-sm" 
                                        alt="Avatar" 
                                    />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')} className='font-semibold text-xs'>
                                    Mój profil
                                </Dropdown.Link>
                                <Dropdown.Link className='font-semibold text-xs' href={route('logout')} method="post" as="button">
                                    Wyjście
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function AccordionServiceItem({ service }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300 bg-white first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 overflow-hidden shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="text-4xl text-orange-500 p-3 rounded-xl">{service.icon}</span>
                    <h3 className="text-2xl font-semibold text-gray-800 leading-tight">
                        {service.title}{} <span className="text-xl text-gray-500 ml-4">{service.price}</span>
                    </h3>
                </div>
                <span className={`text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="px-6 pb-6 pt-3 text-lg text-gray-700 leading-relaxed bg-gray-50 border-t border-gray-100">
                    <p className="font-semibold text-gray-900 mb-3">Zakres usługi:</p>
                    <ul className="space-y-2.5 list-disc list-outside ml-6 text-base">
                        {service.points.map((point, index) => (
                            <li key={index}>{point}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function MainContent() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-12 px-2">
            <div className="max-w-7xl mx-auto bg-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                        Pełna Oferta Usługowa Autokliniki
                    </h1>
                    <p className="mt-5 text-xl text-gray-600 max-w-3xl mx-auto">
                        Poznaj szczegółowy zakres naszych profesjonalnych usług mechanicznych і diagnostycznych.
                    </p>
                </div>

                <div className="shadow-lg rounded-2xl border border-gray-300 overflow-hidden">
                    {servicesData.map((service) => (
                        <AccordionServiceItem key={service.id} service={service} />
                    ))}
                </div>

                <p className="text-center text-gray-500 mt-12 italic text-sm">
                    * Podany zakres usług jest orientacyjny. Dokładny koszt і czas naprawy ustalany jest po diagnozie pojazdu.
                </p>
            </div>
        </div>
    );
}

export default function Main({ auth }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Usługi" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
    );
}