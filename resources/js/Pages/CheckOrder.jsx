import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNav from '@/Components/ResponsiveNav';

import { Link, Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

function MainContent({ mojeWizyty }) {
     

    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-[80vh] bg-gray-200 rounded-2xl mt-10 shadow-xl'>
                <div className="py-6 sm:py-10 h-full flex flex-col relative">
                    
                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mx-auto flex items-center justify-center text-center'>
                        Lista twoich zamówień
                    </h1>
                    
                    <div className='w-full flex-grow mx-auto mt-4 sm:mt-8 overflow-y-auto pr-4 space-y-4 pb-6'>
                        {mojeWizyty && mojeWizyty.length > 0 ? (
                            mojeWizyty.map((wizyta) => (
                                <div key={wizyta.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#F1511A] to-[#FFAA01]"></div>
                                    
                                    <div className="p-4 sm:p-5 pl-6 sm:pl-8">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                            <div className="flex-1">
                                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                                    {wizyta.marka} {wizyta.model}
                                                </h2>
                                                <span className="inline-block mt-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 text-xs font-mono uppercase tracking-wider">
                                                    {wizyta.numer_rejestracyjny}
                                                </span>
                                                <p className="text-gray-500 font-medium text-sm mt-3">
                                                    Usługa: <span className="text-[#F1511A] font-semibold">{wizyta.usluga}</span>
                                                </p>
                                            </div>

                                            <div className="text-left sm:text-right flex flex-col items-start sm:items-end w-full sm:w-auto">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${                                                    
                                                    wizyta.status === 'oczekujące' ? 'bg-red-200 text-red-600' : 
                                                    wizyta.status === 'rozpatrywane' ? 'bg-blue-200 text-blue-600' : 
                                                    wizyta.status === 'wtrakcie' ? 'bg-orange-200 text-orange-600' :
                                                    wizyta.status === 'gotowe' ? 'bg-green-200 text-green-600':
                                                    wizyta.status === 'oplacone' ? 'bg-gray-800 text-gray-100':
                                                    wizyta.status === 'anulowane' ? 'bg-gray-300 text-gray-500 line-through' :
                                                    'gray-200 text-gray-600'
                                                }`}>
                                                    {wizyta.status}
                                                </span>
                                                
                                                <div className="mt-3 text-sm text-gray-600 flex flex-col items-start sm:items-end gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        <span className="font-semibold">{wizyta.data_wizyty}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                                        <span className="font-semibold">{wizyta.godzina_wizyty}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center sm:justify-end">
                                            <Link 
                                                href={route('szczegoly', wizyta.id)} 
                                                className="text-sm font-semibold text-[#F1511A] border-2 border-[#F1511A] px-4 sm:px-5 py-1.5 rounded-lg hover:bg-[#F1511A] hover:text-white transition-colors duration-200"
                                            >
                                                SZCZEGÓŁY
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-6 sm:p-10 text-center border border-gray-100 mt-4">
                                <p className='text-gray-600 text-base sm:text-lg'>Nie masz jeszcze żadnych zamówień.</p>
                                <Link href="/booking" className="mt-4 inline-block text-[#F1511A] font-semibold hover:underline">
                                    Zarezerwuj wizytę teraz

                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default function Main({ auth, mojeWizyty }) {
    return (
            <div className="h-screen overflow-hidden flex flex-col">
                <Head title="Moje zamówienia" />
                <ResponsiveNav auth={auth} pageTitle="Moje zamówienia" />
                <div className="flex-grow">
                    <MainContent mojeWizyty={mojeWizyty} />
                </div>
            </div>
           
        );
}