"use client";
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PageHead from '@/components/shared/page-head';
import { AlertIcon, RefreshIcon, HomeIcon, BugIcon } from '@/lib/icons';
import { logger } from '@/lib/logger';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error('Global application error occurred', { 
      message: error.message, 
      stack: error.stack, 
      digest: error.digest 
    });
  }, [error]);

  return (
    <html>
      <body>
        <PageHead
          title="Something went wrong"
          description="An unexpected error occurred"
        />
        
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background to-muted">
          <Card className="w-full max-w-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertIcon className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-xl">Something went wrong!</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <Alert>
                <BugIcon className="h-4 w-4" />
                <AlertDescription>
                  An unexpected error occurred. Our team has been notified and will investigate.
                </AlertDescription>
              </Alert>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={reset}
                  className="flex-1"
                  variant="default"
                >
                  <RefreshIcon className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Button 
                  onClick={() => window.location.href = '/'}
                  variant="outline"
                  className="flex-1"
                >
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                    Error Details (Development)
                  </summary>
                  <pre className="mt-2 text-xs bg-muted p-2 rounded overflow-auto max-h-32">
                    {error.message}
                    {error.stack && `\n\n${error.stack}`}
                  </pre>
                </details>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Error ID: {error.digest || Date.now().toString(36)}
              </p>
            </CardContent>
          </Card>
        </div>
      </body>
    </html>
  );
}