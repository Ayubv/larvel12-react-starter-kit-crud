import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm,router} from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import CustomTextArea from '../../components/ui/custom-textarea';
import { Button } from '../../components/ui/button';
import InputError from '../../components/input-error';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { useState } from 'react';




 const ProductForm =({...props})=> {
    // post, processing, errors, reset

   //const [processing,setProcessing] = useState(false);
    const {product,isView,isEdit} = props;


    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${isView ? 'Show' :(isEdit ? 'Update' : 'Create')} Product`,
            href: route('products.create'),
        },
    ];

    const {data, setData,post, errors,reset ,processing} = useForm({
    name: product?.name ||'',
    description: product?.description ||'',
    price: product?.price || '',
    feature_image: null as File | null,
    _method:isEdit ? 'PUT' : 'POST',

    });




const submit =(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  if (isEdit) {
    post(route('products.update', product.id),{
        forceFormData: true,
        onSuccess: ()=> reset(),


    });

  } else {
    post(route('products.store'), {
      forceFormData: true,
      onSuccess: ()=> reset(),

    });
  }



    }


    const handleFileLoad =(e:React.ChangeEvent<HTMLInputElement>)=>{
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        setData('feature_image', file);

      }
    }



    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Back to Product button */}
                <div className="ml-auto">
                <Link className='flex items-center w-fit bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90'

                    as='button'
                    href={route('products.index')}>
                        <ArrowLeft className='me-2'/>
                    Back to Product
                    </Link>
                </div>
              <Card>
                <CardHeader>
                    <CardTitle>
                    {isView ? 'Show' :(isEdit ? 'Update' : 'Create')} Product
                    </CardTitle>

                </CardHeader>
                <CardContent>
                    <form onSubmit={submit} className='flex flex-col gap-4'  autoComplete='off' encType="multipart/form-data">

                        <div className="grid gap-6">
                            {/* product name */}
                            <div className="grid gap-4">
                                <Label htmlFor='name'>Product Name</Label>
                               <Input
                               value={data.name}
                               onChange={(e)=>setData('name',e.target.value)}
                               type='text'
                               name='name'
                               id='name'
                               placeholder='Product name'
                               autoFocus
                               tabIndex={1}

                               disabled={isView || processing}
                               >


                               </Input>
                               <InputError message={errors.name} />
                            </div>
                            {/* product description */}
                            <div className="grid gap-4">
                                <Label htmlFor='description'>Product description</Label>
                                            <CustomTextArea
                                             value={data.description}
                                             onChange={(e)=>setData('description',e.target.value)}
                                            name='description'
                                            id='description'
                                            autoFocus
                                            tabIndex={2}
                                            placeholder='Description'
                                            rows={3}
                                            disabled={isView || processing}

                                            />

                                <InputError message={errors.description} />
                            </div>

                             {/* product Price */}
                             <div className="grid gap-4">
                                <Label htmlFor='price'>Product Price</Label>
                               <Input
                                value={data.price}
                                onChange={(e)=>setData('price',e.target.value)}
                               type='text'
                               name='price'
                               id='price'
                               placeholder='Product name'
                               autoFocus
                               tabIndex={4}
                               disabled={isView ||  processing}
                               ></Input>
                                <InputError message={errors.price} />
                            </div>


                             {/* product Image */}
                             {!isView   && (
                                <div className="grid gap-4">
                                <Label htmlFor='feature_image'>Product Image</Label>

                               <Input onChange={handleFileLoad}

                               type='file'

                                name='feature_image'
                                 id='feature_image'
                                  tabIndex={5}></Input>
                                   <InputError message={errors.feature_image} />
                            </div>


                             )}




                             { isView ||


                             (isEdit && (
                            <div className="grid gap-4">
                            <Label htmlFor='feature_image'>Curent Fetaure Image</Label>
                            {product.feature_image   &&(

                            <img src={`/storage/${product.feature_image}`} alt="Fetaure Image" className='w-50 h-40 rounded-lg border'/>
                            )}


                            </div>

                             ))}

                             {!isView  &&(
                                <Button type="submit" className="mt-4 w-fit cursor-pointer bg-fuchsia-500 hover:bg-amber-600"

                                 tabIndex={6}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                {processing ? (isEdit ? 'Updating ....' : 'Creating...') : isEdit ? 'Update' : 'Create'} Product 
                                </Button>
                             )}

                        </div>
                    </form>
                </CardContent>
              </Card>
            </div>
        </AppLayout>
    );
}
export default ProductForm;
