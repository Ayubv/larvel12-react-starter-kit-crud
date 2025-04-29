<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ProductFormRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::latest()->get()->map(fn($product)=>[
            'id' =>$product->id,
            'name' =>$product->name,
            'description' =>$product->description,
            'price' =>$product->price,
            'feature_image' =>$product->feature_image,
            'fetaure_image_original_name' =>$product->fetaure_image_original_name,
            'created_at' =>$product->created_at->format('d-m-Y'),
        ]);

        //return  $products;
       return Inertia::render('products/index',[
        'products'=>$products

       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('products/product-form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductFormRequest $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'description' =>'required|string|max:1000',
            'price' =>'required|numeric',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $path = null;
        if($request->hasFile('feature_image')){
            $path = $request->file('feature_image')->store('products','public');
        }

        // $feature_image = $request->file('feature_image');
        // $imageName = time() . '_' . $feature_image->getClientOriginalName();
        // $feature_image->move(public_path('uploads/products'), $imageName);

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'feature_image' => $path,
        ]);

        return redirect()->route('products.index')->with('success', 'Product created successfully!');


    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('products/product-form',[
            'product'=>$product,
            'isView'=>true,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {

        return Inertia::render('products/product-form',[
            'product'=>$product,
            'isEdit'=>true,
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductFormRequest $request, Product $product)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric',
            'feature_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);



        if ($request->hasFile('feature_image')) {
            $path = $request->file('feature_image')->store('products', 'public');
            $product->feature_image = $path;
        }

        $product->update($request->only('name','description','price'));


        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {

        $product->delete();
        return redirect()->route('products.index')->with('success', 'products updated successfully!');

    }
}
