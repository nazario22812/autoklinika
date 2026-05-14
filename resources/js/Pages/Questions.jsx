import React, { useState } from 'react';
import ResponsiveNav from '@/Components/ResponsiveNav';
import { Link, Head , useForm} from '@inertiajs/react';
import { router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';




function PytanieRow({ pytanie }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-300 transition-colors duration-150 group">
                <td className="px-3 sm:px-6 md:px-8 py-3 sm:py-5 text-gray-600 font-bold text-center text-xs sm:text-sm md:text-base">
                    {pytanie.temat}
                </td>
                
                <td className="hidden sm:table-cell px-3 sm:px-6 md:px-8 py-3 sm:py-5 text-gray-600 text-center text-xs sm:text-sm">
                    {new Date(pytanie.created_at).toLocaleDateString('pl-PL')}
                </td>
                
                <td className="px-3 sm:px-6 md:px-8 py-3 sm:py-5 text-center">
                    {pytanie.status === 'oczekujące' ? (
                        <span className='px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-yellow-700 bg-yellow-100'>
                            Oczekujące
                        </span>
                    ) : pytanie.status === 'odpowiedziane' ? (
                        <span className='px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-green-700 bg-green-100'>
                            Odpowiedziane
                        </span>
                    ) : null}
                </td>

                <td className="px-3 sm:px-6 md:px-8 py-3 sm:py-5 text-right">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-orange-500 hover:bg-orange-100 transition-colors focus:outline-none"
                    >
                        <span className="hidden sm:inline">Szczegóły</span>
                        <span className="sm:hidden">Info</span>
                        <span className={`transform transition-transform duration-300 text-lg ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                </td>
            </tr>
            <tr>
                <td colSpan="5" className="p-0 border-0">
                    <div className={` overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 border-b border-gray-300' : 'max-h-0 opacity-0'}`}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 px-4 sm:px-6 md:px-8 py-4 sm:py-6 bg-orange-100 gap-4 md:gap-0">
                            <div className="md:border-r md:border-gray-300 md:pr-8 md:mr-8">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Treść pytania:</h3>
                                <p className="text-sm sm:text-base text-gray-600">{pytanie.tresc}</p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Odpowiedź:</h3>
                                <p className="text-sm sm:text-base text-gray-600">{pytanie.odpowiedz || 'Brak odpowiedzi na to pytanie.'}</p>
                            </div>
                           
                        </div>

                    </div>
                </td>
            </tr>
            
        </>
    );
}


function MainContent({ auth, mojePytania }) {
        const {
                post,
                data,
                setData,
                errors,
                processing,
                recentlySuccessful,   
            } = useForm({
                temat: '',
                tresc: '',
            });
        
    
        const submit = (e) => {
            
            e.preventDefault();
            post(route('faq.wyslij-pytanie'));
        };
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto bg-gray-200 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12">
                <div className='w-full mb-4 md:mb-6'>
                    <Link 
                        href={route('faq')} 
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#F1511A] transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                            Wróć
                    </Link>
                </div> 
                <div className="text-center mb-8 sm:mb-12 border-b border-gray-300 pb-4 sm:pb-6">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                        Zadaj nam pytanie!
                    </h1>
                </div>
                <form onSubmit={submit} className="my-6 sm:my-10 max-w-4xl mx-auto w-full overflow-hidden relative border-b border-gray-300 pb-6 sm:pb-8">
                    <div  className="space-y-4 sm:space-y-6">
                        <div className='w-full'>
                            <InputLabel htmlFor="temat" value="Temat" />
                        
                            <TextInput
                                id="temat"
                                className="mt-1 block w-full"
                                placeholder="np. problem z hamulcami"
                                value={data.temat}
                                onChange={(e) => setData('temat', e.target.value)}
                                required
                                isFocused
                            />
                        </div>

                        <div className='w-full'>
                            <InputLabel htmlFor="tresc" value="Treść pytania" />
                            <textarea
                                id="tresc"
                                className="mt-1 block w-full min-h-[120px] sm:min-h-[150px] max-h-[200px] text-left rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                placeholder="Opisz swój problem jak najdokładniej, abyśmy mogli Ci pomóc!"
                                value={data.tresc}
                                onChange={(e) => setData('tresc', e.target.value)}
                                required
                                isFocused
                                as="textarea"
                            />
                        </div>
                    </div>
                    <div className="pt-4 sm:pt-6">
                        <PrimaryButton className='w-full sm:w-auto' disabled={processing}>
                            Wyślij
                        </PrimaryButton>
                    </div>
                </form>

                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
                    <table className="w-full text-left border-collapse text-sm md:text-base">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                                <th className="px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-medium text-center">Temat</th>
                                <th className="hidden sm:table-cell px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-medium text-center">Data</th>
                                <th className="px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-medium text-center">Status</th>
                                <th className="px-3 sm:px-6 md:px-8 py-3 sm:py-4 font-medium"></th> 
                            </tr>
                        </thead> 
                        <tbody className="divide-y divide-gray-100">
                            
                            {mojePytania.map((pytanie) => (
                                <PytanieRow key={pytanie.id} pytanie={pytanie} />
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default function Main({ auth, mojePytania }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Zadaj pytanie" />
            <ResponsiveNav auth={auth} pageTitle="Pytania" />
            <div className="flex-grow">
                <MainContent mojePytania={mojePytania} />
            </div>
        </div>
    );
}