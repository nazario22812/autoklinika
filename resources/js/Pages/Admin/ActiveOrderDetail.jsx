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



function MainContent({ zamowienie }) {
    
    const statusy = (status) => { 
        if (status === 'oczekujące') return 'bg-red-200 text-red-600';
        if (status === 'rozpatrywane') return 'bg-blue-200 text-blue-600';
        if (status === 'wtrakcie') return 'bg-orange-200 text-orange-600';
        if (status === 'gotowe') return 'bg-green-200 text-green-600';
        if (status === 'oplacone') return 'bg-gray-800 text-gray-100';
        if (status === 'anulowane') return 'bg-gray-300 text-gray-500 line-through';
        return 'bg-gray-200 text-gray-600';
    }

    const { data, setData, post, processing } = useForm({
        komentarz_mechanika: zamowienie.komentarz_mechanika || '',
        cena: zamowienie.cena || '',
        status: zamowienie.status || 'oczekujące',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.zamowienie.update', zamowienie.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-3/5 h-[80vh] bg-gray-200 mx-auto rounded-2xl mt-10 shadow-xl flex flex-col'>
                <div className="py-5 h-full flex flex-col relative overflow-y-auto">
                    
                    <div className='w-full h-10 mx-auto rounded-2xl'>
                        <Link href={route('admin.activeorders')} className="pl-4 group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#F1511A] transition-colors duration-200">
                            <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                            Wróć
                        </Link>
                    </div>

                    <div className='bg-gray-100 rounded-2xl w-[85%] mx-auto shadow-sm p-8 mt-2 mb-8 flex-grow'>
                        
                        <form onSubmit={handleSubmit}>
                            <div className='flex justify-between items-start border-b border-gray-200 pb-6'>
                                <div>
                                    <p className='text-3xl font-bold text-gray-900'>{zamowienie.marka} {zamowienie.model}</p>
                                    <span className='mt-2 inline-block bg-gray-200 text-gray-600 px-3 py-1 rounded border border-gray-300 text-sm font-mono uppercase tracking-wider'>
                                        {zamowienie.numer_rejestracyjny}
                                    </span>
                                </div>
                                
                                <div className="flex flex-col items-end">
                                    <label className="text-sm text-gray-500 font-semibold mb-1">Status zamówienia</label>
                                    <select 
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className={`rounded-xl text-lg font-bold border border-gray-300 px-4 py-2 uppercase tracking-wide shadow-sm focus:ring-[#F1511A] focus:border-[#F1511A] cursor-pointer ${statusy(data.status)}`}
                                    >
                                        <option value="oczekujące">Oczekujące</option>
                                        <option value="rozpatrywane">Rozpatrywane (Wycena)</option>
                                        <option value="wtrakcie">W trakcie naprawy</option>
                                        <option value="gotowe">Gotowe do odbioru</option>
                                        <option value="oplacone">Opłacone</option>
                                        <option value="anulowane">Anulowane</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        
                                <div className="space-y-6 flex flex-col h-full">
                                    <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 shadow-sm">
                                        <div className="bg-orange-50 p-3 rounded-lg text-[#F1511A]">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium">Wybrana usługa</p>
                                            <p className="text-lg font-bold text-gray-900">{zamowienie.usluga}</p>
                                        </div>
                                    </div>

                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-grow">
                                        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 rounded-t-xl flex justify-between items-center ">
                                            <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                                Komentarz mechanika (opcjonalny)
                                            </h3>
                                        </div>
                                        <textarea 
                                            value={data.komentarz_mechanika}
                                            onChange={(e) => setData('komentarz_mechanika', e.target.value)}
                                            className="w-full flex-grow p-5 text-gray-700 italic min-h-[120px] bg-white border-0 rounded-b-xl focus:ring-2 focus:ring-[#F1511A] outline-none resize-none"
                                            placeholder="Napisz diagnozę lub uwagi do naprawy..."
                                        ></textarea>
                                    </div>
                                </div>

                                <div className="space-y-6 flex flex-col h-full">
                                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
                                        <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 rounded-t-xl flex justify-between items-center ">
                                            <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
                                                Opis problemu od klienta
                                            </h3>
                                        </div>
                                        <div className="p-5 text-gray-600 italic leading-relaxed">
                                            {zamowienie.opis ? `"${zamowienie.opis}"` : <span className="text-gray-400 not-italic">Brak opisu od klienta.</span>}
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 border border-orange-200 rounded-xl mt-auto shadow-sm p-6 flex flex-col items-center text-center">
                                        <h3 className="text-md font-bold text-gray-800 flex items-center gap-2 mb-4">
                                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            Wycena warsztatu (zł)
                                        </h3>
                                        <input 
                                            type="number"
                                            value={data.cena}
                                            onChange={(e) => setData('cena', e.target.value)}
                                            placeholder="Np. 450"
                                            className="w-1/2 text-center text-3xl font-extrabold text-[#F1511A] bg-white border border-orange-300 rounded-xl p-3 focus:ring-2 focus:ring-[#F1511A] focus:border-[#F1511A] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className={`px-8 py-3 rounded-xl text-white font-bold text-lg shadow-md transition-all duration-200 hover:-translate-y-1 ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F1511A] hover:bg-orange-600 hover:shadow-xl'}`}
                                >
                                    {processing ? 'Zapisywanie...' : 'Zapisz zmiany'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Main({ auth, zamowienie }) {
    return (
            <div className="h-screen overflow-hidden flex flex-col">
                <Head title="Moje zamówienia" />
                <Header auth={auth} />
                <div className="flex-grow">
                    <MainContent zamowienie={zamowienie} />
                </div>
            </div>
           
        );
}