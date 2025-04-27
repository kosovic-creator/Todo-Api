// filepath: /todo-app/todo-app/app/update/page.tsx
'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { useGlobalContext } from '@/app/context/GlobalContext';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'; //

export default function UpdatePage() {
    const [title, setTitle] = useState('');
    const [details, seDetails] = useState('');
    const [priority, setPriority] = useState(1);
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState('');
    const { user, setUser } = useGlobalContext();
    const [toast, setToast] = useState<string | null>(null);
    const router = useRouter();


    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await fetch(`/api/todo/${user}`, {
                    method: "GET",
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setMessage(errorData.message || "Failed to fetch todo.");
                    return;
                }

                const data = await response.json();
                setTitle(data.title);
                seDetails(data.details);
                setPriority(data.priority);
                setDone(data.done);
            } catch (err) {
                setMessage("An unexpected error occurred.");
                console.error(err);
            }
        };

        if (user) {
            fetchTodo();
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/todo/${user}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, priority,details, done }),
            });

            if (response.ok) {
                const updatedTodo = await response.json();
                setMessage('Todo successfully updated!');
                console.log('Updated Todo:', updatedTodo);
                showToast('Izmena je uspešno dodata!');
                setTimeout(() => router.push('/todo'), 2500);
            } else {
                const errorData = await response.json();
                setMessage(`Error: ${errorData.error || 'Failed to update todo.'}`);
            }
        } catch (error) {
            setMessage('An unexpected error occurred.');
            console.error(error);
        }
    };
    function showToast(message: string) {
        setToast(message);
        setTimeout(() => setToast(null), 2500); // Toast nestaje posle 2.5s
      }
    return (

        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">Update Todo</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details:</label>
                    <input
                        type="text"
                        id="details"
                        value={details}
                        onChange={(e) => seDetails(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority:</label>
                    <input
                        type="number"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(Number(e.target.value))}
                        min="1"
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="done" className="block text-sm font-medium text-gray-700">Done:</label>
                    <input
                        type="checkbox"
                        id="done"
                        checked={done}
                        onChange={(e) => setDone(e.target.checked)}
                        className="mt-1 ml-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                </div>

                {message && (
                    <p className={`
                        ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}
                        mb-4 text-sm font-medium
                    `}>
                        {message}
                    </p>
                )}
                <Button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-black-700">
                    Izmjeni
                </Button>
                {/* <Link href="/todo" className="mt-4 text- hover:underline"> */}
                    {/* Back to Todo List
                </Link> */}
            </form>
        </div>
    );
}


