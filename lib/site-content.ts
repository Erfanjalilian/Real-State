import { randomUUID } from "node:crypto";
import { readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export interface AboutContent {
  title: string;
  intro: string;
  activityTitle: string;
  activityDescription: string;
  servicesTitle: string;
  services: string[];
  advantagesTitle: string;
  advantages: string[];
  processTitle: string;
  processSteps: string[];
}

export interface ContactContent {
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  socialLinks: string[];
}

export interface BannerContent {
  imageUrl: string;
}

export type SiteContentSection = "about" | "contact" | "banner";
export type SiteContent = AboutContent | ContactContent | BannerContent;

const contentFiles: Record<SiteContentSection, string> = {
  about: "about.json",
  contact: "contact.json",
  banner: "banner.json",
};

const dataDirectory = path.join(process.cwd(), "data");

export async function getSiteContent(section: SiteContentSection): Promise<SiteContent> {
  const filePath = path.join(dataDirectory, contentFiles[section]);
  const content = await readFile(filePath, "utf8");
  return JSON.parse(content) as SiteContent;
}

export async function saveSiteContent(section: SiteContentSection, content: SiteContent) {
  const filePath = path.join(dataDirectory, contentFiles[section]);
  const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
  await writeFile(temporaryPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
  await rename(temporaryPath, filePath);
}

export function isSiteContent(section: SiteContentSection, value: unknown): value is SiteContent {
  if (!value || typeof value !== "object") return false;

  const content = value as Record<string, unknown>;
  const isString = (field: unknown) => typeof field === "string";
  const isStringArray = (field: unknown) => Array.isArray(field) && field.every(isString);

  if (section === "about") {
    return (
      isString(content.title) &&
      isString(content.intro) &&
      isString(content.activityTitle) &&
      isString(content.activityDescription) &&
      isString(content.servicesTitle) &&
      isStringArray(content.services) &&
      isString(content.advantagesTitle) &&
      isStringArray(content.advantages) &&
      isString(content.processTitle) &&
      isStringArray(content.processSteps)
    );
  }

  if (section === "contact") {
    return (
      isString(content.phone) &&
      isString(content.email) &&
      isString(content.address) &&
      isString(content.workingHours) &&
      isStringArray(content.socialLinks)
    );
  }

  return isString(content.imageUrl);
}