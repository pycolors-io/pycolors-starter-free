import Link from 'next/link';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@pycolors/ui';

export default function NotFound() {
  return (
    <div className="space-y-6">
      <Card className="p-4">
        <CardHeader className="p-0">
          <CardTitle>Project not found</CardTitle>
          <CardDescription>
            This project ID doesn’t exist in the v1 mock dataset.
          </CardDescription>
        </CardHeader>
      </Card>

      <Button asChild variant="outline">
        <Link href="/projects">Back to projects</Link>
      </Button>
    </div>
  );
}
