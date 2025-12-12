import Link from 'next/link';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
    showBackButton?: boolean;
    subtitle?: string;
    showActionButtons?: boolean;
}

export function Header({ showBackButton = false, subtitle, showActionButtons = false }: HeaderProps) {
    return (
        <header className="relative border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                            <div className="relative bg-slate-900 p-2 rounded-lg">
                                <Code className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                CodeGuardian AI
                            </h1>
                            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        <a href="/#features" className="text-sm text-slate-400 hover:text-white transition-colors">Features</a>
                        <a href="/#pricing" className="text-sm text-slate-400 hover:text-white transition-colors">Pricing</a>
                        <Link href="/docs" className="text-sm text-slate-400 hover:text-white transition-colors">Docs</Link>
                    </nav>

                    {showActionButtons && (
                        <div className="flex items-center gap-3">
                            <Link href="/review">
                                <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/review">
                                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
