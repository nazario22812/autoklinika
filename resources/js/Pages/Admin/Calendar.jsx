import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNav from '@/Components/ResponsiveNav';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import plLocale from '@fullcalendar/core/locales/pl'; // Польська мова


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
            {/* <Header auth={auth} />             */}
            <ResponsiveNav auth={auth} pageTitle="Kalendarz Wizyt" />
            
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