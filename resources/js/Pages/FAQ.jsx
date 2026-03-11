import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';

const faqData = [
    {
        id: 1,
        icon: "📅",
        title: "Rezerwacja i czas naprawy",
        content: [
            { q: "Czy muszę umawiać się z wyprzedzeniem?", a: "Zalecamy rezerwację z wyprzedzeniem, aby uniknąć kolejek. Można to zrobić online przez nasz formularz lub telefonicznie. W nagłych przypadkach staramy się przyjmować auta poza kolejnością." },
            { q: "Ile czasu trwa standardowa naprawa lub przegląd?", a: "Proste usługi, takie jak wymiana oleju czy klocków, zajmują zazwyczaj від 1 do 2 godzin. Większe naprawy wyceniamy indywidualnie po diagnozie." }
        ]
    },
    {
        id: 2,
        icon: "💳",
        title: "Cennik i formy płatności",
        content: [
            { q: "Jakie formy płatności są akceptowane?", a: "Akceptujemy gotówkę, karty płatnicze (Visa, Mastercard) oraz BLIK. Wystawiamy również faktury VAT." },
            { q: "Czy dowiem się o kosztach przed naprawą?", a: "Oczywiście! Każda naprawa poprzedzona jest diagnozą. Przedstawiamy kosztorys i dopiero po Twojej akceptacji zaczynamy pracę." }
        ]
    },
    {
        id: 3,
        icon: "⚙️",
        title: "Części samochodowe",
        content: [
            { q: "Czy mogę przywieźć własne części?", a: "Tak, montujemy części dostarczone przez klienta, jednak gwarancja obejmuje wtedy wyłącznie usługę montażu." },
            { q: "Jakich części używacie?", a: "Proponujemy oryginały (OEM) lub wysokiej klasy zamienniki. Wybór zawsze zależy od Twojego budżetu." }
        ]
    },
    {
        id: 4,
        icon: "🛡️",
        title: "Gwarancja na usługi",
        content: [
            { q: "Jak wygląda kwestia gwarancji?", a: "Na wszystkie usługi mechaniczne oraz części zakupione u nas udzielamy 12-miesięcznej gwarancji." }
        ]
    },
    {
        id: 5,
        icon: "☕",
        title: "Udogodnienia dla klienta",
        content: [
            { q: "Czy oferujecie auto zastępcze?", a: "Tak, dysponujemy flotą aut zastępczych. Prosimy o zgłoszenie potrzeby podczas rezerwacji." },
            { q: "Czy mogę poczekać na auto?", a: "Mamy komfortową poczekalnię z darmową kawą i Wi-Fi." }
        ]
    },
    {
        id: 6,
        icon: "💻",
        title: "Diagnostyka i usterki",
        content: [
            { q: "Zapaliła się kontrolka Check Engine, co robić?", a: "Umów się na diagnostykę komputerową. Zczytamy błędy i powiemy dokładnie, co dolega Twojemu autu." }
        ]
    },
    {
        id: 7,
        icon: "❄️",
        title: "Klimatyzacja i Opony",
        content: [
            { q: "Jak często serwisować klimatyzację?", a: "Zalecamy pełen serwis raz w roku, najlepiej wiosną." },
            { q: "Czy prowadzicie hotel dla opon?", a: "Tak, Twoje koła mogą poczekać u nas na kolejny sezon в odpowiednich warunkach." }
        ]
    }
];

function Header({ auth }) {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/"><ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" /></Link>
                            <h2 className="ml-4 text-xl font-semibold leading-tight text-gray-800">Centrum Pomocy FAQ</h2>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ml-2 gap-10">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-3 px-3 py-2 focus:outline-none">
                                    <span className="text-sm font-medium text-gray-700">Cześć, {auth?.user?.name || 'Nazar'}!</span>
                                    <img src="https://cdn-icons-png.flaticon.com/128/18827/18827926.png" className="h-10 w-10 rounded-full object-cover shadow-sm" alt="Avatar" />
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')} className='font-semibold text-xs'>Mój profil</Dropdown.Link>
                                <Dropdown.Link className='font-semibold text-xs' href={route('logout')} method="post" as="button">Wyjście</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function FAQAccordionItem({ item }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-300 bg-white first:rounded-t-2xl last:rounded-b-2xl last:border-b-0 overflow-hidden shadow-sm">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-6 py-5 focus:outline-none hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <span className="text-3xl text-orange-500 p-3 rounded-xl">{item.icon}</span>
                    <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                </div>
                <span className={`text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                    {item.content.map((qa, index) => (
                        <div key={index} className="mt-4 first:mt-2">
                            <p className="font-bold text-gray-900 text-lg">Q: {qa.q}</p>
                            <p className="mt-1 text-gray-700 leading-relaxed">A: {qa.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function MainContent() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-12 px-4">
            <div className="max-w-7xl mx-auto bg-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                        Najczęściej zadawane pytania
                    </h1>
                    <p className="mt-5 text-xl text-gray-600">
                        Wszystko, co musisz wiedzieć o serwisie w Autoklinice.
                    </p>
                </div>

                <div className="shadow-lg rounded-2xl border border-gray-300 overflow-hidden">
                    {faqData.map((item) => (
                        <FAQAccordionItem key={item.id} item={item} />
                    ))}
                </div>

                <div className='flex justify-between w-full mt-12 px-6 py-8 border-t border-gray-300'>
                    <div className='flex items-center'><span className='text-gray-500 font-medium italic'>email: autoklinika_faq@gmail.com</span></div>
                    <div className='flex items-center'><span className='text-gray-500 font-medium italic'>telefon: +48 123 456 789</span></div>
                </div>
            </div>
        </div>
    );
}

export default function FAQ({ auth }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="FAQ - Autoklinika" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
    );
}