import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';

import { Link, Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';

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
                                        Moje zamówienia
                                    </h2>
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
                                                    
                            
                                <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center border-b-[3px] border-gray-900 bg-gray-100">
                                    <Link href="/check-order" className="text-sm font-medium text-gray-700 ml-5 mr-5">
                                        Moje zamówienia
                                    </Link>
                                </div>
                                                    
                                <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
                                    <Link href="/faq" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                        FAQ
                                    </Link>
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
                                        {auth?.user?.is_admin && (
                                            <Dropdown.Link href={route('admin.dashboard')}>
                                                Panel Admina
                                            </Dropdown.Link>
                                        )}
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



function MainContent({ mojeWizyty }) {
     

    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-3/5 h-[80vh] bg-gray-200 mx-auto rounded-2xl mt-10 shadow-xl'>
                <div className="py-10 h-full flex flex-col relative">
                    
                    <h1 className='text-4xl font-bold text-gray-900 mx-auto flex items-center justify-center'>
                        Lista twoich zamówień
                    </h1>
                    
                    <div className='w-[85%] flex-grow mx-auto mt-8 overflow-y-auto pr-4 space-y-4 pb-6'>
                        {mojeWizyty && mojeWizyty.length > 0 ? (
                            mojeWizyty.map((wizyta) => (
                                <div key={wizyta.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative group hover:shadow-md transition-shadow">
                                    <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#F1511A] to-[#FFAA01]"></div>
                                    
                                    <div className="p-5 pl-8">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h2 className="text-xl font-bold text-gray-900">
                                                    {wizyta.marka} {wizyta.model}
                                                </h2>
                                                <span className="inline-block mt-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 text-xs font-mono uppercase tracking-wider">
                                                    {wizyta.numer_rejestracyjny}
                                                </span>
                                                <p className="text-gray-500 font-medium text-sm mt-3">
                                                    Usługa: <span className="text-[#F1511A] font-semibold">{wizyta.usluga}</span>
                                                </p>
                                            </div>

                                            <div className="text-right flex flex-col items-end">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${                                                    
                                                    wizyta.status === 'oczekujące' ? 'bg-red-200 text-red-600' : 
                                                    wizyta.status === 'rozpatrywane' ? 'bg-blue-200 text-blue-600' : 
                                                    wizyta.status === 'wtrakcie' ? 'bg-orange-200 text-orange-600' :
                                                    wizyta.status === 'gotowe' ? 'bg-green-200 text-green-600':
                                                    wizyta.status === 'oplacone' ? 'bg-gray-800 text-gray-100':
                                                    'gray-200 text-gray-600'
                                                }`}>
                                                    {wizyta.status}
                                                </span>
                                                
                                                <div className="mt-3 text-sm text-gray-600 flex flex-col items-end gap-1">
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

                                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                                            <Link 
                                                href={route('szczegoly', wizyta.id)} 
                                                className="text-sm font-semibold text-[#F1511A] border-2 border-[#F1511A] px-5 py-1.5 rounded-lg hover:bg-[#F1511A] hover:text-white transition-colors duration-200"
                                            >
                                                SZCZEGÓŁY
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl shadow-sm p-10 text-center border border-gray-100 mt-4">
                                <p className='text-gray-600 text-lg'>Nie masz jeszcze żadnych zamówień.</p>
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
                <Header auth={auth} />
                <div className="flex-grow">
                    <MainContent mojeWizyty={mojeWizyty} />
                </div>
            </div>
           
        );
}