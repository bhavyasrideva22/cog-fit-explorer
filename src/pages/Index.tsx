import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Target, 
  Zap, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  Award,
  BarChart3,
  Lightbulb,
  Briefcase
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Psychometric Evaluation",
      description: "Assess personality compatibility and cognitive style for decision-making roles"
    },
    {
      icon: Target,
      title: "Technical Assessment",
      description: "Evaluate analytical skills, reasoning ability, and prerequisite knowledge"
    },
    {
      icon: BarChart3,
      title: "WISCAR Framework",
      description: "Comprehensive analysis across Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment"
    },
    {
      icon: Award,
      title: "Career Guidance",
      description: "Personalized career recommendations and learning pathway suggestions"
    }
  ];

  const careerPaths = [
    "Business Analyst",
    "Operations Manager", 
    "Strategic Planner",
    "Risk Analyst",
    "Management Consultant",
    "Data Scientist"
  ];

  const successTraits = [
    "Analytical Thinking",
    "Risk Assessment", 
    "Problem Solving",
    "Cognitive Flexibility",
    "Stress Tolerance"
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-6 shadow-primary">
            <Brain className="h-10 w-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-6 leading-tight">
            Comprehensive Readiness & Fit Assessment
          </h1>
          <h2 className="text-3xl font-semibold text-accent mb-4">
            Decision-Making Simulator
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Evaluate your aptitude, motivation, and readiness to learn and effectively use 
            Decision-Making Simulators in professional environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-primary text-lg px-8 py-3"
              onClick={() => navigate("/assessment")}
            >
              Start Assessment
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
              <Clock className="h-5 w-5 mr-2" />
              20-30 minutes
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="text-sm">AI-Powered Analysis</Badge>
            <Badge variant="secondary" className="text-sm">Scientifically Validated</Badge>
            <Badge variant="secondary" className="text-sm">Personalized Results</Badge>
            <Badge variant="secondary" className="text-sm">Career Guidance</Badge>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-card py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-primary">About Decision-Making Simulators</CardTitle>
              <CardDescription className="text-lg">
                Advanced tools designed to replicate real-world decision environments
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Decision-Making Simulators are sophisticated software tools that mimic real-world decision 
                environments, helping users practice and improve their decision-making skills under uncertainty. 
                These tools are essential for professionals who need to make complex strategic decisions with 
                incomplete information.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Typical Careers
                  </h4>
                  <div className="space-y-2">
                    {careerPaths.map((career, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        <span>{career}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Success Traits
                  </h4>
                  <div className="space-y-2">
                    {successTraits.map((trait, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span>{trait}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Assessment Features */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-primary mb-4">
              What This Assessment Evaluates
            </h3>
            <p className="text-xl text-muted-foreground">
              A comprehensive analysis across multiple dimensions of readiness
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h4 className="text-lg font-semibold text-primary mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Discover Your Potential?
          </h3>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Take the comprehensive assessment and receive personalized insights about your 
            readiness for decision-making simulator tools and related career paths.
          </p>
          
          <Button 
            size="lg" 
            variant="secondary"
            className="text-lg px-8 py-3"
            onClick={() => navigate("/assessment")}
          >
            Begin Your Assessment
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
