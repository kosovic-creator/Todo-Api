import { z } from "zod";
const UserSchema = z.object({
    name: z.string().min(3, "Ime mora imati najmanje 3 karaktera"),
    age: z.number().positive("Godine moraju biti pozitivan broj"),
    email: z.string().email("Neispravan format email adrese"),
    });
    type User = z.infer<typeof UserSchema>;
  export default UserSchema;
