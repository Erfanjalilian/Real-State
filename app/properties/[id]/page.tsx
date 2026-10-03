import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyDetailsPageClient } from "@/components/properties/PropertyDetailsPageClient";
import { getPropertyById } from "@/lib/property-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = await getPropertyById(Number(id));

  if (!property) {
    return {
      title: "آگهی یافت نشد | رهن و فروش",
    };
  }

  return {
    title: `${property.title} | رهن و فروش`,
    description: property.description,
    openGraph: {
      title: property.title,
      description: property.description,
      images: property.images,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const propertyId = Number(id);
  const property = await getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  return <PropertyDetailsPageClient propertyId={propertyId} />;
}
