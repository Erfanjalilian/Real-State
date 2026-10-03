import { PropertyEditor } from "@/components/admin/PropertyEditor";

export default async function AdminPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PropertyEditor propertyId={id} />;
}