
// import { z } from "zod";

//   const dodajArtikalSchema = z.object({
//     naziv: z.string().min(3, "Artikal mora imati najmanje 3 karaktera"),
//        cijena: z
//         .string()
//         .regex(/^\d+(\.\d{1,2})?$/, 'Cijena mora biti validan broj sa do 2 decimalne tačke'),
//     });

//     type Product = z.infer<typeof dodajArtikalSchema>;
//   export default dodajArtikalSchema; ;

export interface Item {
  id:    number
  title: String
  details: String
  priority: number
  done:  Boolean
}










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
