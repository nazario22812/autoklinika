import ResponsiveNav from '@/Components/ResponsiveNav';
import { Link, Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

function MainContent({ zamowienie }) {
     
    const statusy = (status) => { 
        if (status === 'oczekujące') return 'bg-red-200 text-red-600';
        if (status === 'rozpatrywane') return 'bg-blue-200 text-blue-600';
        if (status === 'wtrakcie') return 'bg-orange-200 text-orange-600 ';
        if (status === 'gotowe') return 'bg-green-200 text-green-600';
        if (status === 'oplacone') return 'bg-gray-800 text-gray-100';
        if (status === 'anulowane') return 'bg-gray-300 text-gray-500 line-through';
        return 'bg-gray-200 text-gray-600';
    }
    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-200 rounded-2xl mt-8 shadow-xl'>
                <div className="py-5 h-full flex flex-col relative overflow-y-auto">
                    
                    {/* Кнопка "Wróć" */}
                    <div className='mb-4'>
                        <Link 
                            href="/check-order" 
                            className="pl-4 group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#F1511A] transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Wróć
                        </Link>
                    </div>

                    {/* Головна картка */}
                    <div className='bg-gray-100 rounded-2xl w-full mx-auto shadow-sm p-6 sm:p-8 mt-4 mb-8'>
                        
                        {/* Шапка: Авто та Статус */}
                        <div className='flex justify-between items-start border-b border-gray-200 pb-6'>
                            <div>
                                <p className='text-3xl font-bold text-gray-900'>{zamowienie.marka} {zamowienie.model}</p>
                                <span className='mt-2 inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded border border-gray-300 text-sm font-mono uppercase tracking-wider'>
                                    {zamowienie.numer_rejestracyjny}
                                </span>
                            </div>
                            <div>
                                <p className={`rounded-xl text-lg font-bold border border-gray-300 px-4 py-2 uppercase tracking-wide shadow-sm ${statusy(zamowienie.status)}`}>
                                    {zamowienie.status}
                                </p>
                            </div>
                        </div>

                        {/* СІТКА НА ДВІ КОЛОНКИ */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
    
                            {/* ЛІВА КОЛОНКА */}
                            <div className="space-y-6">
                                
                                {/* 1. Дата і час */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:border-[#F1511A] transition-colors">
                                    <div className="bg-orange-50 p-3 rounded-lg text-[#F1511A]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Data i czas wizyty</p>
                                        <p className="text-lg font-bold text-gray-900">{zamowienie.data_wizyty} <span className="text-gray-400 font-normal">o</span> {zamowienie.godzina_wizyty}</p>
                                    </div>
                                </div>

                                {/* 2. Послуга */}
                                <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm hover:border-[#F1511A] transition-colors">
                                    <div className="bg-orange-50 p-3 rounded-lg text-[#F1511A]">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium">Wybrana usługa</p>
                                        <p className="text-lg font-bold text-gray-900">{zamowienie.usluga}</p>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col hover:border-[#F1511A] transition-colors">
                                    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 rounded-t-xl flex justify-between items-center ">
                                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                            Komentarz mechanika
                                        </h3>
                                    </div>
                                    <div className="p-5 text-gray-600 italic leading-relaxed min-h-[120px]">
                                        {zamowienie.cena ? (
                                           <div className=" text-gray-700 italic flex-grow">
                                                {zamowienie.komentarz_mechanika ? `"${zamowienie.komentarz_mechanika}"` : <span className="text-gray-400 not-italic">Brak uwag...</span>}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 not-italic flex flex-col float-left justify-center h-full text-center mt-2">
                                                Oczekuje na diagnozę...
                                            </span>
                                        )}
                                    </div>
                                </div>

                            </div>


                            {/* ПРАВА КОЛОНКА */}
                            <div className="space-y-6 md:space-y-10">
                                
                                {/* 1. Опис від клієнта */}
                                <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col hover:border-[#F1511A] transition-colors">
                                    <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 rounded-t-xl flex justify-between items-center ">
                                        
                                        
                                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                            Twój opis problemu
                                        </h3>
                                    </div>
                                    <div className="p-5 text-gray-600 italic leading-relaxed min-h-[120px]">
                                        {zamowienie.opis ? (
                                            `"${zamowienie.opis}"`
                                        ) : (
                                            <span className="text-gray-400 not-italic flex flex-col items-center justify-center h-full text-center mt-2">
                                                Brak opisu dodatkowego
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 2. Ціна */}
                                <div className="bg-white border border-gray-200 rounded-xl mt-10 shadow-sm flex flex-col hover:border-[#F1511A] transition-colors">
                                    <h3 className="text-md font-bold text-gray-800 m-1 flex items-center gap-2 p-2">
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        Wycena warsztatu
                                    </h3>
                                    
                                    {zamowienie.cena ? (
                                        <div className="bg-orange-50 rounded-xl p-5 shadow-sm border border-orange-200 flex flex-col justify-center items-center text-center flex-grow">
                                            <p className="text-gray-500 text-sm font-medium mb-1">Całkowity koszt do zapłaty</p>
                                            <p className="text-4xl font-extrabold text-[#F1511A]">{zamowienie.cena} zł</p>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border-2 border border-gray-200 rounded-xl p-6 text-center flex flex-col items-center justify-center flex-grow">
                                            <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            <p className="text-gray-600 font-medium text-sm">Mechanik jeszcze nie wycenił usługi.</p>
                                        </div>
                                    )}
                                </div>

                                

                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Main({ auth, zamowienie }) {
    return (
            <div className="min-h-screen overflow-hidden flex flex-col">
                <Head title="Moje zamówienia" />
                <ResponsiveNav auth={auth} pageTitle="Moje zamówienia" />
                <div className="flex-grow">
                    <MainContent zamowienie={zamowienie} />
                </div>
            </div>
           
        );
}