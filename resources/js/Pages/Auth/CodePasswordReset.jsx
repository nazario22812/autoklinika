import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Link, Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.code'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Jeżeli nie dostaleś kodu, sprawdź folder SPAM. Jeżeli nadal go nie ma, spróbuj ponownie.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                {/* <TextInput
                    id="code"
                    type="number"
                    name="code"
                    value={data.code}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('code', e.target.value)}
                    placeholder="Enter the code you received in email"
                /> */}
                <div className="flex justify-center mb-4">
                    <div className="relative flex gap-3">
                        <input
                            id="code"
                            type="text" 
                            inputMode="numeric"
                            name="code"
                            value={data.code}
                            onChange={(e) => setData('code', e.target.value)}
                            className="absolute inset-0 z-10 w-full h-full opacity-0 cursor-default"
                            autoFocus
                        />

                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <div
                                key={index}
                                className={`w-12 h-14 border-2 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-200 
                                    ${data.code.length === index ? 'border-[#F1511A] ring-4 ring-orange-100' : 'border-gray-200'}
                                    ${data.code[index] ? 'border-[#F1511A] bg-orange-50 text-gray-800' : 'bg-white text-gray-400'}
                                `}
                            >
                                {data.code[index] || ""}
                            </div>
                        ))}
                    </div>
                </div>



                <InputError message={errors.code} className="mt-2" />

                <div className="grid grid-cols-2 mt-4 flex items-center justify-end">
                    <Link 
                        href={route('password.request')} 
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#F1511A] transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Wróć
                    </Link>
                    <PrimaryButton className="ms-4" disabled={processing}>
                        enter code
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
