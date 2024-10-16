import { z } from "zod";
import { CollageTemplateType } from "./types";

export const formSchema = z.object({
  files: z.array(z.instanceof(File)).max(7, "You can upload up to 5 files").min(1),
  columns: z
    .enum([
      "grid_2x2",
      "horizontal_3",
      "vertical_stack",
      "3x3_grid",
      "polaroid_frame",
    ])
    .default("grid_2x2"),
});
