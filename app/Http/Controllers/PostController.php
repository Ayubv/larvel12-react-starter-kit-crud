<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Storage;



class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {



        // $posts = Post::latest()->get()->map(fn($post)=>[
        //     'id' =>$post->id,
        //     'name' =>$post->name,
        //     'description' =>$post->description,
        //     'price' =>$post->price,
        //     'post_image' =>$post->post_image,

        //     'created_at' =>$post->created_at->format('d-m-Y'),
        // ]);

        $posts = Post::query();
        if($request->filled('search')){
            $search = $request->search;
            $posts->where(fn($query)=>
            $query->where('name','like',"%{$search}%")
            ->orWhere('description','like',"%{$search}%")
            ->orWhere('price','like',"%{$search}%")

        );

        }


        $perPage = (int) ($request->perPage ?? 5);

        if($perPage === -1){
            $allPosts  = $posts->latest()->get()->map(fn($post)=>[
                'id' =>$post->id,
                'name' =>$post->name,
                'description' =>$post->description,
                'price' =>$post->price,
                'post_image' =>$post->post_image,
                'created_at' =>$post->created_at->format('d-m-Y'),
            ]);

            $posts =[
                'data'=> $allPosts,
                'total'=> $allPosts->count(),
                'per_page'=> $perPage,
                'from'=> 1,
                'to'=> $allPosts->count(),
                'links'=>[]

            ];

        }
        else{
            $posts = $posts->latest()->paginate($perPage)->withQueryString();

            $posts->getCollection()->transform(fn($post)=>[
                'id' =>$post->id,
                'name' =>$post->name,
                'description' =>$post->description,
                'price' =>$post->price,
                'post_image' =>$post->post_image,

                'created_at' =>$post->created_at->format('d-m-Y'),
            ]);

        }

        return Inertia::render('posts/index', [
            'posts' => $posts,
            'filters' => $request->only(['search','perPage']),

        ]);


}



    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return Inertia::render('posts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {


      $request->validate([
         'name' => 'required|string|max:255',
            'description' =>'required|string|max:1000',
            'price' =>'required|numeric',
            'post_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);
        $path = null;
        if($request->hasFile('post_image')){
            $path = $request->file('post_image')->store('posts','public');
        }



        Post::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'post_image' => $path,
        ]);

        return redirect()->route('posts.index')->with('success', 'Product created successfully!');



    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(post $post)
    {
        return Inertia::render('posts/edit',[
            'post'=>$post,
            'isEdit'=>true

        ]);


    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, post $post)
    {
        //

    //dd($request->all());

     $request->validate([
           'name' => 'required|string|max:255',
           'description' => 'required|string|max:1000',
           'price' => 'required|numeric',
           'post_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
       ]);

       if ($request->hasFile('post_image')) {
        $path = $request->file('post_image')->store('posts', 'public');
        $post->post_image = $path;
    }

    $post->update($request->only('name','description','price'));
       return redirect()->route('posts.index')->with('success', 'Post updated successfully!');
   }




/**
     * Remove the specified resource from storage.
     */
    public function destroy(post $post)
    {
        //


      $post->delete();
       return redirect()->route('posts.index')->with('success', 'Post updated successfully!');

    }


}
