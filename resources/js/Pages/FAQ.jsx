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
                                        Najczęściej zadawane pytania
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
    
    
    return (
        <div className=" overflow-hidden min-h-screen bg-gradient-to-b from-[#F1511A] to-[#FFAA01]">
            <div className='w-3/5 h-[80vh] bg-gray-200 mx-auto rounded-2xl'>
                <div className="my-10  max-w-7xl mx-auto h-[100%]  relative">
                    
                    
                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    📅 Rezerwacja i czas naprawy
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Czy muszę umawiać się z wyprzedzeniem? 
                                            </p>
                                            <span>
                                                Odpowiedź: Zalecamy rezerwację z wyprzedzeniem, aby uniknąć kolejek. Można to zrobić online przez nasz formularz lub telefonicznie. W nagłych przypadkach (np. awaria na drodze) staramy się przyjmować auta poza kolejnością.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Ile czasu trwa standardowa naprawa lub przegląd?
                                            </p>
                                            <span>
                                                Odpowiedź: Proste usługi, takie jak wymiana oleju czy klocków hamulcowych, zajmują zazwyczaj od 1 do 2 godzin. Większe naprawy wyceniamy i planujemy indywidualnie, o czym zawsze informujemy po diagnozie.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>
                    
                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    💳 Cennik i formy płatności
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Jakie formy płatności są akceptowane w Autoklinice? 
                                            </p>
                                            <span>
                                                Odpowiedź: Akceptujemy płatności gotówką, kartami płatniczymi (Visa, Mastercard), a także szybkie przelewy BLIK. Na życzenie klienta wystawiamy również faktury VAT.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Czy dowiem się, ile kosztuje naprawa, zanim ją zaczniecie?
                                            </p>
                                            <span>
                                                Odpowiedź: Oczywiście! Każda naprawa poprzedzona jest diagnozą. Następnie kontaktujemy się z Tobą, przedstawiamy kosztorys robocizny oraz części, i dopiero po Twojej pełnej akceptacji przystępujemy do pracy.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>

                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    ⚙️ Części samochodowe
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Czy mogę przywieźć własne części do warsztatu? 
                                            </p>
                                            <span>
                                                Odpowiedź: Tak, zgadzamy się na montaż części dostarczonych przez klienta. Pamiętaj jednak, że w takim przypadku udzielamy gwarancji wyłącznie na wykonaną usługę montażu, a nie na samą część.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Jakich części używacie do napraw?
                                            </p>
                                            <span>
                                                Odpowiedź: Domyślnie proponujemy oryginalne części (OEM) lub wysokiej klasy zamienniki od sprawdzonych producentów. Wybór zawsze należy do Ciebie – dostosujemy się do Twojego budżetu.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>

                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    🛡️ Gwarancja na usługi
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Jak wygląda kwestia gwarancji na wykonane naprawy? 
                                            </p>
                                            <span>
                                                Odpowiedź: Jesteśmy pewni jakości naszej pracy. Na wszystkie usługi mechaniczne wykonane w Autoklinice oraz zakupione przez nas części udzielamy standardowej, 12-miesięcznej gwarancji. W przypadku reklamacji prosimy o kontakt, a my szybko rozwiążemy problem, naprawiając usterkę lub wymieniając wadliwą część.
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>

                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    ☕ Udogodnienia dla klienta
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Czy na czas naprawy mogę otrzymać auto zastępcze? 
                                            </p>
                                            <span>
                                                Odpowiedź: Tak, dysponujemy flotą samochodów zastępczych. Ze względu na duże zainteresowanie, prosimy o zgłoszenie takiej potrzeby podczas rezerwacji terminu wizyty. Koszt wynajmu auta zastępczego to 50 zł za dzień, a w przypadku dłuższych napraw oferujemy atrakcyjne pakiety cenowe.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Czy w warsztacie jest miejsce, w którym mogę poczekać na auto?
                                            </p>
                                            <span>
                                                Odpowiedź: Oczywiście! Przygotowaliśmy dla naszych klientów komfortową poczekalnię. Możesz tam napić się darmowej kawy i skorzystać z bezpłatnego Wi-Fi, podczas gdy my zajmiemy się Twoim samochodem.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>

                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    💻 Diagnostyka i usterki
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Na desce rozdzielczej zapaliła mi się kontrolka "Check Engine", co robić? 
                                            </p>
                                            <span>
                                                Odpowiedź: Najlepiej niezwłocznie umówić się na diagnostykę komputerową. Podłączymy auto pod specjalistyczny sprzęt, zdekodujemy błędy i sprawdzimy, co jest przyczyną usterki, zanim dojdzie do poważniejszej awarii.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Czy podłączenie pod komputer od razu naprawi auto?
                                            </p>
                                            <span>
                                                Odpowiedź: Diagnostyka komputerowa pozwala na dokładne zlokalizowanie usterki w elektronice lub silniku. Skasowanie błędu z komputera nie naprawia uszkodzonej części – nasi mechanicy zajmą się wymianą lub naprawą w kolejnym kroku.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>

                    <div className='py-4 px-6 border-b-[1px] border-gray-900 hover:cursor-pointer active:bg-gray-100 active:rounded-t-2xl'>
                        <Dropdown className="absolute top-4 right-4 w-full md:w-auto  bg-gray-800 text-white rounded-md  ">
                            <Dropdown.Trigger>
                                <span className="text-2xl font-medium text-gray-700 ">
                                    ❄️ Usługi sezonowe: Klimatyzacja i Opony
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content contentClasses="!w-[100vh] bg-gray-100" align="left">
                                <div className="p-6 text-base text-gray-700 leading-relaxed ">
                                    <ul>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                               Jak często powinienem serwisować klimatyzację?
                                            </p>
                                            <span>
                                                Odpowiedź: Zalecamy pełen serwis klimatyzacji (odgrzybianie, wymiana filtra kabinowego oraz uzupełnienie czynnika) co najmniej raz w roku, najlepiej wczesną wiosną, aby układ działał sprawnie i bez przykrych zapachów. Regularna konserwacja przedłuża żywotność systemu i zapewnia komfort podczas jazdy.
                                            </span>
                                        </li>
                                        <li className="mt-4">
                                            <p className='font-bold text-xl'>
                                                Czy mogę zostawić u was opony na kolejny sezon?
                                            </p>
                                            <span>
                                                Odpowiedź: Tak, prowadzimy przechowalnię opon (tzw. hotel dla opon). Twoje koła lub opony zimowe/letnie będą czekały na kolejny sezon w odpowiednich warunkach. Oferujemy również usługę sezonowej wymiany opon, abyś nie musiał się martwić o ich transport i przechowywanie.
                                            </span>
                                        </li>

                                    </ul>
                                </div>
                            </Dropdown.Content>
                        </Dropdown>

                    </div>
                    

                    <div className='overflow-hidden grid grid-cols-2 w-full gap-10 mt-auto px-6 py-8 min-h-[300px]'>
                        <div className='flex items-center justify-start'>
                            <span className='text-gray-400 float-left'>
                                email: autoklinika_faq@gmail.com
                            </span>
                        </div>
                        <div className='flex items-center justify-end'>
                            <span className='text-gray-400 float-right'>
                                telefon: +48 123 456 789
                            </span>
                        </div>
                    </div>
                </div>
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