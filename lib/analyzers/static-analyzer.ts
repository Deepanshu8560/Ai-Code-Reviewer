import type { Issue } from '@/types';
import { ALL_RULES } from './rules';

export async function analyzeCode(
    code: string,
    language: string,
    filename: string
): Promise<Issue[]> {
    const issues: Issue[] = [];

    // Apply pattern-based rules
    ALL_RULES.forEach((rule) => {
        if (typeof rule.pattern === 'function') {
            if (rule.pattern(code)) {
                issues.push(createIssueFromRule(rule, code, language, 1));
            }
        } else {
            const matches = code.matchAll(new RegExp(rule.pattern, 'g'));

            for (const match of matches) {
                const line = getLineNumber(code, match.index || 0);
                const codeSnippet = getCodeSnippet(code, line);

                issues.push({
                    id: `${rule.id}-${line}`,
                    title: rule.name,
                    description: rule.message,
                    severity: rule.severity,
                    category: rule.category,
                    line,
                    code: codeSnippet,
                    explanation: rule.explanation,
                    documentationLinks: rule.documentationLinks,
                    language,
                });
            }
        }
    });

    // Language-specific analysis
    if (language === 'javascript' || language === 'typescript') {
        issues.push(...analyzeJavaScript(code, language));
    } else if (language === 'css') {
        issues.push(...analyzeCSS(code, language));
    }

    return issues;
}

function analyzeJavaScript(code: string, language: string): Issue[] {
    const issues: Issue[] = [];

    // Check for var usage
    const varMatches = code.matchAll(/\bvar\s+\w+/g);
    for (const match of varMatches) {
        const line = getLineNumber(code, match.index || 0);
        issues.push({
            id: `var-usage-${line}`,
            title: 'Use const or let instead of var',
            description: 'var has function scope and can lead to bugs. Use const or let for block scoping.',
            severity: 'suggestion',
            category: 'best-practices',
            line,
            code: getCodeSnippet(code, line),
            explanation: 'Modern JavaScript uses const for values that don\'t change and let for values that do. This provides better scoping and prevents common bugs.',
            documentationLinks: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const'],
            language,
        });
    }

    // Check for == instead of ===
    const equalityMatches = code.matchAll(/[^=!]={2}[^=]/g);
    for (const match of equalityMatches) {
        const line = getLineNumber(code, match.index || 0);
        issues.push({
            id: `loose-equality-${line}`,
            title: 'Use strict equality (===)',
            description: 'Use === instead of == to avoid type coercion bugs',
            severity: 'suggestion',
            category: 'best-practices',
            line,
            code: getCodeSnippet(code, line),
            explanation: 'The == operator performs type coercion, which can lead to unexpected results. Always use === for strict equality checks.',
            documentationLinks: ['https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness'],
            language,
        });
    }

    return issues;
}

function analyzeCSS(code: string, language: string): Issue[] {
    const issues: Issue[] = [];

    // Check for color contrast (simplified)
    const colorMatches = code.matchAll(/color:\s*(#[0-9a-fA-F]{3,6}|rgb|hsl)/g);
    if (Array.from(colorMatches).length > 0) {
        issues.push({
            id: 'color-contrast-check',
            title: 'Verify color contrast ratios',
            description: 'Ensure text colors have sufficient contrast with backgrounds for accessibility',
            severity: 'suggestion',
            category: 'accessibility',
            line: 1,
            code: 'color: ...',
            explanation: 'WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.',
            documentationLinks: ['https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html'],
            language,
        });
    }

    return issues;
}

function createIssueFromRule(rule: any, code: string, language: string, line: number): Issue {
    return {
        id: `${rule.id}-${line}`,
        title: rule.name,
        description: rule.message,
        severity: rule.severity,
        category: rule.category,
        line,
        code: getCodeSnippet(code, line),
        explanation: rule.explanation,
        documentationLinks: rule.documentationLinks,
        language,
    };
}

function getLineNumber(code: string, index: number): number {
    return code.substring(0, index).split('\n').length;
}

function getCodeSnippet(code: string, line: number, context: number = 0): string {
    const lines = code.split('\n');
    const start = Math.max(0, line - 1 - context);
    const end = Math.min(lines.length, line + context);
    return lines.slice(start, end).join('\n');
}
