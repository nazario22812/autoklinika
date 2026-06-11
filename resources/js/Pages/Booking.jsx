import ResponsiveNav from '@/Components/ResponsiveNav';
import { Link, Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

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

    const dostepneGodziny = [
        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", 
        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
        "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00"
    ];
    
    return (
        <div className="overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01] py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8">
            <div className='w-full max-w-5xl bg-gray-200 mx-auto rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10'>
                <form onSubmit={submit} className="space-y-6 sm:space-y-8">
                    <div>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center'>Zarezerwuj termin do naprawy w Autoklinice</h1>
                    </div>
                    
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8'>
                        {/* Lewa kolumna */}
                        <div>
                            <section>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <InputLabel htmlFor="marka" value="Marka" />
                                        <TextInput
                                            id="marka"
                                            className="mt-1 block w-full"
                                            placeholder="np. Toyota"
                                            value={data.marka}
                                            onChange={(e) => setData('marka', e.target.value)}
                                            required
                                            isFocused
                                        />
                                    </div>

                                    <div>
                                         <InputLabel htmlFor="model" value="Model" />
                                        <TextInput
                                            id="model"
                                            className="mt-1 block w-full"
                                            placeholder="np. Corolla"
                                            value={data.model}
                                            onChange={(e) => setData('model', e.target.value)}
                                            required
                                            isFocused
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="rok_produkcji"  value="Rok produkcji" />
                                        <TextInput
                                            id="rok_produkcji"
                                            type="number"
                                            className="mt-1 block w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                            placeholder="np. 2008"                                            
                                            value={data.rok_produkcji}
                                            onChange={(e) => setData('rok_produkcji', e.target.value)}
                                            required
                                            isFocused
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="numer_rejestracyjny" value="Numer rejestracyjny" />
                                        <TextInput
                                            id="numer_rejestracyjny"
                                            className="mt-1 block w-full uppercase"
                                            value={data.numer_rejestracyjny}
                                            onChange={(e) => setData('numer_rejestracyjny', e.target.value)}
                                            required
                                            placeholder="np. LUB067AS"
                                            isFocused
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div>
                            <section>
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <InputLabel htmlFor="uslugi" value="Usługi" />
                                        <select 
                                            name="uslugi" 
                                            id="uslugi" 
                                            value={data.uslugi} 
                                            onChange={(e) => setData('uslugi', e.target.value)} 
                                            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
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
                                            className="mt-1 min-h-[100px] sm:min-h-[120px] max-h-[160px] block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            placeholder="Dodatkowe informacje..."
                                            value={data.opis}
                                            onChange={(e) => setData('opis', e.target.value)}
                                        />
                                    </div>

                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div>
                                            <InputLabel htmlFor="data" value="Data" />
                                            <TextInput
                                                id="data"
                                                type="date"
                                                className="mt-1 block w-full"
                                                value={data.data}
                                                onChange={(e) => setData('data', e.target.value)}
                                                required
                                                isFocused
                                            />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="godzina" value="Godzina" />
                                            <select
                                                id="godzina"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                value={data.godzina}
                                                onChange={(e) => setData('godzina', e.target.value)}
                                                required
                                            >
                                                <option value="" disabled>09:00</option>
                                                {dostepneGodziny.map((godz) => (
                                                    <option key={godz} value={godz}>
                                                        {godz}
                                                    </option>
                                                ))}
                                            </select>
                                            <InputError message={errors.godzina} className="mt-2 text-red-600 font-bold" />                                        
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl border border-white-500">
                        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6 border-b pb-2">
                            Podsumowanie rezerwacji
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Marka</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{data.marka || '—'}</span>
                            </div>

                            <div className="flex flex-col sm:border-l sm:pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Model</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{data.model || '—'}</span>
                            </div>

                            <div className="flex flex-col sm:border-l sm:pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rok</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{data.rok_produkcji || '—'}</span>
                            </div>

                            <div className="flex flex-col sm:border-l sm:pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Rejestracja</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900 uppercase">{data.numer_rejestracyjny || '—'}</span>
                            </div>

                            <div className="flex flex-col sm:border-l sm:pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Usługa</span>
                                <span className="text-xs sm:text-sm font-bold text-[#F1511A]">{data.uslugi || '—'}</span>
                            </div>

                            <div className="flex flex-col sm:border-l sm:pl-4 border-gray-100">
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Termin</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-900">{data.data + ' ' + data.godzina || '—'}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <PrimaryButton className='w-full sm:w-auto' disabled={processing}>
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
        <div className="flex flex-col bg-white">
            <Head title="Rezerwacja" />
            <ResponsiveNav auth={auth} pageTitle="Rezerwacja wizyty" />
            <div className="flex-grow">
                <MainContent />
            </div>
        </div>
    );
}
