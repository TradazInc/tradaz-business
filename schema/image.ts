import { z } from "zod";

export const imageSchema = z.url({ error: "enter a valid image url" });
