<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $hidden = ['created_at', 'updated_at'];

    public function ActivedContracts()
    {
        return $this->hasMany(Contract::class)->where('active', true);
    }

    public function Contracts($id)
    {
        return $this->hasMany(Contract::class)->where('user_id', $id);
    }
}
