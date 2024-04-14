"use client"
import Header from '@/components/Header';
import Coming from '@/components/Coming';
import { useState , useEffect } from "react";
import { useSession } from "next-auth/react";

type TypeStore = {
  email: string;
  name: string;
  description: string;
  website: string;
  facebook: string;
};

export default function ExplorePage() {
  const { data: session } = useSession();

  const [stores, setStores] = useState<TypeStore[]>([]);

  useEffect(() => {
    fetch("/api/stores", {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setStores(data.stores);
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <>
    <Header session = { session } />
		<table className='text-sm text-left sm:w-7/12 w-full max-w mx-auto mt-10'>
      <thead className='text-xs text-gray-700 uppercase border-b '>
        <tr>
          <th scope='col' className='px-1 py-3 w-0 font-medium'>
            Name
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Description
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Site
          </th>
          <th scope='col' className='px-6 py-3 w-0 font-medium'>
            Facebook
          </th>
        </tr>
      </thead>			
      <tbody>
      {stores.map((store : TypeStore, idx : number) => {
        return (
        <tr className={`${idx % 2 == 1 ? "bg-zinc-100" : ""}`} key={idx}>
          <td className='px-2 py-4 font-medium whitespace-nowrap'>
            {store.name}
          </td>
          <td className='px-6 py-4'>
            {store.description.length > 20 ? store.description.slice(0, 20) + " ..." : store.description}
          </td>
          <td className={`px-6 py-4`}>{store.website}</td>
          <td className={"px-6 py-4"}>{store.facebook}</td>
        </tr>)})}
      </tbody>
		</table>
    </>
  )
}