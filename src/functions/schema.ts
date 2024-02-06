import { z } from "zod";
export type CodingMatch = {
  display: string;
  code: string;
  semantic_axis: string;
  score: number;
  prefered_term: string;
  levenshtein?: string;
};

export const CodingMatchArraySchema = z.array(
  z.strictObject({
    display: z.string(),
    code: z.string(),
    semantic_axis: z.string(),
    score: z.number(),
    prefered_term: z.string(),
    levenshtein: z.optional(z.string()),
  })
);

export const ProcedureMatchSchema = z.strictObject({
  version: z.string(),
  input_description: z.string(),
  resourcetype: z.string(),
  code: CodingMatchArraySchema,
  reasoncode: CodingMatchArraySchema,
  bodysite: CodingMatchArraySchema,
  focaldevice: CodingMatchArraySchema,
  usedcode: CodingMatchArraySchema,
  note: CodingMatchArraySchema,
});
