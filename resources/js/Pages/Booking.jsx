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
                                        Rezerwacja wizyty
                                    </h2>
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center border-b-[3px] border-gray-900 bg-gray-100">
                                    <Link href="/booking" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                        Rezerwacja
                                    </Link>
                                </div>
                                <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center ">
                                    <Link href="/services" className="text-sm font-medium text-gray-700 ml-5 mr-5 ">
                                        Usługi
                                    </Link>
                                </div>
                                                    
                            
                                <div className="active:bg-gray-300 active:border-b-[3px] active:border-orange-600 hover:bg-gray-200 hover:border-b-[3px] hover:border-blue-500 h-full w-full flex items-center">
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



function MainContent() {
    const {
            post,
            data,
            setData,
            errors,
            processing,
            recentlySuccessful,   
        } = useForm({
            marka: '',
            model: '',
            rok_produkcji: '',
            numer_rejestracyjny: '',
            uslugi: '',
            opis: '',
            data: '',
            godzina: ''
        });
    

    const submit = (e) => {
        e.preventDefault();
        post(route('wizyta.store'));
    };
    return (
        <div className=" overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-3/5 h-[80vh] bg-gray-200 mx-auto rounded-2xl'>
                <form onSubmit={submit} className="my-10  max-w-7xl mx-auto h-[100%] overflow-hidden relative">
                    <div>
                        <h1 className='text-4xl font-bold text-gray-900 mx-auto flex items-center justify-center mt-6'>Zarezerwuj termin do naprawy w Autoklinice</h1>
                    </div>
                    <div className='grid grid-cols-2 mt-10 px-10'>
                        <div className='h-full'>
                            <section >
                                

                                <div  className="mt-6 space-y-6 h-full ">
                                    <div>
                                        <InputLabel htmlFor="marka" value="Marka" />

                                        <TextInput
                                            id="marka"
                                            className="mt-1 block w-[80%]"
                                            placeholder="np. Toyota"
                                            value={data.marka}
                                            onChange={(e) => setData('marka', e.target.value)}
                                            required
                                            isFocused
                                        />

                                        {/* <InputError className="mt-2" message={errors.marka} /> */}
                                    </div>

                                    <div>
                                         <InputLabel htmlFor="model" value="Model" />

                                        <TextInput
                                            id="model"
                                            className="mt-1 block w-[80%]"
                                            placeholder="np. Corolla"
                                            value={data.model}
                                            onChange={(e) => setData('model', e.target.value)}
                                            required
                                            isFocused
                                        />

                                        {/*<InputError className="mt-2" message={errors.model} /> */}
                                    </div>

                                    <div>
                                         <InputLabel htmlFor="rok_produkcji"  value="Rok produkcji" />

                                        <TextInput
                                            id="rok_produkcji"
                                            type="number"
                                            className="mt-1 block w-[80%] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="np. 2008"                                            
                                            value={data.rok_produkcji}

                                            onChange={(e) => setData('rok_produkcji', e.target.value)}
                                            required
                                            isFocused
                                            
                                        />

                                        {/*<InputError className="mt-2" message={errors.phone_number} /> */}
                                    </div>


                                    <div>
                                        <InputLabel htmlFor="numer_rejestracyjny" value="Numer rejestracyjny" />

                                        <TextInput
                                            id="numer_rejestracyjny"
                                            className="mt-1 block w-[80%] uppercase"
                                            value={data.numer_rejestracyjny}
                                            onChange={(e) => setData('numer_rejestracyjny', e.target.value)}
                                            required
                                            placeholder="np. LUB067AS"
                                            isFocused
                                        />

                                        {/*<InputError className="mt-2" message={errors.email} /> */}
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className='h-full'>
                            <section>
                                <div className="mt-6 space-y-6 h-full">
                                    <div>
                                        <InputLabel htmlFor="uslugi" value="Usługi" />
                                        <select 
                                            name="uslugi" 
                                            id="uslugi" 
                                            value={data.uslugi} 
                                            onChange={(e) => setData('uslugi', e.target.value)} 
                                            className='w-[80%] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                                            
                                        >
                                            <option value="" disabled>Wybierz usługę</option>
                                            <option value="Diagnostyka ogólna">Diagnostyka ogólna</option>
                                            <option value="Wymiana oleju i filtrów">Wymiana oleju i filtrów</option>
                                            <option value="Naprawa układu hamulcowego">Naprawa układu hamulcowego</option>
                                            <option value="Serwis klimatyzacji">Serwis klimatyzacji</option>
                                            <option value="Naprawa zawieszenia">Naprawa zawieszenia</option>
                                            <option value="Diagnostyka komputerowa">Diagnostyka komputerowa</option>
                                            <option value="Wymiana rozrządu">Wymiana rozrządu</option>
                                            <option value="Geometria kół">Geometria kół</option>
                                            <option value="Serwis opon / Wulkanizacja">Serwis opon / Wulkanizacja</option>
                                            <option value="Naprawa silnika">Naprawa silnika</option>
                                            
                                        </select>
                                        
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="opis" value="Opis problemu" />
                                        <textarea
                                            id="opis"
                                            className="mt-1 h-[135px] block w-[80%] rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Dodatkowe informacje..."
                                            value={data.opis}
                                            onChange={(e) => setData('opis', e.target.value)}
                                        />
                                    </div>

                                    <div className='grid grid-cols-2'>

                                        <div>
                                            <InputLabel htmlFor="data" value="Data" />
                                            <TextInput
                                                id="data"
                                                type="date"
                                                className="mt-1 block w-[60%]"
                                                value={data.data}
                                                onChange={(e) => setData('data', e.target.value)}
                                                required
                                                isFocused
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="godzina" value="Godzina" />
                                            <TextInput

                                                id="godzina"    
                                                type="time"
                                                className="mt-1 block w-[60%]"
                                                value={data.godzina}
                                                onChange={(e) => setData('godzina', e.target.value)}
                                                required
                                                isFocused
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div className="mt-10 p-10 rounded-2xl border border-white-500">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">
                            Podsumowanie rezerwacji
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Marka</span>
                                <span className="text-sm font-semibold text-gray-900">{data.marka || '—'}</span>
                            </div>

                            <div className="flex flex-col border-l pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Model</span>
                                <span className="text-sm font-semibold text-gray-900">{data.model || '—'}</span>
                            </div>

                            <div className="flex flex-col border-l pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rok</span>
                                <span className="text-sm font-semibold text-gray-900">{data.rok_produkcji || '—'}</span>
                            </div>

                            <div className="flex flex-col border-l pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rejestracja</span>
                                <span className="text-sm font-semibold text-gray-900 uppercase">{data.numer_rejestracyjny || '—'}</span>
                            </div>

                            <div className="flex flex-col border-l pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Usługa</span>
                                <span className="text-sm font-bold text-[#F1511A]">{data.uslugi || '—'}</span>
                            </div>

                            <div className="flex flex-col border-l pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Termin</span>
                                <span className="text-sm font-semibold text-gray-900">{data.data + ' ' + data.godzina || '—'}</span>
                            </div>

                        </div>
                    </div>
                    <div className="px-10">
                        <PrimaryButton  className='' disabled={processing}>
                            Potwierdź rezerwację
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default function Main({ auth }) {
    return (
            <div className="h-screen overflow-hidden flex flex-col">
                <Head title="Rezerwacja" />
                <Header auth={auth} />
                <div className="flex-grow">
                    <MainContent />
                </div>
            </div>
           
        );
}