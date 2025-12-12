import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Detect programming language from file extension
 */
export function detectLanguage(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();

    const languageMap: Record<string, string> = {
        'js': 'javascript',
        'jsx': 'javascript',
        'ts': 'typescript',
        'tsx': 'typescript',
        'css': 'css',
        'scss': 'scss',
        'html': 'html',
        'json': 'json',
    };

    return languageMap[ext || ''] || 'plaintext';
}

/**
 * Get color class for severity level
 */
export function getSeverityColor(severity: 'critical' | 'warning' | 'suggestion'): string {
    const colors = {
        critical: 'text-red-600 bg-red-50 border-red-200',
        warning: 'text-amber-600 bg-amber-50 border-amber-200',
        suggestion: 'text-blue-600 bg-blue-50 border-blue-200',
    };

    return colors[severity];
}

/**
 * Get icon color for severity level
 */
export function getSeverityIconColor(severity: 'critical' | 'warning' | 'suggestion'): string {
    const colors = {
        critical: 'text-red-600',
        warning: 'text-amber-600',
        suggestion: 'text-blue-600',
    };

    return colors[severity];
}

/**
 * Format code with proper indentation
 */
export function formatCode(code: string, language: string): string {
    // Basic formatting - in production, use prettier or similar
    return code.trim();
}

/**
 * Export issues to JSON
 */
export function exportToJSON(data: any): string {
    return JSON.stringify(data, null, 2);
}

/**
 * Export issues to Markdown
 */
export function exportToMarkdown(issues: any[], filename: string): string {
    let markdown = `# Code Review Report: ${filename}\n\n`;
    markdown += `Generated on: ${new Date().toLocaleString()}\n\n`;

    const grouped = groupBy(issues, 'severity');

    Object.entries(grouped).forEach(([severity, items]) => {
        markdown += `## ${severity.toUpperCase()} Issues (${items.length})\n\n`;

        items.forEach((issue: any, index: number) => {
            markdown += `### ${index + 1}. ${issue.title}\n\n`;
            markdown += `**Category:** ${issue.category}\n\n`;
            markdown += `**Line:** ${issue.line}\n\n`;
            markdown += `${issue.description}\n\n`;

            if (issue.suggestion) {
                markdown += `**Suggested Fix:**\n\`\`\`${issue.language}\n${issue.suggestion}\n\`\`\`\n\n`;
            }

            markdown += '---\n\n';
        });
    });

    return markdown;
}

/**
 * Group array by key
 */
function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
    return array.reduce((result, item) => {
        const group = String(item[key]);
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {} as Record<string, T[]>);
}

/**
 * Calculate code quality score based on issues
 */
export function calculateQualityScore(issues: any[]): number {
    if (issues.length === 0) return 100;

    const weights = {
        critical: 10,
        warning: 5,
        suggestion: 2,
    };

    const totalPenalty = issues.reduce((sum, issue) => {
        return sum + (weights[issue.severity as keyof typeof weights] || 0);
    }, 0);

    const score = Math.max(0, 100 - totalPenalty);
    return Math.round(score);
}
