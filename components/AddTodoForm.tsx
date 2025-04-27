import router from "next/router";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";


type AddTodoFormProps = {
    onAdd: (title: string, priority: number, details: string) => Promise<void>;
};

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState(1);
    const [details, setDetails] = useState("");
    const [done, setDone] = useState(false);
    const [message, setMessage] = useState("");

    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Title must be at least 2 characters.",
        }),
        priority: z.number().min(1).max(5).int({
            message: "Priority must be an integer between 1 and 5.",
        }),
        details: z.string().optional(),
        done: z.boolean().optional(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            priority: 1,
            details: "",
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (!title.trim()) {
            setMessage("Title is required.");
            return;
        }

        try {
            await onAdd(title, priority, details);
            setTitle("");
            setPriority(1);
            setDetails("");
            setMessage("Todo successfully added!");
            //   router.push("/todo"); // Redirect to the home page after adding
        } catch (error) {
            setMessage("Failed to add todo.");
            console.error(error);
        }
    };

    return (
        //     <Form {...form}>


        // <form onSubmit={handleSubmit} className="add-todo-form">
        //       <h2 className="text-xl mb-4">Add New Todo</h2>
        //       <div>
        //         <Label htmlFor="title">Title:</Label>
        //         <input
        //           type="text"
        //           id="title"
        //           value={title}
        //           onChange={(e) => setTitle(e.target.value)}
        //           placeholder="Enter title"
        //           required
        //         />
        //       </div>

        //       <div>
        //         <label htmlFor="priority">Priority:</label>
        //         <input
        //           type="number"
        //           id="priority"
        //           value={priority}
        //           onChange={(e) => setPriority(Number(e.target.value))}
        //           min="1"
        //           max="5"
        //           required
        //         />
        //       </div>

        //       <div>
        //         <label htmlFor="details">Details:</label>
        //         <textarea
        //           id="details"
        //           value={details}
        //           onChange={(e) => setDetails(e.target.value)}
        //           placeholder="Enter details (optional)"
        //         />
        //       </div>

        //       <button type="submit" className="mt-4 bg-black text-white px-4 py-2">
        //         Add Todo
        //       </button>

        //       {message && <p className="mt-2">{message}</p>}
        //     </form>

        //     </Form>
        <Form {...form}>
            <div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter title"
                                        {...field}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the title of your todo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="priority"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Priority</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={priority}
                                        onChange={(e) => setPriority(Number(e.target.value))}
                                        placeholder="Enter priority (1-5)"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the priority of your todo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="details"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Details</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter details (optional)"
                                            {...field}
                                            value={details}

                                            onChange={(e) => setDetails(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is the details of your todo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            </>
                        )}
                    />
                    {/* <FormField
                        control={form.control}
                        name="done"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Done</FormLabel>
                                <FormControl>
                                    <input
                                        type="checkbox"
                                        checked={!!field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is the done status of your todo.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    /> */}
                    <button type="submit" className="mt-4 bg-black text-white px-4 py-2">
                        Add Todo
                    </button>
                </form>

                {message && <p className="mt-2">{message}</p>}
            </div>
        </Form>
    );
};

export default AddTodoForm;