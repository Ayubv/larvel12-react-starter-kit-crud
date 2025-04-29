<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $fillable=[
        'name',
        'description',
        'price',
        'feature_image',
        'fetaure_image_original_name'

    ];
}
