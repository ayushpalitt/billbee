import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/profile/ProfileForm";

export const metadata = {
  title: "Profile & Settings - BillBee",
};

export default async function ProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { clerk_id: userId },
  });

  if (!user) {
    redirect("/");
  }

  const initialData = {
    name: user.name,
    email: user.email,
    default_currency: user.default_currency,
    monthly_budget: user.monthly_budget,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6 font-sans">
      {/* Background decorations matching the venture-backed aesthetic */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-green-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold font-jakarta tracking-tight text-slate-900 dark:text-white mb-4">
            Profile & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">Settings</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Customize your BillBee experience. Your settings help us provide better insights and accurate financial tracking.
          </p>
        </div>

        <ProfileForm initialData={initialData} />
      </div>
    </div>
  );
}
