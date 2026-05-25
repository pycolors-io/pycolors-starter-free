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
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@pycolors/ui';

import { PageShell } from '@/components/app/page-shell';

type Role = 'owner' | 'member';
type InviteStatus = 'pending' | 'expired';
type AdminTab = 'members' | 'invites';

type Member = Readonly<{
  id: string;
  name: string;
  email: string;
  role: Role;
}>;

type Invitation = Readonly<{
  id: string;
  email: string;
  role: Role;
  status: InviteStatus;
  invitedAt: string;
}>;

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'u_001',
    name: 'Patrice P.',
    email: 'patrice@pycolors.io',
    role: 'owner',
  },
  {
    id: 'u_002',
    name: 'Ashley D.',
    email: 'ashley@company.com',
    role: 'member',
  },
  {
    id: 'u_003',
    name: 'Alan R.',
    email: 'alan@company.com',
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

function RoleBadge({ role }: Readonly<{ role: Role }>) {
  const labelByRole: Record<Role, string> = {
    owner: 'Owner',
    member: 'Member',
  };

  return <Badge>{labelByRole[role]}</Badge>;
}

function InviteStatusBadge({
  status,
}: Readonly<{ status: InviteStatus }>) {
  const labelByStatus: Record<InviteStatus, string> = {
    pending: 'Pending',
    expired: 'Expired',
  };

  return <Badge>{labelByStatus[status]}</Badge>;
}

function MembersRows({
  isLoading,
  members,
  onRemoveMember,
}: Readonly<{
  isLoading: boolean;
  members: Member[];
  onRemoveMember: (id: string) => void;
}>) {
  if (isLoading) {
    return <TableLoading colSpan={4} />;
  }

  if (members.length === 0) {
    return (
      <TableEmpty
        colSpan={4}
        title="No members yet"
        description="Invite your first member to start collaborating."
      />
    );
  }

  return members.map((member) => (
    <TableRow key={member.id}>
      <TableCell className="font-medium">{member.name}</TableCell>

      <TableCell className="text-muted-foreground">
        {member.email}
      </TableCell>

      <TableCell>
        <RoleBadge role={member.role} />
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem disabled>Change role</DropdownMenuItem>

            <DropdownMenuSeparator />

            {member.role === 'owner' ? (
              <DropdownMenuItem disabled>
                Owner cannot be removed
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  onRemoveMember(member.id);
                }}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Remove
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));
}

function InvitationRows({
  isLoading,
  invites,
  onResendInvite,
  onCancelInvite,
}: Readonly<{
  isLoading: boolean;
  invites: Invitation[];
  onResendInvite: (id: string) => void;
  onCancelInvite: (id: string) => void;
}>) {
  if (isLoading) {
    return <TableLoading colSpan={5} />;
  }

  if (invites.length === 0) {
    return (
      <TableEmpty
        colSpan={5}
        title="No invitations"
        description="Invite members to join your organization."
      />
    );
  }

  return invites.map((invite) => (
    <TableRow key={invite.id}>
      <TableCell className="font-medium">{invite.email}</TableCell>

      <TableCell>
        <RoleBadge role={invite.role} />
      </TableCell>

      <TableCell>
        <InviteStatusBadge status={invite.status} />
      </TableCell>

      <TableCell className="text-muted-foreground">
        {invite.invitedAt}
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                onResendInvite(invite.id);
              }}
            >
              <RefreshCw
                className="mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Resend invite
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onSelect={(event) => {
                event.preventDefault();
                onCancelInvite(invite.id);
              }}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
              Cancel invite
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ));
}

export default function AdminMembersPage() {
  const [tab, setTab] = React.useState<AdminTab>('members');
  const [isLoading, setIsLoading] = React.useState(true);

  const [members, setMembers] =
    React.useState<Member[]>(INITIAL_MEMBERS);
  const [invites, setInvites] =
    React.useState<Invitation[]>(INITIAL_INVITES);

  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<Role>('member');

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  function closeInvite(next: boolean) {
    setInviteOpen(next);

    if (!next) {
      setInviteEmail('');
      setInviteRole('member');
    }
  }

  function onInviteSubmit(event: React.FormEvent) {
    event.preventDefault();

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
    setMembers((prev) => prev.filter((member) => member.id !== id));
  }

  function resendInvite(id: string) {
    setInvites((prev) =>
      prev.map((invite) =>
        invite.id === id
          ? { ...invite, status: 'pending', invitedAt: 'Resent now' }
          : invite,
      ),
    );
  }

  function cancelInvite(id: string) {
    setInvites((prev) => prev.filter((invite) => invite.id !== id));
  }

  return (
    <PageShell
      title="Admin"
      description="Manage organization members, roles, and invitations."
      actions={
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsLoading((value) => !value)}
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
          <AlertTitle>B2B-ready administration surface</AlertTitle>
          <AlertDescription>
            A structured admin experience for members, roles,
            invitations, protected ownership, and team collaboration
            workflows.
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
            Organization access
          </CardTitle>
          <CardDescription>
            Review active members, manage pending invitations, and
            keep ownership controls explicit.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0 pt-4">
          <Tabs
            value={tab}
            onValueChange={(value) => setTab(value as AdminTab)}
          >
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
                    <MembersRows
                      isLoading={isLoading}
                      members={members}
                      onRemoveMember={removeMember}
                    />
                  </TableBody>
                </Table>

                <div className="mt-3 text-xs text-muted-foreground">
                  Owner access is protected to prevent accidental
                  lockouts. Extend with permissions, seat limits, and
                  audit trails as your product grows.
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
                    <InvitationRows
                      isLoading={isLoading}
                      invites={invites}
                      onResendInvite={resendInvite}
                      onCancelInvite={cancelInvite}
                    />
                  </TableBody>
                </Table>

                <div className="mt-3 text-xs text-muted-foreground">
                  Invitation flows are shaped for email delivery,
                  expiry policies, revoke actions, and role-aware
                  onboarding.
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
              Create a pending invitation and prepare the member for
              workspace access.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onInviteSubmit} className="mt-4 space-y-4">
            <Input
              label="Email"
              type="email"
              value={inviteEmail}
              onChange={(event) => setInviteEmail(event.target.value)}
              placeholder="teammate@company.com"
              autoFocus
              leftIcon={
                <Mail className="h-4 w-4" aria-hidden="true" />
              }
              helperText="The invitation will appear under Invitations."
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
                Owner access should be reserved for trusted workspace
                administrators.
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
