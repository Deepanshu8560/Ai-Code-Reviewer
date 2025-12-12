'use client';

import { useState } from 'react';
import { Download, Loader2, Sparkles, Code } from 'lucide-react';
import { useReviewStore } from '@/store/review-store';
import { CodeUploader } from '@/components/CodeUploader';
import { CodeEditor } from '@/components/CodeEditor';
import { IssueList } from '@/components/IssueList';
import { MetricsPanel } from '@/components/MetricsPanel';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { exportToJSON, exportToMarkdown } from '@/lib/utils';

export default function ReviewPage() {
    const { files, currentFileId, analysisResults, isAnalyzing, setIsAnalyzing, setAnalysisResult } = useReviewStore();
    const [useAI, setUseAI] = useState(false);

    const currentFile = files.find(f => f.id === currentFileId);
    const currentResult = currentFileId ? analysisResults[currentFileId] : null;

    const handleAnalyze = async () => {
        if (!currentFile) return;

        setIsAnalyzing(true);
        try {
            const response = await fetch('/api/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    code: currentFile.content,
                    language: currentFile.language,
                    filename: currentFile.name,
                    useAI,
                }),
            });

            if (!response.ok) {
                throw new Error('Analysis failed');
            }

            const result = await response.json();
            setAnalysisResult(currentFile.id, result);
        } catch (error) {
            console.error('Analysis error:', error);
            alert('Failed to analyze code. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleExportJSON = () => {
        if (!currentResult) return;
        const json = exportToJSON(currentResult);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentFile?.name}-review.json`;
        a.click();
    };

    const handleExportMarkdown = () => {
        if (!currentResult || !currentFile) return;
        const markdown = exportToMarkdown(currentResult.issues, currentFile.name);
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentFile.name}-review.md`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <Header subtitle="Code Review Interface" />

            {/* Main Content - Vertical Split */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
                {/* Top Half - Upload & Code */}
                <div className="h-1/2 border-b border-slate-800/50 overflow-y-auto">
                    <div className="container mx-auto px-4 py-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <h2 className="text-lg font-semibold text-white mb-4">Upload Code</h2>
                                <CodeUploader />
                            </div>

                            {currentFile && (
                                <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                    <h2 className="text-lg font-semibold text-white mb-4">Code Preview</h2>
                                    <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800 mb-4">
                                        <CodeEditor
                                            code={currentFile.content}
                                            language={currentFile.language}
                                            height="250px"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                            <input
                                                type="checkbox"
                                                id="use-ai"
                                                checked={useAI}
                                                onChange={(e) => setUseAI(e.target.checked)}
                                                className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <label htmlFor="use-ai" className="text-sm text-slate-300 flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                                Use AI analysis
                                            </label>
                                        </div>

                                        <Button
                                            onClick={handleAnalyze}
                                            disabled={isAnalyzing}
                                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50"
                                        >
                                            {isAnalyzing ? (
                                                <>
                                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                    Analyzing...
                                                </>
                                            ) : (
                                                'Analyze Code'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Half - Analysis Results */}
                <div className="h-1/2 overflow-y-auto">
                    <div className="container mx-auto px-4 py-6 space-y-6">
                        {!currentResult && !isAnalyzing && (
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                                <Code className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No Analysis Yet
                                </h3>
                                <p className="text-slate-400">
                                    Upload a file and click "Analyze Code" to get started
                                </p>
                            </div>
                        )}

                        {isAnalyzing && (
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center">
                                <Loader2 className="w-16 h-16 mx-auto text-blue-500 mb-4 animate-spin" />
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    Analyzing Your Code...
                                </h3>
                                <p className="text-slate-400">
                                    This may take a few moments
                                </p>
                            </div>
                        )}

                        {currentResult && !isAnalyzing && (
                            <>
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">
                                        Analysis Results
                                    </h2>
                                    <MetricsPanel result={currentResult} />
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-4">
                                        Issues Found
                                    </h3>
                                    {currentResult.issues.length > 0 ? (
                                        <IssueList issues={currentResult.issues} />
                                    ) : (
                                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-12 text-center">
                                            <div className="text-6xl mb-4">🎉</div>
                                            <h3 className="text-xl font-semibold text-white mb-2">
                                                No Issues Found!
                                            </h3>
                                            <p className="text-slate-400">
                                                Your code looks great. Keep up the good work!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
