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
                <td className="px-4 py-4 sm:px-8 sm:py-5">
                    <div className="flex items-center gap-3">
                        
                        <span className="font-semibold text-gray-800">{zamowienie.marka} {zamowienie.model}</span> 
                    </div>
                </td>

                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600 text-left">
                    <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-green-700 bg-green-100'>
                        {zamowienie.numer_rejestracyjny}
                    </span>
                    
                </td> 
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-left">
                    <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-purple-700 bg-purple-100'>
                        {zamowienie.rok_produkcji}
                    </span>
                </td>
                
                <td className='px-4 py-4 sm:px-8 sm:py-5 text-left'>
                    <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100'>
                        {zamowienie.data_wizyty}
                    </span>
                </td>

                <td className="px-4 py-4 sm:px-8 sm:py-5 text-right "> 
                    <span className='text-orange-500 text-bold-xl'>
                        {zamowienie.usluga}
                    </span>
                </td>



                <td className='px-4 py-4 sm:px-8 sm:py-5 text-right'>
                    {/* {zamowienie.status === 'oczekujące' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-yellow-700 bg-yellow-100'>
                            Oczekujące
                        </span>
                    ) : zamowienie.status === 'rozpatrywane' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-blue-700 bg-blue-100'>
                            Rozpatrywane
                        </span>
                    ) : zamowienie.status === 'wtrakcie' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-orange-700 bg-orange-100'>
                            W trakcie
                        </span>
                    ) : zamowienie.status === 'gotowe' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-green-700 bg-green-100'>
                            Zakończone
                        </span>
                    )
                    :  */}
                    {zamowienie.status === 'oplacone' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-800 bg-gray-100'>
                            Opłacone
                        </span>
                    ) : 
                    zamowienie.status === 'anulowane' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-gray-500 bg-gray-300 line-through'>
                            Anulowane
                        </span>
                    ) : null}  

                </td>

                {/* <td className="px-4 py-4 sm:px-8 sm:py-5 text-right text-sm text-gray-500 font-mono">
                    {new Date(user.created_at).toLocaleDateString('pl-PL')}
                </td>  */}
                {/* {
                    zamowienie.status != 'anulowane' && zamowienie.status != 'oplacone' && (
                        <td className="px-4 py-4 sm:px-8 sm:py-5 text-right">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-orange-500 hover:bg-orange-100 transition-colors focus:outline-none"
                            >
                                Szczegóły
                                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button> 
                        </td> 
                    )
                }  */}
                
            </tr>

            <tr>
                <td colSpan="5" className="p-0 border-0">
                    <div className={` overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 border-b border-gray-300' : 'max-h-0 opacity-0'}`}>
                        
                        <div className="grid grid-cols-1 gap-6 px-4 py-6 bg-gray-100 md:grid-cols-2 md:px-8">
                            <div className='text-left'>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Dodatkowe informacje</p>
                                <p className="text-orange-500 font-bold ">Usluga: <span className="font-mono bg-orange-100 p-2 rounded-xl">{zamowienie.usluga}</span></p>
                                <p className="text-orange-500 font-bold mt-4">Opis: <span className="font-mono bg-orange-100 p-2 rounded-xl">{zamowienie.opis}</span></p>
                            </div>

                            <div className='text-left md:text-right'>
                                
                                {zamowienie.status === 'oczekujące' && (

                                
                                    <button onClick={() => router.post(route('admin.zamowienia.wziaczamowienie', { id: zamowienie.id }))} className="mr-4 px-3 py-1.5 rounded-lg text-sm font-semibold text-green-700 bg-green-100 active:bg-green-300 hover:bg-green-200 transition-colors">
                                        <span className='text-2xl font-bold'>Wziąć w realizację</span>
                                    </button>
                                )}
                                <button onClick={() => router.post(route('admin.zamowienia.anuluj', { id: zamowienie.id } , setIsOpen(!isOpen)))} className="font-bold px-3 py-1.5 rounded-lg text-sm font-semibold text-red-700 bg-red-100 active:bg-red-300 hover:bg-red-200 transition-colors">
                                        <span className='text-2xl font-bold'>Anulować</span>
                                        
                                </button>
                            </div>
                            {/*
                            <div className='text-right pr-10'>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Rola użytkownika</p>
                                {user.is_admin ? (
                                    <button onClick={() => router.post(route('admin.updateRole'), { user_id: user.id })} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-green-700 bg-green-100 active:bg-green-300 hover:bg-green-200 transition-colors">
                                        Zrobić klientem
                                    </button>
                                    
                                ):(
                                    <button onClick={() => router.post(route('admin.updateRole'), { user_id: user.id })} className="px-3 py-1.5 rounded-lg text-sm font-semibold text-purple-700 bg-purple-100 active:bg-purple-300 hover:bg-purple-200 transition-colors">
                                        Zrobić administoratorem
                                    </button>
                                )}
                            </div> */}
                        </div>

                    </div>
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
                        Historia zamówień
                    </h1>
                </div>
                
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
                    <table className="min-w-full w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Marka i Model</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Numer rejestracyjny</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Rok</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Data wizyty</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-right">Usluga</th> 
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-right">Status</th>

                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium"></th> 
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
            <Head title="Historia zamówień" />
            <ResponsiveNav auth={auth} pageTitle="Historia zamówień" />
            
            <div className="flex-grow">
                <MainContent zamowienia={zamowienia}  />
            </div>
        </div>
    );
}