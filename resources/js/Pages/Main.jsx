import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import Dropdown from '@/Components/Dropdown';
import { Link, Head } from '@inertiajs/react';

function Header() {
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
                        </div>

                        {/* ПОСИЛАННЯ МЕНЮ
                        <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                            <NavLink href="/services" active={false}>
                                Послуги СТО
                            </NavLink>
                            <NavLink href="/booking" active={false}>
                                Записатись
                            </NavLink>
                        </div> */}
                    </div>

                    {/* ПРАВА ЧАСТИНА (Кнопка або випадайка) */}
                    <div className="hidden sm:flex sm:items-center sm:ml-2 gap-10">
                        {/* Кнопка Login */}
                        <Link href="/login" className="inline-flex items-center h-10 px-4 py-2 bg-gray-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            login
                        </Link>

                        {/* Кнопка Register */}
                        <Link href="/register" className="inline-flex items-center h-10 px-4 py-2 bg-red-500 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            register
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
        
    );
}

function MainContent() {
    return (
        <div className=" w-full h-screen lg:h-[900px] overflow-hidden relative">
        <img 
            className="w-full h-full object-cover object-center sm:shrink-0" 
            src="https://th.bing.com/th/id/OIG2.R74b7Phd69gr0TpTGKvN?r=0&o=5&pid=ImgGn" 
            alt="Mechanic at work" 
        />
        </div>
    );
}

export default function Main() {
    return (
        <div className="h-screen overflow-hidden flex flex-col">
            <Head title="Autoklinika" />
            <Header />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
        // <>
        //     <Head title="Autoklinika" />
        //     <Header />
        //     <MainContent />
        // </>
    );
}