<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Payment;

class Contract extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at'];
    protected $fillable = ['description', 'numberOfClients', 'gigabytesStorage', 'value', 'discount', 'date_payment', 'active', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeAtivos($query)
    {
        return $query->where('active', true);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
