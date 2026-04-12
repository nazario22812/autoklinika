import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

import { Head, Link, useForm } from '@inertiajs/react';



export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        surname: '',
        phone_number: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, ''); 

    
    let formatted = '';

    if (digits.length > 0) {
        formatted += '+' + digits.substring(0, 2); 
    }
    if (digits.length > 2) {
        formatted += ' ' + digits.substring(2, 5); 
    }
    if (digits.length > 5) {
        formatted += ' ' + digits.substring(5, 8); 
    }
    if (digits.length > 8) {
        formatted += ' ' + digits.substring(8, 11); 
    }

    return formatted;
};

    return (
        
        <GuestLayout>
            
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        placeholder="Tomasz"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="surname" value="Surname"></InputLabel>
                
                    <TextInput
                        id="surname"
                        name="surname"
                        value={data.surname}
                        className="mt-1 block w-full"
                        autoComplete="surname"
                        placeholder="Kowalski"
                        isFocused={true}
                        onChange={(e) => setData('surname', e.target.value)}
                        required
                    />
                </div>

                <div className='mt-4'>
                    <InputLabel htmlFor="phone_number" value="Phone"></InputLabel>
                
                    <TextInput
                        id="phone_number"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        autoComplete="phone_number"
                        placeholder="+48 ___ ___ ___"
                        isFocused={true}
                        onChange={(e) => {
                            
                                const formatted = formatPhoneNumber(e.target.value);
                                if (formatted.length <= 15) {
                                    setData('phone_number', formatted);
                                }
                            }
                            
                        }
                        required
                    />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        placeholder="tomasz.kowalski@example.pl"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="********"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        placeholder="********"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4 bg-red-500" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
