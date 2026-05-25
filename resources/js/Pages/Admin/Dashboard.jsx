import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import { Users, ClipboardList, Activity, Calendar, MessageSquare, ChevronRight } from 'lucide-react';

import { Link, Head } from '@inertiajs/react';



function Header({ auth }) {
    return (
        <nav className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="shrink-0 flex items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" />
                                    </Link>
                                    <h2 className="ml-4 text-xl font-semibold leading-tight text-gray-800">
                                        Panel Zarządzania
                                    </h2>
                                </div>
                                 
        
                            </div>
        
                            <div className="sm:flex sm:items-center sm:ml-2 gap-10">
                                
                                
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-3 px-3 py-2 transition duration-150 ease-in-out hover:opacity-80 focus:outline-none">
            
                                            <span className="max-sm:hidden text-sm font-medium text-gray-700">
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



function MainContent({ userCount, zamowieniaCount, ostatnieZamowienia, dzisiejszeWizytyCount, pytaniaCount }) {
    const cards = [
        { title: 'Lista użytkowników', desc: 'Zarządzaj bazą klientów', stats: userCount, label: 'użytkowników', icon: Users, link: '/admin/user-list' },
        { title: 'Wszystkie zamówienia', desc: 'Przeglądaj historię zamówień', stats: zamowieniaCount, label: 'zamówień', icon: ClipboardList, link: '/admin/zamowienia' },
        { title: 'Aktywne zamówienia', desc: 'Te, które są w trakcie realizacji', stats: ostatnieZamowienia?.marka + ' ' + ostatnieZamowienia?.model || 'Brak', label: 'ostatnie', icon: Activity, link: '/admin/active-orders' },
        { title: 'Kalendarz wizyt', desc: 'Harmonogram pracy warsztatu', stats: dzisiejszeWizytyCount, label: 'wizyt dzisiaj', icon: Calendar, link: '/admin/calendar' },
        { title: 'Lista pytań', desc: 'Pomóż innym użytkownikom', stats: pytaniaCount, label: 'oczekujących', icon: MessageSquare, link: '/admin/pytania' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-12 px-6">
            <div className="max-w-7xl mx-auto">
               

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card, idx) => (
                        <Link 
                            key={idx}
                            href={card.link} 
                            className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#F1511A]/5 rounded-bl-full translate-x-10 -translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>

                            <div className="flex items-start justify-between mb-6">
                                <div className="p-4 bg-orange-50 rounded-2xl">
                                    <card.icon className="w-8 h-8 text-[#F1511A]" />
                                </div>
                                <ChevronRight className="w-6 h-6 text-gray-300 group-hover:text-[#F1511A] group-hover:translate-x-1 transition-all" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h3>
                            <p className="text-gray-500 text-sm mb-6">{card.desc}</p>

                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-gray-900">{card.stats}</span>
                                <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">{card.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default function Main({ auth, userCount, zamowieniaCount, ostatnieZamowienia, dzisiejszeWizytyCount, pytaniaCount }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Head title="Panel Zarządzania" />
            <Header auth={auth} />
            <div className="flex-grow">
                <MainContent userCount={userCount} zamowieniaCount={zamowieniaCount} ostatnieZamowienia={ostatnieZamowienia} dzisiejszeWizytyCount={dzisiejszeWizytyCount} pytaniaCount={pytaniaCount} />
            </div>
        </div>
        // <>
        //     <Head title="Autoklinika" />
        //     <Header />
        //     <MainContent />
        // />
    );
}