"use client"
import Header from '@/components/Header'
import { set } from 'mongoose';
import { useSession } from "next-auth/react"
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";

type TypeStore = {
    email: string;
    name: string;
    description: string;
    website: string;
    facebook: string;
};

function Dashboard () {

        const { data: session } = useSession();

        if (!session) {
                redirect('/');
        }

        const [editmode, setEditMode] = useState<boolean>(false);
        const [formData, setFormData] = useState<TypeStore>({
            email: session?.user?.email as string,
            name: "",
            description: "",
            website: "",
            facebook: "",
        });

        useEffect(() => {
            fetch(`/api/stores/${session?.user?.email}`, {
                method: "GET",
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.foundStore) {
                    setFormData(data.foundStore);
                    setEditMode(true);
                }
            })
            .catch((err) => console.log(err)); 
        }, [session]); 
    
        const handleChange = (e: any) => {
            const value = e.target.value;
            const name = e.target.name;
            setFormData({
                ...formData,
                [name]: value,
            });
        };
    
        const handleSubmit = async (e: any) => {
            e.preventDefault();

            if (editmode) {
                await fetch(`/api/stores/${session?.user?.email}`, {
                    method: "PUT",
                    body: JSON.stringify({ formData }),
                    //@ts-ignore
                    "Content-Type": "application/json",
                });
            } else {
                const res = await fetch("/api/stores", {
                    method: "POST",
                    body: JSON.stringify({ formData }),
                    //@ts-ignore
                    "Content-Type": "application/json",
                });
                if (!res.ok) {
                    throw new Error("Failed to create store");
                }    
            }
        };

    return (
        <>
            <Header session = { session } />
                <div className="flex justify-center items-center mt-10">
                    <div>
                        <form
                            onSubmit={handleSubmit}
                            method="post"
                            className="flex flex-col gap-3"
                        >
                            <h1>Décrivez votre boutique</h1>
                            <label htmlFor="name">Nom *</label>
                            <input
                                className='w-80 p-2 rounded-md border-2 border-gray-300'
                                id="name"
                                name="name"
                                type="text"
                                onChange={handleChange}
                                required={true}
                                value={formData.name}
                            />                            
                            <label htmlFor="description">Description *</label>
                            <textarea
                            className='h-40 w-80 p-2 rounded-md border-2 border-gray-300'
                            id="description"
                            name="description"
                            onChange={handleChange}
                            required={true}
                            value={formData.description}
                            />
                            <label htmlFor="website">website</label>
                            <input
                                className='w-80 p-2 rounded-md border-2 border-gray-300'
                                id="website"
                                name="website"
                                type="text"
                                onChange={handleChange}
                                value={formData.website}
                            /> 
                            <label htmlFor="facebook">Facebook</label>
                            <input
                                className='w-80 p-2 rounded-md border-2 border-gray-300'
                                id="facebook"
                                name="facebook"
                                type="text"
                                onChange={handleChange}
                                value={formData.facebook}
                            /> 
                            <input
                            type="submit"
                            className="bg-green-600 rounded-md p-2 text-white cursor-pointer"
                            value="Enregistrer"
                            />
                        </form>
                    </div>
                </div>
        </>
    )
}

export default Dashboard