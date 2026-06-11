import { auth } from '@clerk/nextjs/server';
import { GroupService } from '@/lib/services/group-service';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CreateGroupDialog } from '@/components/groups/CreateGroupDialog';

export default async function GroupsPage() {
  const { userId } = await auth();
  if (!userId) redirect('/');

  const groups = await GroupService.getGroupsForUser(userId);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20 px-6 md:px-10 font-sans">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold font-jakarta text-slate-900 dark:text-white">Your Groups</h1>
        <CreateGroupDialog />
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
          <p className="text-muted-foreground">You are not in any groups yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Link key={group.id} href={`/groups/${group.id}`}>
              <div className="p-6 border rounded-xl bg-card hover:shadow-md transition-shadow h-full">
                <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Created on {new Date(group.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
