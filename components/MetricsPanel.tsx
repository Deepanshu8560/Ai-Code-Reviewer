'use client';

import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { AlertCircle, AlertTriangle, Info, TrendingUp } from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface MetricsPanelProps {
    result: AnalysisResult;
}

export function MetricsPanel({ result }: MetricsPanelProps) {
    const { metrics } = result;

    const getScoreGradient = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-500';
        if (score >= 60) return 'from-amber-500 to-orange-500';
        return 'from-red-500 to-rose-500';
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Quality Score */}
            <div className="md:col-span-2 lg:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-4">Quality Score</div>
                <div className="flex items-center justify-center">
                    <div className={`text-5xl font-bold bg-gradient-to-r ${getScoreGradient(metrics.qualityScore)} bg-clip-text text-transparent`}>
                        {metrics.qualityScore}
                    </div>
                </div>
                <div className="mt-2 flex items-center justify-center gap-1 text-sm text-slate-400">
                    <TrendingUp className="w-4 h-4" />
                    <span>out of 100</span>
                </div>
            </div>

            {/* Total Issues */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-sm text-slate-400 mb-4">Total Issues</div>
                <div className="text-3xl font-bold text-white">{metrics.totalIssues}</div>
                <p className="text-xs text-slate-500 mt-1">Found in analysis</p>
            </div>

            {/* Critical */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-sm text-slate-400 flex items-center gap-2 mb-4">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    Critical
                </div>
                <div className="text-3xl font-bold text-red-500">{metrics.criticalCount}</div>
                <Badge variant="critical" className="mt-2">Must fix</Badge>
            </div>

            {/* Warnings */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-sm text-slate-400 flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Warnings
                </div>
                <div className="text-3xl font-bold text-amber-500">{metrics.warningCount}</div>
                <Badge variant="warning" className="mt-2">Should fix</Badge>
            </div>

            {/* Suggestions */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                <div className="text-sm text-slate-400 flex items-center gap-2 mb-4">
                    <Info className="w-4 h-4 text-blue-500" />
                    Suggestions
                </div>
                <div className="text-3xl font-bold text-blue-500">{metrics.suggestionCount}</div>
                <Badge variant="suggestion" className="mt-2">Nice to have</Badge>
            </div>
        </div>
    );
}
