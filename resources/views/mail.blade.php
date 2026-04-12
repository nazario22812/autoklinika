<!-- <!DOCTYPE html>
<html>
<head>
    <title>Reset Password Code</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333;">

    <div style="max-width: 500px; margin: 0 auto; padding: 20px; text-align: center;">
        <h2>Autoklinika</h2>
        <p>Poprosiłeś o zresetowanie hasła. Twój kod potwierdzający to:</p>
        
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #F1511A; margin: 20px 0;">
            {{ $code }}
        </div>

        <p style="font-size: 12px; color: #777;">Kod jest ważny przez 15 minut.</p>
    </div>

</body>
</html> -->

<x-mail::message>
Reset Password Code



Poprosiłeś o zresetowanie hasła. Twój kod potwierdzający to:

<x-mail::panel>
**{{ $code }}**
</x-mail::panel>


Dzięki,<br>
Zespół {{ config('app.name') }}
</x-mail::message>