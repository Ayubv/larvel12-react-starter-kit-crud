import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage,useForm } from '@inertiajs/react';
import { Alert, AlertDescription} from '../../components/ui/alert';
import { useEffect, useState } from 'react';
import { CirclePause, Eye, Pencil, Trash2 } from 'lucide-react';
import ConfirmDelete from '@/components/ConfirmDelete';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Product',
        href: '/products',
    },
];

interface Product {
id:number,
name:string,
description:string,
price:number,
feature_image:string,
created_at:string,
image:string

}
export default function Index({...props} : {products: Product[]}) {

const {products}= props;
//delete working
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { delete: destroy, processing } = useForm();
//delete working end

const {flash} = usePage<{flash?: {success?: string ; error?:string} }>().props;
const flashMessage = flash?.success || flash?.error;
const [showalert,setShowalert] = useState(flashMessage ? true : false);

//delete working
const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setShowModal(true);
  };
//delete working end

useEffect(()=>{

if(flashMessage){
   const timer = setTimeout(() => setShowalert(false),3000);
   return () => clearTimeout(timer);
}

},[flashMessage]);

//delete working
const confirmDelete = () => {
    if (selectedId !== null) {
      destroy(route('products.destroy', selectedId), {
        onSuccess: () => {
          setShowModal(false);
          setSelectedId(null);
        },
        preserveState: true,
        preserveScroll: true,
      });
    }
  };
//delete working end


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Product" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                {showalert  &&  flashMessage && (
                        <Alert variant={'default'}
                        className={`${flash?.success ? 'bg-green-800' : (flash?.error ? 'bg-red-500' : '')} ml-auto max-w-md text-white`}
                        >


                        <AlertDescription className='text-white'>
                        {flash.success ? 'Success!' : 'Error!'}{' '}
                            {flashMessage}</AlertDescription>
                        </Alert>

                    )}

                <div className="ml-auto">
            <Link className=' flex items-center bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90'

            as='button'
             href={route('products.create')}>
                <CirclePause className='me-2'/>
                Add Product
                </Link>
                </div>
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">

               <table className='w-full table-auto'>
                <thead>
            <tr className='bg-gray-700 text-white'>

                <th className='p-4 border'>#</th>
                <th className='p-4 border'>Name</th>
                <th className='p-4 border'>Description</th>
                <th className='p-4 border'>Price(INR)</th>
                <th className='p-4 border'>Image</th>
                <th className='p-4 border'>Date</th>
                <th className='p-4 border'>Action</th>
            </tr>
        </thead>
        <tbody>

            {
            products.map((product,index)=>(


                <tr key={index}>
                <td className='px-4 py-2 border text-center'>{index + 1}</td>
                <td className='px-4 py-2 border text-center'>{product.name}</td>
                <td className='px-4 py-2 border text-center'>{product.description}</td>
                <td className='px-4 py-2 border text-center'>{product.price}</td>
                <td className='px-4 py-2 border text-center'>
                 {product.feature_image && <img src={`/storage/${product.feature_image}`} alt='' className='w-20 h-20 shadow-lg' />}

                </td>
                <td className='px-4 py-2 border text-center'>{product.created_at}</td>
                <td className='px-4 py-2 border text-center'>
                <Link as='button' href={route('products.show',product.id)} className='ms-2 bg-sky-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>
                <Eye size={15}/>
                </Link>

                <Link as='button' href={route('products.edit',product.id)} className='ms-2 bg-green-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>
                <Pencil size={15}/>
                </Link>

                <Link as='button' href='#'

                    /*delete working*/
                onClick={(e)=>{
                    e.preventDefault();
                    handleDeleteClick(product.id)}
                }

                className='ms-2 bg-red-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>
                <Trash2 size={15}/>
                </Link>

                </td>
            </tr>


            ))
            }
{/* delete working */}

    <ConfirmDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={processing}
        title="Delete this post?"
        description="Once deleted, it cannot be undone."
      />
      {/* delete working end */}
        </tbody>
               </table>
               </div>
            </div>
        </AppLayout>
    );
}
