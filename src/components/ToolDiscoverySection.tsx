import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getTool } from '@/data/tools';
import { getBlogPostBySlug } from '@/data/blogPosts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ToolDiscoverySectionProps {
  path: string;
}

export function ToolDiscoverySection({ path }: ToolDiscoverySectionProps) {
  const tool = getTool(path);
  if (!tool) {
    return null;
  }

  const guide = getBlogPostBySlug(tool.guideSlug);
  const relatedTools = tool.relatedToolPaths
    .map((relatedPath) => getTool(relatedPath))
    .filter((related): related is NonNullable<typeof related> => Boolean(related));

  return (
    <div className="space-y-8">
      {(guide || relatedTools.length > 0) && (
        <section className="pt-2">
          <h2 className="text-lg font-bold text-foreground mb-4">Related guides and tools</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {guide && (
              <Link
                to={`/blog/${guide.slug}`}
                className="block rounded-lg border border-border bg-card p-4 hover-card-brand"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-1 inline-flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" aria-hidden />
                  Guide
                </p>
                <p className="font-medium text-foreground text-sm mb-1">{guide.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{guide.excerpt}</p>
              </Link>
            )}
            {relatedTools.map((related) => (
              <Link
                key={related.path}
                to={related.path}
                className="block rounded-lg border border-border bg-card p-4 hover-card-brand"
              >
                <p className="font-medium text-foreground text-sm mb-1 inline-flex items-center gap-1">
                  {related.name}
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{related.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {tool.faqs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-foreground mb-4">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {tool.faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}
