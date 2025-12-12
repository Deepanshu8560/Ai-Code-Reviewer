import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { Issue } from '@/types';

export async function analyzeWithAI(
    code: string,
    language: string,
    filename: string,
    apiKey: string
): Promise<Issue[]> {
    try {
        const prompt = buildAnalysisPrompt(code, language, filename);

        const { text } = await generateText({
            model: openai('gpt-4o', { apiKey }),
            prompt,
            temperature: 0.3,
        });

        // Parse AI response into structured issues
        const issues = parseAIResponse(text, language);
        return issues;
    } catch (error) {
        console.error('AI analysis error:', error);
        return [];
    }
}

function buildAnalysisPrompt(code: string, language: string, filename: string): string {
    return `You are an expert code reviewer. Analyze the following ${language} code from ${filename} and identify issues related to:

1. Performance (bundle size, expensive operations, unnecessary re-renders)
2. Accessibility (WCAG compliance, ARIA, semantic HTML)
3. Security (XSS risks, exposed secrets, vulnerable patterns)
4. Code Quality (complexity, duplication, maintainability)
5. Best Practices (framework-specific patterns, modern standards)
6. Design System (CSS consistency, Tailwind usage)

For each issue found, provide:
- A clear title
- Detailed description
- Severity level (critical, warning, or suggestion)
- Category (performance, accessibility, security, code-quality, best-practices, or design-system)
- Line number where the issue occurs
- A code snippet showing the problem
- An explanation of why it matters
- A suggested fix with improved code

Return your analysis in the following JSON format:
{
  "issues": [
    {
      "title": "Issue title",
      "description": "Brief description",
      "severity": "critical|warning|suggestion",
      "category": "performance|accessibility|security|code-quality|best-practices|design-system",
      "line": 10,
      "code": "problematic code snippet",
      "explanation": "Detailed explanation of the issue and its impact",
      "suggestion": "improved code snippet"
    }
  ]
}

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Provide actionable, specific feedback. Focus on the most important issues first.`;
}

function parseAIResponse(response: string, language: string): Issue[] {
    try {
        // Extract JSON from response (handle markdown code blocks)
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            console.error('No JSON found in AI response');
            return [];
        }

        const parsed = JSON.parse(jsonMatch[0]);

        if (!parsed.issues || !Array.isArray(parsed.issues)) {
            console.error('Invalid AI response format');
            return [];
        }

        return parsed.issues.map((issue: any, index: number) => ({
            id: `ai-${index}`,
            title: issue.title || 'Untitled Issue',
            description: issue.description || '',
            severity: validateSeverity(issue.severity),
            category: validateCategory(issue.category),
            line: issue.line || 1,
            code: issue.code || '',
            explanation: issue.explanation || '',
            suggestion: issue.suggestion || undefined,
            language,
        }));
    } catch (error) {
        console.error('Error parsing AI response:', error);
        return [];
    }
}

function validateSeverity(severity: string): 'critical' | 'warning' | 'suggestion' {
    if (['critical', 'warning', 'suggestion'].includes(severity)) {
        return severity as 'critical' | 'warning' | 'suggestion';
    }
    return 'suggestion';
}

function validateCategory(category: string): Issue['category'] {
    const validCategories = [
        'performance',
        'accessibility',
        'security',
        'code-quality',
        'best-practices',
        'design-system',
    ];

    if (validCategories.includes(category)) {
        return category as Issue['category'];
    }
    return 'code-quality';
}
