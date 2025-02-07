import { DashboardHeader } from "@/components/admindashbord/dashboard-header";
import { DashboardLayout } from "@/components/admindashbord/dashboard-layout";
import { ProductGrid } from "@/components/admindashbord/product-grid";
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/login');
  }

  if (user.publicMetadata.role !== 'admin') {
    redirect('/shop');
  }
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 p-4 md:p-6">
        <DashboardHeader />
        <ProductGrid />
      </div>
    </DashboardLayout>
  )
}

