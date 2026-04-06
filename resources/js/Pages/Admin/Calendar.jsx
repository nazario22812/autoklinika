import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

// Імпорти для календаря
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl'; // Польська мова

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
                                        Kalendarz Wizyt
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

export default function CalendarPage({ auth, events }) {
    
    const handleEventClick = (clickInfo) => {
        clickInfo.jsEvent.preventDefault(); 
        
        if (clickInfo.event.url) {
            router.get(clickInfo.event.url);
        }
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <Head title="Kalendarz Wizyt - Autoklinika" />
            <Header auth={auth} />
            
            <div className="flex-grow overflow-y-auto py-10 px-4">
                
                <div className="max-w-7xl mx-auto bg-white p-8 rounded-3xl shadow-2xl">
                    <div className='w-full h-10 mx-auto rounded-2xl'>
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
                    <div className="mb-6 flex justify-between items-center border-b border-gray-200 pb-4">
                        <h1 className="text-3xl font-extrabold text-gray-900">Harmonogram pracy</h1>
                        <div className="flex gap-4 text-sm font-medium text-gray-500">
                            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#F1511A]"></div> W trakcie / Oczekujące</span>
                            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> Gotowe</span>
                            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-800"></div> Opłacone</span>
                        </div>
                    </div>

                    <div className="calendar-container">
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                            initialView="timeGridWeek" 
                            headerToolbar={{
                                left: 'prev,next today',
                                center: 'title',
                                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                            }}
                            locales={[plLocale]}
                            locale="pl"
                            slotMinTime="08:00:00" 
                            slotMaxTime="21:00:00" 
                            allDaySlot={false} 
                            events={events} 
                            eventClick={handleEventClick} 
                            height="auto"
                            slotEventOverlap={false} 
                        />
                    </div>

                </div>
            </div>

            <style>{`
                .fc-theme-standard th {
                    padding: 8px 0;
                    background-color: #f9fafb;
                }
                .fc-event {
                    cursor: pointer;
                    transition: transform 0.2s;
                    border: none;
                    border-radius: 4px;
                    padding: 2px 4px;
                }
                .fc-event:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }
                .fc-button-primary {
                    background-color: #4b5563 !important;
                    border-color: #4b5563 !important;
                }
                .fc-button-active {
                    background-color: #F1511A !important;
                    border-color: #F1511A !important;
                }
                .fc-today-button {
                    background-color: #F1511A !important;
                    border-color: #F1511A !important;
                }
            `}</style>
        </div>
    );
}