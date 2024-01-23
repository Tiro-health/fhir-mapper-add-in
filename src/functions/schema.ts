import { z } from "zod";
export type CodingMatch = {
  display: string;
  code: string;
  semantic_axis: string;
  score: number;
};

export const CodingMatchSchema = z.strictObject({
  display: z.string(),
  code: z.string(),
  semantic_axis: z.string(),
  score: z.number(),
});

export const CodingMatchArraySchema = z.array(CodingMatchSchema);

export const ProcedureMatchSchema = z.strictObject({
  "procedure.code": CodingMatchArraySchema,
  "procedure.reasonCode": CodingMatchArraySchema,
  "procedure.bodySite": CodingMatchArraySchema,
  "procedure.focalDevice": CodingMatchArraySchema,
  "procedure.usedCode": CodingMatchArraySchema,
  "procedure.note": CodingMatchArraySchema,
});
