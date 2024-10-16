import { z } from "zod";

export const formSchema = z.object({
    files: z.array(z.instanceof(File)).max(5, "You can upload up to 5 files"), 
    columns: z.enum(["2", "3"]).default("2"), 
  });