import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().min(7).optional().or(z.literal("")),
  relationship: z.string().optional()
});

export const planSchema = z.object({
  title: z.string().min(2),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  safeWords: z.array(z.string()).default([]),
  instructions: z.string().optional(),
  contactIds: z.array(z.string()).default([])
});

export const startCheckinSchema = z.object({
  planId: z.string(),
  durationMinutes: z.number().int().min(1).max(720),
  note: z.string().optional()
});

export const extendCheckinSchema = z.object({
  minutes: z.number().int().min(1).max(360)
});

export const locationSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  accuracy: z.number().optional()
});

export const sosSchema = z.object({
  message: z.string().optional()
});
