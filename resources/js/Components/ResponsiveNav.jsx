import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';

export default function ResponsiveNav({ auth, pageTitle }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Rezerwacja', href: '/booking' },
        { name: 'Usługi', href: '/services' },
        { name: 'Moje zamówienia', href: '/check-order' },
        { name: 'FAQ', href: '/faq' },
    ];

    return (
        <nav className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center gap-4 shrink-0">
                        <Link href="/">
                            <ApplicationLogo className="block h-10 w-10 fill-current text-gray-900" />
                        </Link>
                        <h2 className="hidden sm:block text-lg md:text-xl font-semibold leading-tight text-gray-800">
                            {pageTitle}
                        </h2>
                    </div>

                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                                    window.location.pathname === link.href
                                        ? 'bg-gray-100 text-gray-900 border-b-[3px] border-gray-900'
                                        : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:bg-gray-200"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMobileMenuOpen
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M4 6h16M4 12h16M4 18h16'
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden sm:flex sm:items-center ml-2">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button className="flex items-center gap-2 px-3 py-2 rounded-md transition hover:bg-gray-200 focus:outline-none">
                                    <span className="text-sm font-medium text-gray-700 hidden sm:inline">
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
                                <Dropdown.Link href={route('profile.edit')} className="text-sm">
                                    Mój profil
                                </Dropdown.Link>
                                {auth?.user?.is_admin && (
                                    <Dropdown.Link href={route('admin.dashboard')} className="text-sm">
                                        Panel Admina
                                    </Dropdown.Link>
                                )}
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm"
                                >
                                    Wyjście
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden pb-4 border-t border-gray-200">
                        <div className="flex flex-col gap-2 pt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <Link
                                href={route('profile.edit')}
                                className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Mój profil
                            </Link>
                            {auth?.user?.is_admin && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Panel Admina
                                </Link>
                            )}
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md transition"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Wyjście
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
