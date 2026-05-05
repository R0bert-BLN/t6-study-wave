import type { Assignment } from "@/types/resources/assignment.ts";
import type { Material } from "@/types/resources/material.ts";

// @ts-ignore
export enum ClassworkType {
  Assignment = "assignment",
  Material = "material",
}

export type ClassworkItem =
  | (Assignment & { type: ClassworkType.Assignment })
  | (Material & { type: ClassworkType.Material });
export type Classwork = Record<string, ClassworkItem[]>;
