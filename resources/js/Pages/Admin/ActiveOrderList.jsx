import React, { use, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import ResponsiveNav from '@/Components/ResponsiveNav';




function OrderRow({ zamowienie }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-300 transition-colors duration-150 group">
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600 font-bold text-center">
                    {zamowienie.marka}
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600 text-center">
                    {zamowienie.model}
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-center">
                    <span className='px-3 py-1.5 rounded-lg text-lg font-semibold text-purple-700 bg-purple-100'>
                        {zamowienie.rok_produkcji}
                    </span>
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-center text-sm text-gray-500 font-mono">
                    <span className='px-3 py-1.5 rounded-lg text-lg font-semibold text-green-700 bg-green-100'>
                        {zamowienie.numer_rejestracyjny}
                    </span>
                </td>

                <td className="px-4 py-4 sm:px-8 sm:py-5 text-right">
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
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-gray-200 rounded-3xl shadow-2xl p-6 md:p-12">
                <div className='w-full h-10 rounded-2xl'>
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
                    <table className="min-w-full w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Marka</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Model</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Rok produkcji</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Numer rejestracyjny</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center"></th> 
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
            <ResponsiveNav auth={auth} pageTitle="Lista aktywnych zamówień" />
            <div className="flex-grow">
                <MainContent zamowienia={zamowienia} />
            </div>
        </div>
    );
}