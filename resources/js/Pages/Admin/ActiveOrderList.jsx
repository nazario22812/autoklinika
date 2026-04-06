import React, { use, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';



function Header({ auth }) {
    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            <Link href="/"><ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" /></Link>
                            <h2 className="ml-4 text-xl font-semibold leading-tight text-gray-800">Użytkownicy</h2>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center ">
                            <Link href="/booking" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                Rezerwacja
                            </Link>
                        </div>
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center ">
                            <Link href="/services" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                Usługi
                            </Link>
                        </div>
                                            
                    
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
                            <Link href="/check-order" className="text-sm font-medium text-gray-700 ml-5 mr-5">
                                Moje zamówienia
                            </Link>
                        </div>
                                            
                        <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center ">
                            <Link href="/faq" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                FAQ
                            </Link>
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
                                {auth?.user?.is_admin && (
                                    <Dropdown.Link href={route('admin.dashboard')}>
                                        Panel Admina
                                    </Dropdown.Link>
                                )}
                                <Dropdown.Link className='font-semibold text-xs' href={route('logout')} method="post" as="button">Wyjście</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function OrderRow({ zamowienie }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-300 transition-colors duration-150 group">
                <td className="px-8 py-5 text-gray-600 font-bold text-center">
                    {zamowienie.marka}
                </td>
                
                <td className="px-8 py-5 text-gray-600 text-center">
                    {zamowienie.model}
                </td>
                
                <td className="px-8 py-5 text-center">
                    <span className='px-3 py-1.5 rounded-lg text-lg font-semibold text-purple-700 bg-purple-100'>
                        {zamowienie.rok_produkcji}
                    </span>
                </td>
                
                <td className="px-8 py-5 text-center text-sm text-gray-500 font-mono">
                    <span className='px-3 py-1.5 rounded-lg text-lg font-semibold text-green-700 bg-green-100'>
                        {zamowienie.numer_rejestracyjny}
                    </span>
                </td>

                <td className="px-8 py-5 text-right">
                    <button 
                        onClick={() => router.get(route('admin.activeorders.detail', zamowienie.id))}
                        // onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-orange-500 hover:bg-orange-100 transition-colors focus:outline-none"
                    >
                        Zobać
                        {/* <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span> */}
                    </button>
                </td>
            </tr>

            
        </>
    );
}


function MainContent({ auth, zamowienia }) {

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-12 px-4">
            <div className="max-w-7xl mx-auto bg-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">
                <div className='w-full h-10 mx-auto rounded-2xl'>
                        <Link 
                            href={route('admin.dashboard')} 
                            className="pl-4 group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#F1511A] transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Wróć
                        </Link>
                    </div>

                <div className="text-center mb-12 border-b border-gray-300 pb-6">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl leading-tight">
                        Lista aktywnych zamówień
                    </h1>
                </div>
                
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-8 py-4 font-medium text-center">Marka</th>
                                <th className="px-8 py-4 font-medium text-center">Model</th>
                                <th className="px-8 py-4 font-medium text-center">Rok produkcji</th>
                                <th className="px-8 py-4 font-medium text-center">Numer rejestracyjny</th>
                                <th className="px-8 py-4 font-medium text-center"></th> 
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {zamowienia.map((zamowienie) => (
                                <OrderRow key={zamowienie.id} zamowienie={zamowienie} />
                            ))}

                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );
}

export default function Main({ auth, zamowienia }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Aktywne zamówienia" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent zamowienia={zamowienia} />
            </div>
        </div>
    );
}