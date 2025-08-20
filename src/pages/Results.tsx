import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Download,
  Star,
  Award,
  BookOpen,
  Briefcase
} from "lucide-react";

interface ResultsState {
  answers: Record<string, string>;
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers } = (location.state as ResultsState) || { answers: {} };

  // Calculate scores based on answers
  const calculateScores = () => {
    const sections = {
      psychometric: { score: 0, count: 0 },
      technical: { score: 0, count: 0 },
      wiscar: {
        will: { score: 0, count: 0 },
        interest: { score: 0, count: 0 },
        skill: { score: 0, count: 0 },
        cognitive: { score: 0, count: 0 },
        learning: { score: 0, count: 0 },
        realWorld: { score: 85, count: 1 } // Simulated
      }
    };

    // Process answers and calculate scores
    Object.entries(answers).forEach(([questionId, answer]) => {
      const numericValue = parseInt(answer) || 3;
      const normalizedScore = (numericValue / 5) * 100;

      if (questionId.includes('interest') || questionId.includes('personality') || questionId.includes('cognitive_1')) {
        sections.psychometric.score += normalizedScore;
        sections.psychometric.count++;
      } else if (questionId.includes('aptitude') || questionId.includes('knowledge')) {
        sections.technical.score += normalizedScore;
        sections.technical.count++;
      } else if (questionId.includes('will')) {
        sections.wiscar.will.score += normalizedScore;
        sections.wiscar.will.count++;
      } else if (questionId.includes('interest_2')) {
        sections.wiscar.interest.score += normalizedScore;
        sections.wiscar.interest.count++;
      } else if (questionId.includes('skill')) {
        sections.wiscar.skill.score += normalizedScore;
        sections.wiscar.skill.count++;
      } else if (questionId.includes('cognitive_2')) {
        sections.wiscar.cognitive.score += normalizedScore;
        sections.wiscar.cognitive.count++;
      } else if (questionId.includes('learning')) {
        sections.wiscar.learning.score += normalizedScore;
        sections.wiscar.learning.count++;
      }
    });

    // Calculate averages
    const psychometricScore = sections.psychometric.count > 0 
      ? sections.psychometric.score / sections.psychometric.count 
      : 75;
    
    const technicalScore = sections.technical.count > 0 
      ? sections.technical.score / sections.technical.count 
      : 70;

    const wiscarScores = {
      will: sections.wiscar.will.count > 0 ? sections.wiscar.will.score / sections.wiscar.will.count : 80,
      interest: sections.wiscar.interest.count > 0 ? sections.wiscar.interest.score / sections.wiscar.interest.count : 85,
      skill: sections.wiscar.skill.count > 0 ? sections.wiscar.skill.score / sections.wiscar.skill.count : 65,
      cognitive: sections.wiscar.cognitive.count > 0 ? sections.wiscar.cognitive.score / sections.wiscar.cognitive.count : 78,
      learning: sections.wiscar.learning.count > 0 ? sections.wiscar.learning.score / sections.wiscar.learning.count : 82,
      realWorld: 85
    };

    const overallScore = (psychometricScore + technicalScore + Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) / 3;

    return {
      overall: Math.round(overallScore),
      psychometric: Math.round(psychometricScore),
      technical: Math.round(technicalScore),
      wiscar: Object.entries(wiscarScores).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: Math.round(value)
      }), {} as Record<string, number>)
    };
  };

  const scores = calculateScores();

  const getRecommendation = () => {
    if (scores.overall >= 80) return "yes";
    if (scores.overall >= 60) return "maybe";
    return "no";
  };

  const recommendation = getRecommendation();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Development";
  };

  const careerPaths = [
    {
      title: "Business Analyst",
      description: "Analyze data to inform strategic decisions",
      match: "92%",
      icon: Target
    },
    {
      title: "Risk Manager",
      description: "Use simulations to predict and mitigate risks",
      match: "88%",
      icon: CheckCircle
    },
    {
      title: "Strategic Planner",
      description: "Develop actionable strategies using simulation insights",
      match: "85%",
      icon: TrendingUp
    },
    {
      title: "Data Scientist",
      description: "Build and interpret decision models",
      match: "78%",
      icon: Brain
    }
  ];

  if (!answers || Object.keys(answers).length === 0) {
    return (
      <div className="min-h-screen bg-assessment-bg flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold mb-4">No Assessment Data Found</h2>
            <p className="text-muted-foreground mb-6">
              Please complete the assessment first to view your results.
            </p>
            <Button onClick={() => navigate("/")} className="bg-gradient-primary">
              Take Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4">
            <Award className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">
            Assessment Complete!
          </h1>
          <p className="text-xl text-muted-foreground">
            Your Decision-Making Simulator Readiness Report
          </p>
        </div>

        {/* Overall Score */}
        <Card className="max-w-4xl mx-auto mb-8 shadow-lg">
          <CardHeader className="bg-gradient-primary text-primary-foreground text-center">
            <CardTitle className="text-3xl">Overall Readiness Score</CardTitle>
            <div className="text-6xl font-bold mt-4">{scores.overall}%</div>
            <CardDescription className="text-primary-foreground/80 text-lg">
              {recommendation === "yes" && "Excellent! You're well-suited for decision-making simulators"}
              {recommendation === "maybe" && "Good potential with some development areas"}
              {recommendation === "no" && "Consider foundational skill building first"}
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Detailed Scores */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Psychometric Fit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span>Personality & Interest Alignment</span>
                  <Badge variant={scores.psychometric >= 80 ? "default" : scores.psychometric >= 60 ? "secondary" : "destructive"}>
                    {getScoreBadge(scores.psychometric)}
                  </Badge>
                </div>
                <Progress value={scores.psychometric} className="mb-2" />
                <div className={`text-2xl font-bold ${getScoreColor(scores.psychometric)}`}>
                  {scores.psychometric}%
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Technical Readiness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span>Aptitude & Knowledge Base</span>
                  <Badge variant={scores.technical >= 80 ? "default" : scores.technical >= 60 ? "secondary" : "destructive"}>
                    {getScoreBadge(scores.technical)}
                  </Badge>
                </div>
                <Progress value={scores.technical} className="mb-2" />
                <div className={`text-2xl font-bold ${getScoreColor(scores.technical)}`}>
                  {scores.technical}%
                </div>
              </CardContent>
            </Card>

            {/* WISCAR Framework */}
            <Card>
              <CardHeader>
                <CardTitle>WISCAR Framework Analysis</CardTitle>
                <CardDescription>
                  Comprehensive readiness across six key dimensions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(scores.wiscar).map(([key, score]) => (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="capitalize font-medium">
                        {key === 'realWorld' ? 'Real-World Alignment' : key}
                      </span>
                      <span className={`font-semibold ${getScoreColor(score)}`}>
                        {score}%
                      </span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Career Paths & Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Top Career Matches
                </CardTitle>
                <CardDescription>
                  Roles unlocked by your assessment results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {careerPaths.map((career, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <career.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{career.title}</h4>
                        <Badge variant="outline">{career.match} match</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{career.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recommendation === "yes" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Star className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-success">Ready to Start!</h4>
                        <p className="text-sm text-muted-foreground">
                          Begin with advanced simulation software and real-world projects.
                        </p>
                      </div>
                    </div>
                    <div className="bg-success/10 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Immediate Actions:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Enroll in advanced decision modeling courses</li>
                        <li>• Practice with professional simulation tools</li>
                        <li>• Join decision science communities</li>
                        <li>• Seek mentorship opportunities</li>
                      </ul>
                    </div>
                  </div>
                )}

                {recommendation === "maybe" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-warning mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-warning">Development Path</h4>
                        <p className="text-sm text-muted-foreground">
                          Strong potential with focused improvement in key areas.
                        </p>
                      </div>
                    </div>
                    <div className="bg-warning/10 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Focus Areas:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Strengthen statistical and probability concepts</li>
                        <li>• Practice analytical thinking exercises</li>
                        <li>• Complete foundational courses first</li>
                        <li>• Build confidence through mini-projects</li>
                      </ul>
                    </div>
                  </div>
                )}

                {recommendation === "no" && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Users className="h-5 w-5 text-info mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-info">Alternative Pathways</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider related fields that align better with your strengths.
                        </p>
                      </div>
                    </div>
                    <div className="bg-info/10 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Suggested Alternatives:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Project Management</li>
                        <li>• Business Process Analysis</li>
                        <li>• Data Visualization</li>
                        <li>• Operations Coordination</li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button size="lg" className="bg-gradient-primary hover:shadow-primary">
            <Download className="h-4 w-4 mr-2" />
            Download Full Report
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>
            Take Assessment Again
          </Button>
          <Button variant="secondary" size="lg">
            Explore Learning Paths
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;