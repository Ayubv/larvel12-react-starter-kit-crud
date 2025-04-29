import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link,useForm,router} from '@inertiajs/react';
import { CirclePause, Pencil, Search, Trash2, X } from 'lucide-react';
import ConfirmDelete from '@/components/ConfirmDelete';
import {useState } from 'react';
import Pagination from '../../components/ui/pagination';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

//import { Inertia } from '@inertiajs/inertia';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Post',
        href: '/posts',
    },
];
interface LinkProps{
  active: boolean;
  label:string;
  url:string;
}

interface Post {
    id:number,
    name:string,
    description:string,
    price:number,
    post_image:string,
    created_at:string,


    };

interface PostPagination{
  data:Post[];
  links:LinkProps[];
  from: number;
  to: number;
  total:number;
}

interface FilterProps {
  search:string;
  perPage:string;
}

interface IndexProps {
  posts:PostPagination;
  filters:FilterProps

};






export default function Index({posts,filters} :IndexProps) {
  //const {posts}= props;

console.log(posts);


    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { delete: destroy, processing } = useForm();

    const handleDeleteClick = (id: number) => {
      setSelectedId(id);
      setShowModal(true);
    };

    const confirmDelete = () => {
      if (selectedId !== null) {
        destroy(route('posts.destroy', selectedId), {
          onSuccess: () => {
            setShowModal(false);
            setSelectedId(null);
          },
          preserveState: true,
          preserveScroll: true,
        });
      }
    };


// search from dynasmic
const {data,setData} = useForm({
search:filters.search || '',
perPage:filters.perPage ||'5',
});


const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{

    const value = e.target.value;
    setData('search',value);


    const queryString = {

        ...(value && {search:value}),
        ...(data.perPage && {perPage: data.perPage}),
    };


    router.get(route('posts.index'),queryString,{
      preserveState: true,
      preserveScroll: true,



    });



}



// search reset
const handleReset = (e: React.FormEvent)=>{

  setData('search','');
  setData('perPage','5');
  router.get(route('posts.index'),{},{
    preserveState: true,
    preserveScroll: true,
    //InertiaProgress.cancel();

  });

}
// handle Per PageChange
const handlePerPageChange = (value: string)=> {
    const queryString = {

        ...(data.search && {search: data.search}),
        ...(value && {perPage: value}),
    };




    router.get
    (route('posts.index'),queryString,{
        preserveState: false,
        //preserveScroll: true,


      }
    );

}

    return (


        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">




                    {/* Input search form */}
          <div className=" mb-4 flex w-full items-center justify-between gap-3">
            <Input
           type ='text'
            name='search'
            className='h-10 w-1/3'

              placeholder='Search Post....'
              onChange={handleChange}
              value={data.search}


              />

              <Button
              className='h-10 bg-amber-300'
              onClick={handleReset}>
                <X size={10}/>

              </Button>


                 {/* Add Post */}
            <div className="ml-auto">



            <Link className=' flex items-center bg-indigo-800 px-4 py-2 rounded-lg text-white text-md cursor-pointer hover:opacity-90'
              as='button'
             href={route('posts.create')}>
                <CirclePause className='me-2'/>
                Add Post
                </Link>
                </div>



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



        { posts.data.map((post,index)=>(

                <tr>
                <td className='px-4 py-2 border text-center'>{posts.from +index }</td>
                <td className='px-4 py-2 border text-center'>{post.name}</td>
                <td className='px-4 py-2 border text-center'>{post.description}</td>
                <td className='px-4 py-2 border text-center'>{post.price}</td>
                <td className='px-4 py-2 border text-center'>

                 {post.post_image &&   <img src={`/storage/${post.post_image}`} alt="" className='w-20 h-20'/> }
                </td>
                <td className='px-4 py-2 border text-center'>{post.created_at}</td>
                <td className='px-4 py-2 border text-center'>
                {/* <Link as='button' href={route('posts.edit',post.id)} className='ms-2 bg-sky-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>
                <Eye size={15}/>
                </Link> */}

                <Link as='button' href={route('posts.edit',post.id)} className='ms-2 bg-green-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>
                <Pencil size={15}/>
                </Link>

                <Link as='button' href='#'



                onClick={(e)=>{
                  e.preventDefault();
                    handleDeleteClick(post.id)}
                }



                 className='ms-2 bg-red-800 text-white p-1 rounded-sm cursor-pointer hover:opacity-90'>

                <Trash2 size={15}/>

                </Link>



                </td>


            </tr>



))



}









        <ConfirmDelete
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        loading={processing}
        title="Delete this post?"
        description="Once deleted, it cannot be undone."
      />




        </tbody>

            </table>
            <div className="items-center justify-between mt-4  text-center shadow-sm mb-3">
                {posts.data.length === 0 && (
                <p className='text-red-700 text-xl '>No records found</p>
                )}

            </div>

               <Pagination posts ={posts} perPage = {data.perPage}  onPerPageChange ={handlePerPageChange}/>
               </div>

            </div>
        </AppLayout>

    );
}


