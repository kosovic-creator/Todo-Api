
import { z } from "zod";
const TodoSchema = z.object({
    title: z.string().min(3, "Title mora imati najmanje 3 karaktera"),
    priority: z.number().positive("Godine moraju biti pozitivan broj"),
    details: z.string().min(3, "Detail mora imati najmanje 3 karaktera"),
    // email: z.string().email("Neispravan format email adrese"),
    });
    type todo = z.infer<typeof TodoSchema>;
  export default TodoSchema;


type Todo = {
  id: string;
  title: string;
  priority: number;
  done: boolean;
  details?: string; // Added optional 'details' property
};










  // const GostSchema = z.object({
//     naziv: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   naziv: z.string().min(4, 'Product naziv is required'),
//   cijena: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'cijena must be a valid number with up to 2 decimal places'),
// });// const GostSchema = z.object({
//     naziv: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
//     age: z.number().positive("Godine moraju biti pozitivan broj"),
//     email: z.string().email("Neispravan format email adrese"),
//     });
//     type Gost = z.infer<typeof GostSchema>;
//   export default GostSchema; ;

// Definišite Zod šemu za validaciju
// const productSchema = z.object({
//   naziv: z.string().min(4, 'Product naziv is required'),
//   cijena: z
//     .string()
//     .regex(/^\d+(\.\d{1,2})?$/, 'cijena must be a valid number with up to 2 decimal places'),
// });
