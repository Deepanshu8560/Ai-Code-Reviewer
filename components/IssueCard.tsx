'use client';

import { AlertCircle, AlertTriangle, Info, ExternalLink, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { CodeEditor } from './CodeEditor';
import type { Issue } from '@/types';
import { getSeverityColor, getSeverityIconColor } from '@/lib/utils';

interface IssueCardProps {
    issue: Issue;
    onApplyFix?: (issueId: string, suggestion: string) => void;
}

export function IssueCard({ issue, onApplyFix }: IssueCardProps) {
    const SeverityIcon = {
        critical: AlertCircle,
        warning: AlertTriangle,
        suggestion: Info,
    }[issue.severity];

    const badgeVariant = {
        critical: 'critical' as const,
        warning: 'warning' as const,
        suggestion: 'suggestion' as const,
    }[issue.severity];

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                        <SeverityIcon className={`w-5 h-5 mt-0.5 ${getSeverityIconColor(issue.severity)}`} />
                        <div className="flex-1">
                            <CardTitle className="text-base">{issue.title}</CardTitle>
                            <CardDescription className="mt-1">{issue.description}</CardDescription>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant={badgeVariant}>{issue.severity}</Badge>
                        <Badge variant="outline">{issue.category}</Badge>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Line number */}
                <div className="text-sm text-gray-600">
                    Line {issue.line}
                </div>

                {/* Code snippet */}
                {issue.code && (
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Current Code:</p>
                        <CodeEditor
                            code={issue.code}
                            language={issue.language}
                            height="120px"
                            highlightLines={[1]}
                        />
                    </div>
                )}

                {/* Explanation */}
                {issue.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Why this matters
                        </p>
                        <p className="text-sm text-blue-800">{issue.explanation}</p>
                    </div>
                )}

                {/* Suggested fix */}
                {issue.suggestion && (
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                Suggested Fix:
                            </p>
                            {onApplyFix && (
                                <Button
                                    size="sm"
                                    onClick={() => onApplyFix(issue.id, issue.suggestion!)}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Apply Fix
                                </Button>
                            )}
                        </div>
                        <CodeEditor
                            code={issue.suggestion}
                            language={issue.language}
                            height="120px"
                        />
                    </div>
                )}

                {/* Documentation links */}
                {issue.documentationLinks && issue.documentationLinks.length > 0 && (
                    <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Learn More:</p>
                        <div className="flex flex-wrap gap-2">
                            {issue.documentationLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                >
                                    Documentation
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
