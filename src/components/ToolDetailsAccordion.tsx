import type { ReactNode } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export interface ToolDetailsSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface ToolDetailsAccordionProps {
  title?: string;
  sections: ToolDetailsSection[];
}

/**
 * Collapsed-by-default SEO/help sections for tool pages.
 * Content stays in the DOM for prerendering and accessibility.
 */
export function ToolDetailsAccordion({
  title = 'Tool details',
  sections,
}: ToolDetailsAccordionProps) {
  return (
    <Card className="border-border/80 bg-card/50">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-muted-foreground">
          <BookOpen className="h-4 w-4" aria-hidden />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="multiple" className="w-full">
          {sections.map((section) => (
            <AccordionItem key={section.id} value={section.id}>
              <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
