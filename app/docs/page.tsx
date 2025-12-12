import Link from 'next/link';
import { Code, Zap, Shield, Eye, CheckCircle, Sparkles, Package, Cpu, Database, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-slate-950">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Header */}
            <Header subtitle="Documentation" />

            {/* Main Content */}
            <div className="relative container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-4xl font-bold text-white mb-4">Documentation</h2>
                        <p className="text-xl text-slate-400">
                            CodeGuardian AI is an intelligent code review platform that combines static analysis with AI-powered insights to help you ship better code faster.
                        </p>
                    </section>

                    {/* Features */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-6">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Feature 1 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 flex items-center justify-center mb-4">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Performance Analysis</h4>
                                <p className="text-slate-400 text-sm">
                                    Automatically detect bundle bloat, expensive re-renders, and optimization opportunities in your React applications.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center mb-4">
                                    <Eye className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Accessibility Checks</h4>
                                <p className="text-slate-400 text-sm">
                                    Ensure WCAG compliance with automated checks for alt text, color contrast, ARIA attributes, and semantic HTML.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center mb-4">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Security Scanning</h4>
                                <p className="text-slate-400 text-sm">
                                    Identify XSS vulnerabilities, exposed API keys, and dangerous patterns before they reach production.
                                </p>
                            </div>

                            {/* Feature 4 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 flex items-center justify-center mb-4">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">AI-Powered Insights</h4>
                                <p className="text-slate-400 text-sm">
                                    Get intelligent, context-aware suggestions powered by GPT-4 with detailed explanations and fix recommendations.
                                </p>
                            </div>

                            {/* Feature 5 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-green-500 flex items-center justify-center mb-4">
                                    <Code className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Multi-Language Support</h4>
                                <p className="text-slate-400 text-sm">
                                    Analyze JavaScript, TypeScript, React (JSX/TSX), CSS, and HTML files with specialized rules for each.
                                </p>
                            </div>

                            {/* Feature 6 */}
                            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 flex items-center justify-center mb-4">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold text-white mb-2">Export & Share</h4>
                                <p className="text-slate-400 text-sm">
                                    Export analysis results to JSON or Markdown format for documentation and team collaboration.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Tech Stack */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-6">Tech Stack</h3>
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                            <div className="space-y-8">
                                {/* Frontend */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center">
                                            <Package className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">Frontend</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-13">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Next.js 16</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">React 19</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">TypeScript</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Tailwind CSS</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Monaco Editor</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Lucide Icons</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Backend & AI */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                                            <Cpu className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">Backend & AI</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-13">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Next.js API Routes</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">OpenAI GPT-4</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Vercel AI SDK</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">ESLint</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Axe-core</span>
                                        </div>
                                    </div>
                                </div>

                                {/* State & Data */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                                            <Database className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">State Management</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-13">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Zustand</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Local Storage</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Deployment */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
                                            <Cloud className="w-5 h-5 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white">Deployment</h4>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 ml-13">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">Vercel</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">GitHub</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Getting Started */}
                    <section>
                        <h3 className="text-3xl font-bold text-white mb-6">Getting Started</h3>
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">1. Upload Your Code</h4>
                                    <p className="text-slate-400">
                                        Drag and drop or select JavaScript, TypeScript, React, CSS, or HTML files to analyze.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">2. Configure Analysis</h4>
                                    <p className="text-slate-400">
                                        Choose whether to enable AI-powered analysis for deeper insights (requires OpenAI API key).
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">3. Review Results</h4>
                                    <p className="text-slate-400">
                                        Get instant feedback on performance, accessibility, security, and code quality issues with actionable suggestions.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">4. Export & Share</h4>
                                    <p className="text-slate-400">
                                        Export your analysis results to JSON or Markdown for documentation and team collaboration.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center">
                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-12">
                            <h3 className="text-3xl font-bold text-white mb-4">
                                Ready to Improve Your Code?
                            </h3>
                            <p className="text-xl text-slate-400 mb-8">
                                Start analyzing your code in seconds. No signup required.
                            </p>
                            <Link href="/review">
                                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/50">
                                    Try It Now
                                </Button>
                            </Link>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
