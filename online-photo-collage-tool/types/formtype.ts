import { z } from "zod";
import { CollageTemplateType } from "./types";

export const formSchema = z.object({
  files: z.array(z.instanceof(File)).max(5, "You can upload up to 5 files"),
  columns: z
    .enum([
      "grid_2x2",
      "horizontal_3",
      "vertical_stack",
      "grid_3x3",
      "polaroid_frame",
    ])
    .default("grid_2x2"),
});
