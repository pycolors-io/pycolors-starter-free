import Link from 'next/link';
import { FolderSearch } from 'lucide-react';

import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@pycolors/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Card className="w-full max-w-md p-6">
        <CardHeader className="items-center space-y-4 p-0 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-md border border-border/60 bg-muted/30 text-muted-foreground">
            <FolderSearch className="h-5 w-5" aria-hidden="true" />
          </span>

          <div className="space-y-2">
            <CardTitle>Project not found</CardTitle>

            <CardDescription className="leading-6">
              The requested project could not be located in this
              workspace. It may have been removed, renamed, or the URL
              may be invalid.
            </CardDescription>
          </div>
        </CardHeader>

        <div className="mt-6 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/projects">Back to projects</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
