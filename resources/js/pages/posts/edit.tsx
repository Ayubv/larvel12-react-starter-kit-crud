import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,useForm,router} from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import CustomTextArea from '../../components/ui/custom-textarea';
import { Button } from '../../components/ui/button';
import InputError from '../../components/input-error';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { useState } from 'react';



interface Post {
id:number;
name: string;
description: string;
price: string;
post_image: File | null;
onSuccess:string;
isEdit:string;
}


const EditPost =({ post } : { post: Post })=> {

                const [processing,setProcessing] = useState(false);

                const {isEdit} = post;

                const breadcrumbs: BreadcrumbItem[] = [
                {
                title:'Update Post',
                href: route('posts.index'),
                },
                ];



                const { data, setData,errors } = useForm({

                name: post?.name ,
                description: post?.description ,
                price: post?.price ,
                post_image: null as File | null,
                });

                // Ensure the file is properly set before submitting


                const submit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append('name', data.name);
                formData.append('description', data.description);
                formData.append('price', data.price);
                formData.append('_method', 'PUT');

                if (data.post_image) {
                formData.append('post_image', data.post_image);
                }

                router.post(route('posts.update', post.id),formData, {
                forceFormData: true, // Ensure it's sending form data
                preserveScroll: true,
                preserveState: true,
                onStart:() =>setProcessing(true),
                onFinish:() =>setProcessing(false),
                onSuccess: () => console.log('Updated successfully'),
                // router.visit(route('posts.index'));

                });
                };

                const handleFileLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                setData('post_image', e.target.files[0]);
                }
                };

                return (
                <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Create Post" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Back to Product button */}
                <div className="ml-auto">
                <Link className='flex items-center w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90' 

                as='button'
                href={route('posts.index')}>
                <ArrowLeft className='me-2'/>
                Back to Product
                </Link>
                </div>
                <Card>
                <CardHeader>
                <CardTitle>
                Product
                </CardTitle>

                </CardHeader>
                <CardContent>
                <form onSubmit={submit} className='flex flex-col gap-4'  autoComplete='off' encType="multipart/form-data">

                <div className="grid gap-6">
                {/* product name */}
                <div className="grid gap-4">
                <Label htmlFor='name'>Post Name</Label>
                <Input
                value={data.name}
                onChange={(e)=>setData('name',e.target.value)}

                type='text' 
                name='name' 
                id='name' 
                placeholder='Post name' 
                autoFocus
                tabIndex={1}


                >


                </Input>
                <InputError />
                </div>



                {/* product description */}
                <div className="grid gap-4">
                <Label htmlFor='description'>Post description</Label>
                <CustomTextArea
                value={data.description}
                onChange={(e)=>setData('description',e.target.value)}

                name='description' 
                id='description'
                autoFocus
                tabIndex={2}
                placeholder='Description'
                rows={3}


                />

                <InputError  />
                </div>

                {/* product Price */}
                <div className="grid gap-4">
                <Label htmlFor='price'>Post Price</Label>
                <Input 
                value={data.price}
                onChange={(e)=>setData('price',e.target.value)}

                type='text' 
                name='price' 
                id='price' 
                placeholder='Product name'
                autoFocus
                tabIndex={4}

                ></Input>
                <InputError  />
                </div>


                {/* product Image */}

                <div className="grid gap-4">
                <Label htmlFor='post_image'>Post Image</Label>
                <Input onChange={handleFileLoad}

                type='file'

                name='post_image'
                id='post_image'  
                tabIndex={5}></Input>
                <InputError message={errors.post_image} />
                </div>

                {/* Corrent Image */}
                <div className="grid gap-4">
                <Label htmlFor='post_image'>Corent Image</Label>

                <img className='w-30 h-30 border' src={`/storage/${post.post_image}`} alt="" />                            
                </div>

                <Button type="submit" className="mt-4 w-fit cursor-pointer bg-fuchsia-500 hover:bg-amber-600"

                tabIndex={6}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                {processing ? (isEdit ? 'Updating ....' : 'Updating...') : isEdit ? 'Update' : 'Update'} Product
                </Button>


                </div>
                </form>
                </CardContent>
                </Card>
                </div>
                </AppLayout>
                );


}
export default EditPost;
