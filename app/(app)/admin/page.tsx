'use client';

import * as React from 'react';
import {
  Mail,
  MoreHorizontal,
  RefreshCw,
  Trash2,
  UserPlus,
  Users,
} from 'lucide-react';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableEmpty,
  TableLoading,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Alert,
  AlertTitle,
  AlertDescription,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

type Role = 'owner' | 'member';

type Member = {
  id: string;
  name: string;
  email: string;
  role: Role;
};

type InviteStatus = 'pending' | 'expired';

type Invitation = {
  id: string;
  email: string;
  role: Role;
  status: InviteStatus;
  invitedAt: string;
};

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'u_001',
    name: 'Patrice P.',
    email: 'patrice@pycolors.io',
    role: 'owner',
  },
  {
    id: 'u_002',
    name: 'Marie D.',
    email: 'marie@company.com',
    role: 'member',
  },
  {
    id: 'u_003',
    name: 'Alex R.',
    email: 'alex@company.com',
    role: 'member',
  },
];

const INITIAL_INVITES: Invitation[] = [
  {
    id: 'i_001',
    email: 'sarah@company.com',
    role: 'member',
    status: 'pending',
    invitedAt: 'Today 10:12',
  },
  {
    id: 'i_002',
    email: 'cto@company.com',
    role: 'owner',
    status: 'expired',
    invitedAt: '2 days ago',
  },
];

function RoleBadge({ role }: { role: Role }) {
  return <Badge>{role === 'owner' ? 'Owner' : 'Member'}</Badge>;
}

function InviteStatusBadge({ status }: { status: InviteStatus }) {
  return (
    <Badge>{status === 'pending' ? 'Pending' : 'Expired'}</Badge>
  );
}

export default function AdminMembersPage() {
  const [tab, setTab] = React.useState<'members' | 'invites'>(
    'members',
  );

  const [isLoading, setIsLoading] = React.useState(true);

  const [members, setMembers] =
    React.useState<Member[]>(INITIAL_MEMBERS);
  const [invites, setInvites] =
    React.useState<Invitation[]>(INITIAL_INVITES);

  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<Role>('member');

  React.useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  function closeInvite(next: boolean) {
    setInviteOpen(next);
    if (!next) {
      setInviteEmail('');
      setInviteRole('member');
    }
  }

  function onInviteSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = inviteEmail.trim();
    if (!email) return;

    const newInvite: Invitation = {
      id: `i_${Math.random().toString(16).slice(2, 8)}`,
      email,
      role: inviteRole,
      status: 'pending',
      invitedAt: 'Just now',
    };

    setInvites((prev) => [newInvite, ...prev]);
    closeInvite(false);
    setTab('invites');
  }

  function removeMember(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function changeRoleMock(id: string) {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        if (m.role === 'owner') return m;
        return { ...m, role: 'member' };
      }),
    );
  }

  function resendInvite(id: string) {
    setInvites((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, status: 'pending', invitedAt: 'Resent now' }
          : i,
      ),
    );
  }

  function cancelInvite(id: string) {
    setInvites((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <PageShell
      title="Admin"
      description="Members, roles, and invitations."
      actions={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((v) => !v)}
          >
            Toggle loading
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={() => setInviteOpen(true)}
          >
            <UserPlus className="h-4 w-4" aria-hidden="true" />
            Invite member
          </Button>
        </div>
      }
      meta={
        <Alert>
          <AlertTitle>B2B-ready surface</AlertTitle>
          <AlertDescription>
            Manage members, roles, and invitations — essential
            building blocks for any B2B SaaS. Connect your backend and
            email provider to make these flows fully functional.
          </AlertDescription>
        </Alert>
      }
    >
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center gap-2">
            <Users
              className="h-4 w-4 text-muted-foreground"
              aria-hidden="true"
            />
            Organization
          </CardTitle>
          <CardDescription>
            Roles, members, pending invites, resend/cancel flows. All
            local-only in v1.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as any)}>
            <TabsList>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="invites">Invitations</TabsTrigger>
            </TabsList>

            <TabsContent value="members">
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableLoading colSpan={4} />
                    ) : members.length === 0 ? (
                      <TableEmpty
                        colSpan={4}
                        title="No members yet"
                        description="Invite your first member to collaborate."
                      />
                    ) : (
                      members.map((m) => (
                        <TableRow key={m.id}>
                          <TableCell className="font-medium">
                            {m.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {m.email}
                          </TableCell>
                          <TableCell>
                            <RoleBadge role={m.role} />
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  aria-label="Member actions"
                                >
                                  <MoreHorizontal
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  Actions
                                </DropdownMenuLabel>

                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    changeRoleMock(m.id);
                                  }}
                                >
                                  Change role (mock)
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                {m.role === 'owner' ? (
                                  <DropdownMenuItem disabled>
                                    Owner cannot be removed
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onSelect={(e) => {
                                      e.preventDefault();
                                      removeMember(m.id);
                                    }}
                                    className="text-destructive focus:text-destructive"
                                  >
                                    <Trash2
                                      className="mr-2 h-4 w-4"
                                      aria-hidden="true"
                                    />
                                    Remove
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="mt-3 text-xs text-muted-foreground">
                  Owner is protected to prevent accidental lockouts.
                  v2 can add: permissions model, seat limits, audit
                  logs.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="invites">
              <div className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Invited</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {isLoading ? (
                      <TableLoading colSpan={5} />
                    ) : invites.length === 0 ? (
                      <TableEmpty
                        colSpan={5}
                        title="No invitations"
                        description="Invite members to join your organization."
                      />
                    ) : (
                      invites.map((i) => (
                        <TableRow key={i.id}>
                          <TableCell className="font-medium">
                            {i.email}
                          </TableCell>
                          <TableCell>
                            <RoleBadge role={i.role} />
                          </TableCell>
                          <TableCell>
                            <InviteStatusBadge status={i.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {i.invitedAt}
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  aria-label="Invite actions"
                                >
                                  <MoreHorizontal
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  Actions
                                </DropdownMenuLabel>

                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    resendInvite(i.id);
                                  }}
                                >
                                  <RefreshCw
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  Resend invite
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />

                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault();
                                    cancelInvite(i.id);
                                  }}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                  />
                                  Cancel invite
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>

                <div className="mt-3 text-xs text-muted-foreground">
                  v1 local-only. Later: POST /org/invitations, resend,
                  revoke, expiry policies.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={inviteOpen} onOpenChange={closeInvite}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite member</DialogTitle>
            <DialogDescription>
              Create a pending invitation. No email is sent in v1
              (mock).
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onInviteSubmit} className="mt-4 space-y-4">
            <Input
              label="Email"
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="teammate@company.com"
              autoFocus
              leftIcon={
                <Mail className="h-4 w-4" aria-hidden="true" />
              }
              helperText="This will appear under “Invitations”."
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={
                    inviteRole === 'member' ? 'default' : 'outline'
                  }
                  onClick={() => setInviteRole('member')}
                >
                  Member
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={
                    inviteRole === 'owner' ? 'default' : 'outline'
                  }
                  onClick={() => setInviteRole('owner')}
                >
                  Owner
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                v2: replace with Select + permissions model.
              </p>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => closeInvite(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!inviteEmail.trim()}>
                Invite
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
