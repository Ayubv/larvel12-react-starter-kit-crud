import { Link } from '@inertiajs/react';
import { Select,SelectContent, SelectItem, SelectTrigger,   SelectValue,   } from './select';


//import React from 'react';

interface LinkProps {
    active: boolean;
    label:string;
    url:string | null;
  };
  interface PostPaginationData {
    links:LinkProps[];
    from:number;
    to:number;
    total:number;

  };
interface PaginationPrps{
    posts:PostPaginationData
    perPage:string ;
    onPerPageChange:(value: string) =>void;
}

const Pagination = ({posts, perPage, onPerPageChange} : PaginationPrps) => {

    return (
        <div className='flex  items-center justify-between mt-4 '>
            <p className='ml-2'>Showing <strong>{posts.from} </strong> to <strong>{posts.to}</strong> from Total <strong> {posts.total}</strong> entries</p>
            {/* Select par page dynamic start */}
            <div className="flex items-center gap-2">
                <span className='text-sm'>Show Per page :</span>



            <Select onValueChange={onPerPageChange} value ={perPage}>
                <SelectTrigger className='w-[90px] '>
                    <SelectValue  placeholder='row'/>
                </SelectTrigger>

                <SelectContent>
                <SelectItem className="" value='5' >5</SelectItem>
                <SelectItem className="" value='10' >10</SelectItem>
                <SelectItem className="" value='15' >15</SelectItem>
                <SelectItem className="" value='20'>20</SelectItem>

                <SelectItem className="" value='-1'>All</SelectItem>

                </SelectContent>
            </Select>


            </div>
            {/* Select par page dynamic end */}



            <div className="flex gap-2">
            {posts.links.map((link, index) => (
            <Link
            className={`px-3 py-2 border rounded ${link.active ? 'bg-black text-white' :''}`}
            href={link.url || '#'}

             key={index}

             dangerouslySetInnerHTML = {{ __html:link.label}}


                />


            ))}

        </div>


        </div>


    );
};

export default Pagination;
