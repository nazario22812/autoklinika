import React, { use, useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import ResponsiveNav from '@/Components/ResponsiveNav';


function UserRow({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <tr className="hover:bg-gray-300 transition-colors duration-150 group">
                <td className="px-4 py-4 sm:px-8 sm:py-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-[#F1511A] flex items-center justify-center font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-gray-800">{user.name} {user.surname}</span>
                    </div>
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-gray-600">
                    {user.email}
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        user.is_admin ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {user.is_admin ? 'ADMIN' : 'KLIENT'}
                    </span>
                </td>
                
                <td className="px-4 py-4 sm:px-8 sm:py-5 text-right text-sm text-gray-500 font-mono">
                    {new Date(user.created_at).toLocaleDateString('pl-PL')}
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
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100 border-b border-gray-300' : 'max-h-0 opacity-0'}`}>
                        
                        <div className="grid grid-cols-1 gap-6 px-4 py-6 bg-gray-50 md:grid-cols-2 md:px-8">
                            <div>
                                <p className="text-sm text-gray-500 font-semibold mb-1">Dodatkowe informacje</p>
                                <p className="text-gray-800">Numer telefonu: <span className="font-mono">{user.phone_number}</span></p>
                            </div>

                            <div className='text-left md:text-right'>
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
                            </div>
                        </div>

                    </div>
                </td>
            </tr>
        </>
    );
}


function MainContent({ auth, uzytkowniki }) {

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
                        Lista użytkowników
                    </h1>
                </div>
                
                <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
                    <table className="min-w-full w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Imię i Nazwisko</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Email</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium">Rola</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium text-right">Data rejestracji</th>
                                <th className="px-4 py-3 sm:px-8 sm:py-4 font-medium"></th> 
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            
                            {uzytkowniki.map((user) => (
                                <UserRow key={user.id} user={user} />
                            ))}

                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    );
}

export default function Main({ auth, uzytkowniki }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Head title="Uzytkowniki" />
            <ResponsiveNav auth={auth} pageTitle="Lista użytkowników" />
            
            <div className="flex-grow">
                <MainContent uzytkowniki={uzytkowniki} />
            </div>
        </div>
    );
}