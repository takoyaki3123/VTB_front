import * as z from 'zod';
export const $groupItem = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string(),
  activeDate: z.string().optional(),
});
export type groupItem = z.infer<typeof $groupItem>;

export const $event = z.object({
  id: z.number(),
  img: z.string(),
  name: z.string(),
  gid: z.number(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const $member = z.object({
  id: z.number(),
  gid: z.number(),
  name: z.string(),
  img: z.string(),
  activeDate: z.string().optional().nullable(),
  sns: z.object().optional(),
  live: z.object().optional(),
});

// home type
export const $GetHomeResponse = z.object({
  img: z.string(),
  event: z.array($event),
  member: z.array($member),
});
export type GetHomeResponse = z.infer<typeof $GetHomeResponse>;
