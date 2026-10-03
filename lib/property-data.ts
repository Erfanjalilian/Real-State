import fs from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

export type PropertyType = "land" | "house" | "villa" | "shop";

export interface Property {
  id: number;
  title: string;
  type: PropertyType;
  propertyType: string;
  province: string;
  city: string;
  price: number;
  area: number;
  description: string;
  images: string[];
  address: string;
  phone: string;
  features: string[];
  createdAt: string;
  featured?: boolean;
}

export type PropertyInput = Omit<Property, "id" | "createdAt"> & { createdAt?: string };

export interface PropertyFilters {
  province?: string;
  city?: string;
  type?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
}

const dataDir = path.join(process.cwd(), "data");

async function readJson<T>(fileName: string): Promise<T> {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

export async function getAllProperties(): Promise<Property[]> {
  return readJson<Property[]>("properties.json");
}

export async function getProvinces(): Promise<string[]> {
  return readJson<string[]>("provinces.json");
}

export async function getCities(province?: string): Promise<string[]> {
  const cities = await readJson<Record<string, string[]>>("cities.json");

  if (!province) {
    return Object.values(cities).flat();
  }

  return cities[province] ?? [];
}

export async function getPropertyById(id: number): Promise<Property | null> {
  const properties = await getAllProperties();
  return properties.find((property) => property.id === id) ?? null;
}

async function writeProperties(properties: Property[]) {
  const filePath = path.join(dataDir, "properties.json");
  const temporaryPath = `${filePath}.${randomUUID()}.tmp`;
  await fs.writeFile(temporaryPath, `${JSON.stringify(properties, null, 2)}\n`, "utf8");
  await fs.rename(temporaryPath, filePath);
}

export async function createProperty(input: PropertyInput): Promise<Property> {
  const properties = await getAllProperties();
  const property: Property = {
    ...input,
    id: Math.max(0, ...properties.map((item) => item.id)) + 1,
    createdAt: input.createdAt || new Date().toISOString().slice(0, 10),
  };
  properties.push(property);
  await writeProperties(properties);
  return property;
}

export async function updateProperty(id: number, updatedProperty: PropertyInput): Promise<Property | null> {
  const properties = await getAllProperties();
  const index = properties.findIndex((property) => property.id === id);
  if (index === -1) return null;

  properties[index] = {
    ...updatedProperty,
    id,
    createdAt: updatedProperty.createdAt || properties[index].createdAt,
  };
  await writeProperties(properties);
  return properties[index];
}

export async function deleteProperty(id: number): Promise<Property | null> {
  const properties = await getAllProperties();
  const index = properties.findIndex((property) => property.id === id);
  if (index === -1) return null;
  const [deleted] = properties.splice(index, 1);
  await writeProperties(properties);
  return deleted;
}

export function isPropertyInput(value: unknown): value is PropertyInput {
  if (!value || typeof value !== "object") return false;
  const property = value as Record<string, unknown>;
  const validTypes: PropertyType[] = ["land", "house", "villa", "shop"];
  const isStringArray = (field: unknown) => Array.isArray(field) && field.every((item) => typeof item === "string");

  return (
    typeof property.title === "string" &&
    validTypes.includes(property.type as PropertyType) &&
    typeof property.propertyType === "string" &&
    typeof property.province === "string" &&
    typeof property.city === "string" &&
    typeof property.price === "number" && Number.isFinite(property.price) &&
    typeof property.area === "number" && Number.isFinite(property.area) &&
    typeof property.description === "string" &&
    isStringArray(property.images) &&
    typeof property.address === "string" &&
    typeof property.phone === "string" &&
    isStringArray(property.features) &&
    (property.createdAt === undefined || typeof property.createdAt === "string") &&
    (property.featured === undefined || typeof property.featured === "boolean")
  );
}

export function normalizeFilters(filters: PropertyFilters): PropertyFilters {
  return {
    province: filters.province?.trim() || undefined,
    city: filters.city?.trim() || undefined,
    type: filters.type && filters.type !== "all" ? filters.type : undefined,
    minPrice: Number.isFinite(filters.minPrice) ? Number(filters.minPrice) : undefined,
    maxPrice: Number.isFinite(filters.maxPrice) ? Number(filters.maxPrice) : undefined,
  };
}

export async function getFilteredProperties(filters: PropertyFilters): Promise<Property[]> {
  const normalized = normalizeFilters(filters);
  const properties = await getAllProperties();

  return properties.filter((property) => {
    if (normalized.province && property.province !== normalized.province) {
      return false;
    }

    if (normalized.city && property.city !== normalized.city) {
      return false;
    }

    if (normalized.type && property.type !== normalized.type) {
      return false;
    }

    if (typeof normalized.minPrice === "number" && property.price < normalized.minPrice) {
      return false;
    }

    if (typeof normalized.maxPrice === "number" && property.price > normalized.maxPrice) {
      return false;
    }

    return true;
  });
}
