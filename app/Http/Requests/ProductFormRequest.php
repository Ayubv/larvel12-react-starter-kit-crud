<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'         =>'required|string|max:255',
            'description'  =>'required|string|max:1000',
            'price'        =>'required|numeric|min:0',
            'feature_image'=>'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ];
    }
        
    public function messages():array
    {
        return [
            'name.required'=>'Please Enter Product Name.',
            'name.string'=>'Product Name Must Be String.',
            'name.max'=>'The Product Name may not be grater than 255 chraters.',


            'description.required'=>'Please Enter description.',
            'description.string'=>'Product description  Must Be String.',
            'description.max'=>'The Product description may not be grater than 1000 chraters.',

            'price.required'=>'Please Enter Product price.',
            'price.numeric'=>'The Product price  Must Be Number.',
            'price.min'=>'The Product price  Must Be at least at 0.',

            'feature_image.image'=>'The feature image must be an image file.',
            'feature_image.mimes'=>'The feature image must be a file of type:jpeg,png,jpg,gif.',
            'feature_image.max'=>'The feature image must be not grater than 2048 Kelobytes.',

        ];
    }
}
