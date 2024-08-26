import { z } from "zod";

export const DownloadSchema = z.object({
    url : z.string(),
    quality : z.string()
})