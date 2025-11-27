import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Code, Shield, CheckCircle, AlertTriangle, TrendingUp, FileCode, GitPullRequest, Sparkles, Eye, Activity } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentReviews, setRecentReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, reviewsRes] = await Promise.all([
        axios.get(`${API}/dashboard/stats`),
        axios.get(`${API}/recent-reviews`)
      ]);
      setStats(statsRes.data);
      setRecentReviews(reviewsRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stat-card border border-blue-500/20" data-testid="stat-total-prs">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Pull Requests</p>
                <p className="text-3xl font-bold text-white">{stats?.total_prs || 0}</p>
              </div>
              <div className="stat-icon bg-blue-500/10">
                <GitPullRequest className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border border-purple-500/20" data-testid="stat-completed-reviews">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Completed Reviews</p>
                <p className="text-3xl font-bold text-white">{stats?.completed_reviews || 0}</p>
              </div>
              <div className="stat-icon bg-purple-500/10">
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border border-emerald-500/20" data-testid="stat-avg-quality">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Avg Code Quality</p>
                <p className={`text-3xl font-bold ${getScoreColor(stats?.avg_code_quality || 0)}`}>
                  {stats?.avg_code_quality || 0}%
                </p>
              </div>
              <div className="stat-icon bg-emerald-500/10">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border border-red-500/20" data-testid="stat-vulnerabilities">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Vulnerabilities Found</p>
                <p className="text-3xl font-bold text-red-400">{stats?.vulnerabilities_found || 0}</p>
              </div>
              <div className="stat-icon bg-red-500/10">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reviews */}
      <Card className="glass-card" data-testid="recent-reviews-section">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Recent Reviews
          </CardTitle>
          <CardDescription>Latest code analysis results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReviews.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No reviews yet. Submit your first PR for analysis!</p>
            ) : (
              recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="review-item p-4 rounded-lg border border-slate-700/50 hover:border-blue-500/50 cursor-pointer"
                  onClick={() => navigate(`/review/${review.id}`)}
                  data-testid={`review-item-${review.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">{review.pr_title}</h4>
                      <div className="flex items-center gap-3 text-sm text-slate-400">
                        <span>{review.pr_author}</span>
                        <span>•</span>
                        <span>{review.pr_repository}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`score-badge ${getScoreBg(review.overall_score)}`}>
                        <span className={`text-lg font-bold ${getScoreColor(review.overall_score)}`}>
                          {review.overall_score}
                        </span>
                      </div>
                      {review.vulnerabilities_count > 0 && (
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                          {review.vulnerabilities_count} vulnerabilities
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SubmitPR = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    code: "",
    language: "javascript",
    author: "",
    repository: "",
    branch: ""
  });
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [prId, setPrId] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create PR
      const prRes = await axios.post(`${API}/pull-requests`, formData);
      const createdPrId = prRes.data.id;
      setPrId(createdPrId);
      
      toast.success("Pull request submitted successfully!");
      
      // Start analysis
      setAnalyzing(true);
      await axios.post(`${API}/analyze/${createdPrId}`);
      
      toast.success("Analysis complete! Redirecting...");
      setTimeout(() => {
        navigate(`/reviews`);
      }, 1500);
    } catch (error) {
      console.error("Error submitting PR:", error);
      toast.error("Failed to submit pull request");
    } finally {
      setLoading(false);
      setAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="glass-card" data-testid="submit-pr-form">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-blue-400" />
            Submit Pull Request for Review
          </CardTitle>
          <CardDescription>Upload your code for AI-powered analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">PR Title</Label>
                <Input
                  id="title"
                  data-testid="input-pr-title"
                  placeholder="Fix authentication bug"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input
                  id="author"
                  data-testid="input-author"
                  placeholder="Your name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repository">Repository</Label>
                <Input
                  id="repository"
                  data-testid="input-repository"
                  placeholder="owner/repo-name"
                  value={formData.repository}
                  onChange={(e) => setFormData({ ...formData, repository: e.target.value })}
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch</Label>
                <Input
                  id="branch"
                  data-testid="input-branch"
                  placeholder="feature/new-feature"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Programming Language</Label>
              <Select
                value={formData.language}
                onValueChange={(value) => setFormData({ ...formData, language: value })}
              >
                <SelectTrigger data-testid="select-language" className="input-field">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="csharp">C#</SelectItem>
                  <SelectItem value="go">Go</SelectItem>
                  <SelectItem value="rust">Rust</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                data-testid="input-description"
                placeholder="Describe the changes in this PR..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="input-field"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                data-testid="input-code"
                placeholder="Paste your code here..."
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                rows={15}
                className="input-field font-mono text-sm"
              />
            </div>

            <Button
              type="submit"
              data-testid="submit-pr-button"
              disabled={loading || analyzing}
              className="w-full btn-primary"
              size="lg"
            >
              {analyzing ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing with AI...
                </>
              ) : loading ? (
                "Submitting..."
              ) : (
                <>
                  <FileCode className="w-5 h-5 mr-2" />
                  Submit for Review
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/recent-reviews`);
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-emerald-500/10 border-emerald-500/20";
    if (score >= 60) return "bg-yellow-500/10 border-yellow-500/20";
    return "bg-red-500/10 border-red-500/20";
  };

  return (
    <div className="space-y-6">
      <Card className="glass-card" data-testid="reviews-list">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            All Reviews
          </CardTitle>
          <CardDescription>Browse all completed code reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12">
                <FileCode className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                <p className="text-slate-400">No reviews available yet.</p>
                <Button
                  onClick={() => navigate("/submit")}
                  className="mt-4 btn-primary"
                  data-testid="no-reviews-submit-button"
                >
                  Submit Your First PR
                </Button>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="review-item p-5 rounded-lg border border-slate-700/50 hover:border-blue-500/50 cursor-pointer"
                  onClick={() => navigate(`/review/${review.id}`)}
                  data-testid={`review-card-${review.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{review.pr_title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <Code className="w-4 h-4" />
                          {review.pr_author}
                        </span>
                        <span>•</span>
                        <span>{review.pr_repository}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className={`score-badge ${getScoreBg(review.overall_score)}`}>
                        <div className="text-center">
                          <p className="text-xs text-slate-400 mb-1">Score</p>
                          <p className={`text-2xl font-bold ${getScoreColor(review.overall_score)}`}>
                            {review.overall_score}
                          </p>
                        </div>
                      </div>
                      {review.vulnerabilities_count > 0 && (
                        <Badge variant="destructive" className="bg-red-500/20 text-red-400 border-red-500/30">
                          <Shield className="w-3 h-3 mr-1" />
                          {review.vulnerabilities_count} issues
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MainLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950" data-testid="main-layout">
      {/* Header */}
      <header className="glass-header sticky top-0 z-50 border-b border-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")} data-testid="header-logo">
              <div className="logo-icon">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white logo-text">CodeGuardian</h1>
                <p className="text-xs text-slate-400">AI-Powered Code Review</p>
              </div>
            </div>
            <nav className="flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                data-testid="nav-dashboard"
                className="nav-button"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/submit")}
                data-testid="nav-submit"
                className="nav-button"
              >
                Submit PR
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/reviews")}
                data-testid="nav-reviews"
                className="nav-button"
              >
                Reviews
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/submit" element={<SubmitPR />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;