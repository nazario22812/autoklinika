import React, { useState } from 'react';
import { Link, Head , useForm} from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ResponsiveNav from '@/Components/ResponsiveNav';


function PytanieRow({ pytanie }) {
    const [isOpen, setIsOpen] = useState(false);
    const {
                post,
                data,
                setData,
                errors,
                processing,
                recentlySuccessful,   
            } = useForm({
                odpowiedz: '',
            });
        
    
        const submit = (e) => {
            
            e.preventDefault();
            post(route('admin.wyslij-odpowiedz', pytanie.id), {
                onSuccess: () => {
                    setIsOpen(false);
                },
            });
        };
    return (
        <>
            <tr className="hover:bg-gray-300 transition-colors duration-150 group">
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600 font-bold text-center">
                    {pytanie.temat}
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600 text-center">
                    {new Date(pytanie.created_at).toLocaleDateString('pl-PL')}
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-center">
                    {pytanie.status === 'oczekujące' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-yellow-700 bg-yellow-100'>
                            Oczekujące
                        </span>
                    ) : pytanie.status === 'odpowiedziane' ? (
                        <span className='px-3 py-1.5 rounded-lg text-sm font-semibold text-green-700 bg-green-100'>
                            Odpowiedziane
                        </span>
                    ) : null}
                </td>

                <td className="px-4 py-4 sm:px-8 sm:py-5 text-right">
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold text-orange-500 hover:bg-orange-100 transition-colors focus:outline-none"
                    >
                        Szczegóły
                        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                </td>
            </tr>
            <tr>
                <td colSpan="5" className="p-0 border-0">
                    <div className={` overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 border-b border-gray-300' : 'max-h-0 opacity-0'}`}>
                        
                        <div className="grid grid-cols-1 gap-6 px-4 py-6 bg-orange-100 md:grid-cols-2 md:px-8 md:pl-[5%]">
                            <div className="border-b border-gray-300 pb-6 md:border-b-0 md:border-r md:pr-8 md:mr-8">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-1">Treść pytania:</h3>
                                <p className="text-gray-600">{pytanie.tresc}</p>
                            </div>
                            <div className='flex flex-col w-full'>
                                
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">Odpowiedź:</h3>

                                {!pytanie.odpowiedz ? (
                                    <form onSubmit={submit} className="flex flex-col w-full ">
                                        
                                        <textarea
                                            id="odpowiedz"
                                            className="mt-1 block w-full min-h-[120px] max-h-[150px] text-left rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Napisz odpowiedź..."
                                            value={data.odpowiedz}
                                            onChange={(e) => setData('odpowiedz', e.target.value)}
                                            required
                                        />
                                        
                                        <div className="flex justify-end mt-4">
                                            <PrimaryButton type="submit" disabled={processing}>
                                                Wyślij odpowiedź
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="mt-1">

                                        <p className="text-gray-600 font-medium">
                                            {pytanie.odpowiedz}
                                        </p>
                                    </div>
                                )}
                                
                            </div>
                           
                        </div>

                    </div>
                </td>
            </tr>
            
        </>
    );
}


function MainContent({ auth , questions }) {

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
                        Lista pytań
                    </h1>
                </div>
                
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
                    <table className="min-w-full w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Temat</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Data</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-center">Status</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium"></th> 
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {questions.map((pytanie) => (
                                <PytanieRow key={pytanie.id} pytanie={pytanie} />
                            ))}

                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );
}

export default function Main({ auth , questions }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Pytania" />
            {/* <Header auth={auth} /> */}
            <ResponsiveNav auth={auth} pageTitle="Lista pytań" />
            <div className="flex-grow">
                <MainContent questions={questions}  />
            </div>
        </div>
    );
}