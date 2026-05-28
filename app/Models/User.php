<?php

namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;

class User extends Model implements AuthenticatableContract
{   
    use Authenticatable; 

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $fillable = [
        'is_admin',
        'name',
        'surname',
        'email',
        'password',
        'phone_number', 
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
