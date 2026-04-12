import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';

import { Link, Head } from '@inertiajs/react';


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
                                        Dashboard
                                    </h2>
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

function MainContent({ userCount, zamowieniaCount, ostatnieZamowienia, dzisiejszeWizytyCount, pytaniaCount } ){
    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-[90%] h-[80vh] bg-gray-200 mx-auto rounded-2xl mt-10 shadow-xl'>
                <div className=" grid grid-cols-3 grid-rows-2 gap-12 py-10 h-full flex flex-col relative px-20">
                    <Link href='/admin/user-list' className=' rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <div> 
                            <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Lista użytkowników</p>
                            <p className='pt-5 text-gray-600 text-center'>Zarządzaj użytkownikami</p>
                            <p className='text-orange-500 font-bold text-center'>Ilość użytkowników: {userCount}</p>
                        </div>
                    </Link>

                    <Link href='/admin/zamowienia' className='rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <div>
                            <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Wszystkie zamówienia</p>
                            <p className='pt-5 text-gray-600 text-center'>Zarządzaj zamówieniami</p>
                            <p className='text-orange-500 font-bold text-center'>Ilość zamówień: {zamowieniaCount}</p>
                        </div>
                    </Link>
                    
                    <Link href='/admin/active-orders' className='rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <div>
                            <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Lista aktywnych zamówień</p>
                            <p className='pt-5 text-gray-600 text-center'>Zarządzaj swoimi zamówieniami</p>
                            <p className='text-orange-500 font-bold text-center'>Ostatnie zamówienie: {ostatnieZamowienia ? `${ostatnieZamowienia.marka} ${ostatnieZamowienia.model} (${ostatnieZamowienia.numer_rejestracyjny})` : 'Brak aktywnych zamówień'}</p>

                        </div>
                    </Link>
                    <Link href='/admin/calendar' className='rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Kalendarz wizyt</p>
                        <p className='pt-5 text-gray-600 text-center'>Harmonogram pracy warsztatu</p>
                        <p className='text-orange-500 font-bold text-center'>Dzisiejsze wizyty: {dzisiejszeWizytyCount}</p>
                    </Link>
                    <Link href='/admin/pytania' className='rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Lista pytań</p>
                        <p className='pt-5 text-gray-600 text-center'>Pomóż innym użytkownikom</p>
                        <p className='text-orange-500 font-bold text-center'>Ilość oczekujących pytań: {pytaniaCount}</p>


                    </Link>
                    {/* <div className='rounded-2xl bg-gray-300 shadow-xl border-r-8 border-orange-500 hover:bg-gray-700 hover:text-orange-500 hover:shadow-md hover:cursor-pointer'>
                        <p className='text-3xl mt-10 items-center font-mono text-center justify-center'>Lista użytkowników</p>

                    </div> */}
                </div>
                
            </div>

            
        </div>
    );
}

export default function Main({ auth, userCount, zamowieniaCount, ostatnieZamowienia, dzisiejszeWizytyCount, pytaniaCount }) {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Head title="Dashboard" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent userCount={userCount} zamowieniaCount={zamowieniaCount} ostatnieZamowienia={ostatnieZamowienia} dzisiejszeWizytyCount={dzisiejszeWizytyCount} pytaniaCount={pytaniaCount} />
            </div>
        </div>
        // <>
        //     <Head title="Autoklinika" />
        //     <Header />
        //     <MainContent />
        // </>
    );
}