
import { Template } from "@/types";

export const templates: Template[] = [
  {
    id: "modern",
    name: "Modern",
    description: "A clean, professional template with a modern touch.",
    previewImage: "/templates/modern.png",
  },
  {
    id: "classic",
    name: "Classic",
    description: "A timeless, traditional resume layout.",
    previewImage: "/templates/classic.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with this bold, creative design.",
    previewImage: "/templates/creative.png",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple and elegant with focus on content.",
    previewImage: "/templates/minimal.png",
  },
];

export function getTemplateById(templateId: string): Template {
  return templates.find((template) => template.id === templateId) || templates[0];
}
