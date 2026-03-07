import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';

import { Link, Head } from '@inertiajs/react';


function Header({ auth }) {
    return (
        <nav className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                {/* logo */}
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" />
                                    </Link>
                                    <h2 className="ml-4 text-xl font-semibold leading-tight text-gray-800">
                                        Strona główna
                                    </h2>
                                </div>
                                 
        
                            </div>
        
                            {/* ПРАВА ЧАСТИНА (Кнопка або випадайка) */}
                            <div className="hidden sm:flex sm:items-center sm:ml-2 gap-10">
                                
                                {/* <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-gray-900 mr-20">
                                    Dashboard
                                </Link> */}
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
                                         <Dropdown.Link href={route('profile.edit')} className='font-semibold text-xs' > {/*href={route('profile.edit')} */}
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

function MainContent() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-full  bg-gray-200 mx-auto  '>
                <div className="grid grid-cols-2  max-w-7xl mx-auto px-4 h-[450px] overflow-hidden relative">
                    <div className="flex items-center justify-center ">
                        <img 
                            className="w-full h-full rounded-xl shadow-md object-cover object-center sm:shrink-0"
                            src="https://th.bing.com/th/id/OIG2.R74b7Phd69gr0TpTGKvN?r=0&o=5&pid=ImgGn"
                            alt="Mechanic at work"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                Witaj w Autoklinice!
                            </h1>
                            <h2 className="text-2xl  text-gray-700 mb-4">
                                Twoje zaufane miejsce do kompleksowej opieki nad Twoim samochodem.
                            </h2>
                            <p className="text-l text-gray-700 mb-4">
                                szybko, profesjonalnie i z gwarancją jakości.
                            </p>

                            
                            <Link href="/booking" className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-md hover:bg-red-500 transition ms-4">
                                Zarezerwuj wizytę
                            </Link>
                        </div>
                    </div>
            
                </div>
            </div>
            <div className=" w-full h-[200px] lg:h-[900px] overflow-hidden relative">
  
                <div className="grid grid-cols-3 gap-10 max-w-7xl w-full min-h-[300px] mx-auto px-4 overflow-hidden relative rounded-xl shadow-md">
    
  
                    {/* Секція 1: Послуги */}
                    <div className="mt-10 bg-gray-200 p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-sm transition hover:shadow-md">
                        <div className="mb-4 text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[80px] w-[80px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                            </svg>
                        </div>
                        <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                            Zajmiemy się Twoim samochodem kompleksowo – od przeglądu po kompleksową naprawę.
                        </p>
                        <Link href="/services" className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-gray-900 transition ">
                            Odkryj nasze usługi
                        </Link>
                    </div>

                    {/* Секція 2: Статус замовлення */}
                    <div className="mt-10 bg-gray-200 p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-sm transition hover:shadow-md">
                        <div className="mb-4 text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[80px] w-[80px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                            Sprawdź na jakim etapie przebiega naprawa twojego auta w trybie rzeczywistym.
                        </p>
                        <Link href="/check-order" className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-gray-900 transition ">
                            Śledź swoje zamówienie
                        </Link>
                    </div>

                    {/* Секція 3: FAQ */}
                    <div className="mt-10 bg-gray-200 p-8 flex flex-col items-center justify-center text-center rounded-xl shadow-sm transition hover:shadow-md">
                        <div className="mb-4 text-gray-900">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-[80px] w-[80px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                            Masz pytania dotyczące cen lub warunków? Znajdź odpowiedzi tutaj.                        
                        </p>
                        <Link href="/faq" className="inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-gray-900 transition ">
                            Najczęściej zadawane pytania
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default function Main({ auth }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Head title="Autoklinika" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
        // <>
        //     <Head title="Autoklinika" />
        //     <Header />
        //     <MainContent />
        // </>
    );
}