import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link ,useForm} from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import CustomTextArea from '../../components/ui/custom-textarea';
import { Button } from '../../components/ui/button';
import InputError from '../../components/input-error';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

//import { Inertia } from '@inertiajs/inertia';



 const CreatePost =({...props})=> {


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title:'Create Post',
            href: route('posts.create'),
        },
    ];

    const {product} = props;

    const {data, setData,post,processing,errors} = useForm({

        name: product?.name ||'',
        description: product?.description ||'',
        price: product?.price || '',
        post_image: null as File | null,
    
    
       
    
        });
    const submit =(e: React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
      
        if (data.post_image) {
          formData.append('post_image', data.post_image);
        }


       
        post(route('posts.store'), {
            forceFormData: true,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
              console.log('Created successfully!');
            },
          });
    }


    const handleFileLoad =(e:React.ChangeEvent<HTMLInputElement>)=>{
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setData('post_image', file);
          
        }
      }
    
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

                                <Button type="submit" className="mt-4 w-fit cursor-pointer bg-fuchsia-500 hover:bg-amber-600"
                               
                                 tabIndex={6}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                 Product
                                </Button>
                           
                          
                        </div>
                    </form>
                </CardContent>
              </Card>
            </div>
        </AppLayout>
    );
}
export default CreatePost;
