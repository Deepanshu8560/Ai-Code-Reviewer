import { NextRequest, NextResponse } from 'next/server';
import { analyzeCode } from '@/lib/analyzers/static-analyzer';
import { analyzeWithAI } from '@/lib/analyzers/ai-analyzer';
import { calculateQualityScore } from '@/lib/utils';
import type { Issue, AnalysisResult } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { code, language, filename, useAI } = body;

        if (!code || !language || !filename) {
            return NextResponse.json(
                { error: 'Missing required fields: code, language, filename' },
                { status: 400 }
            );
        }

        // Run static analysis
        const staticIssues = await analyzeCode(code, language, filename);

        // Run AI analysis if enabled and API key is available
        let aiIssues: Issue[] = [];
        if (useAI) {
            const apiKey = process.env.OPENAI_API_KEY;
            if (apiKey) {
                aiIssues = await analyzeWithAI(code, language, filename, apiKey);
            }
        }

        // Combine and deduplicate issues
        const allIssues = [...staticIssues, ...aiIssues];
        const uniqueIssues = deduplicateIssues(allIssues);

        // Calculate metrics
        const metrics = {
            totalIssues: uniqueIssues.length,
            criticalCount: uniqueIssues.filter(i => i.severity === 'critical').length,
            warningCount: uniqueIssues.filter(i => i.severity === 'warning').length,
            suggestionCount: uniqueIssues.filter(i => i.severity === 'suggestion').length,
            qualityScore: calculateQualityScore(uniqueIssues),
        };

        const result: AnalysisResult = {
            fileId: generateFileId(filename),
            fileName: filename,
            issues: uniqueIssues,
            metrics,
            analyzedAt: new Date(),
        };

        return NextResponse.json(result);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json(
            { error: 'Failed to analyze code' },
            { status: 500 }
        );
    }
}

function deduplicateIssues(issues: Issue[]): Issue[] {
    const seen = new Set<string>();
    return issues.filter(issue => {
        const key = `${issue.title}-${issue.line}-${issue.category}`;
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

function generateFileId(filename: string): string {
    return `${filename}-${Date.now()}`;
}
