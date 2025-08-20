import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, Brain, Target, Zap, Users, TrendingUp, CheckCircle } from "lucide-react";

interface Question {
  id: string;
  section: string;
  question: string;
  type: "likert" | "multiple-choice" | "scenario";
  options: { value: string; label: string }[];
}

const questions: Question[] = [
  // Psychometric Evaluation
  {
    id: "interest_1",
    section: "Interest Scale",
    question: "I find analyzing complex data patterns fascinating and energizing.",
    type: "likert",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" }
    ]
  },
  {
    id: "personality_1",
    section: "Personality Compatibility",
    question: "When facing uncertainty, I prefer to gather as much information as possible before making decisions.",
    type: "likert",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" }
    ]
  },
  {
    id: "cognitive_1",
    section: "Cognitive Style",
    question: "Which approach better describes your problem-solving style?",
    type: "multiple-choice",
    options: [
      { value: "analytical", label: "Break down complex problems into smaller, manageable parts" },
      { value: "intuitive", label: "Rely on gut instinct and overall patterns" },
      { value: "mixed", label: "Combine both analytical and intuitive approaches" }
    ]
  },
  // Technical & Aptitude
  {
    id: "aptitude_1",
    section: "General Aptitude",
    question: "If 30% of decisions in a simulation result in positive outcomes, and you run 200 simulations, approximately how many positive outcomes would you expect?",
    type: "multiple-choice",
    options: [
      { value: "40", label: "40" },
      { value: "60", label: "60" },
      { value: "80", label: "80" },
      { value: "100", label: "100" }
    ]
  },
  {
    id: "knowledge_1",
    section: "Prerequisite Knowledge",
    question: "What is the primary purpose of a decision tree in simulation modeling?",
    type: "multiple-choice",
    options: [
      { value: "visualization", label: "To visualize all possible decision outcomes" },
      { value: "optimization", label: "To optimize processing speed" },
      { value: "storage", label: "To store historical data" },
      { value: "networking", label: "To connect multiple simulations" }
    ]
  },
  // WISCAR Framework
  {
    id: "will_1",
    section: "Will",
    question: "I consistently follow through on learning goals, even when initial enthusiasm fades.",
    type: "likert",
    options: [
      { value: "1", label: "Strongly Disagree" },
      { value: "2", label: "Disagree" },
      { value: "3", label: "Neutral" },
      { value: "4", label: "Agree" },
      { value: "5", label: "Strongly Agree" }
    ]
  },
  {
    id: "interest_2",
    section: "Interest",
    question: "How interested are you in using technology to predict and influence business outcomes?",
    type: "likert",
    options: [
      { value: "1", label: "Not at all interested" },
      { value: "2", label: "Slightly interested" },
      { value: "3", label: "Moderately interested" },
      { value: "4", label: "Very interested" },
      { value: "5", label: "Extremely interested" }
    ]
  },
  {
    id: "skill_1",
    section: "Skill",
    question: "Rate your current ability to interpret statistical data and probability.",
    type: "likert",
    options: [
      { value: "1", label: "Beginner" },
      { value: "2", label: "Basic" },
      { value: "3", label: "Intermediate" },
      { value: "4", label: "Advanced" },
      { value: "5", label: "Expert" }
    ]
  },
  {
    id: "cognitive_2",
    section: "Cognitive Readiness",
    question: "You're presented with a scenario where multiple variables affect an outcome. What's your first instinct?",
    type: "scenario",
    options: [
      { value: "isolate", label: "Isolate and test each variable individually" },
      { value: "model", label: "Create a comprehensive model including all variables" },
      { value: "prioritize", label: "Prioritize the most impactful variables first" },
      { value: "collaborate", label: "Collaborate with others to understand different perspectives" }
    ]
  },
  {
    id: "learning_1",
    section: "Ability to Learn",
    question: "When receiving feedback that challenges your assumptions, I typically:",
    type: "multiple-choice",
    options: [
      { value: "defensive", label: "Initially feel defensive but then consider the feedback" },
      { value: "curious", label: "Feel curious and eager to understand the different perspective" },
      { value: "analytical", label: "Analyze the feedback systematically before responding" },
      { value: "collaborative", label: "Seek dialogue to better understand the feedback" }
    ]
  }
];

const sectionIcons = {
  "Interest Scale": Brain,
  "Personality Compatibility": Users,
  "Cognitive Style": Zap,
  "General Aptitude": Target,
  "Prerequisite Knowledge": CheckCircle,
  "Will": TrendingUp,
  "Interest": Brain,
  "Skill": Target,
  "Cognitive Readiness": Zap,
  "Ability to Learn": Users
};

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const SectionIcon = sectionIcons[question.section as keyof typeof sectionIcons] || Brain;

  const handleAnswerChange = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers(prev => ({ ...prev, [question.id]: selectedAnswer }));
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer("");
      } else {
        // Assessment complete, navigate to results
        navigate("/results", { state: { answers } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Decision-Making Simulator Assessment
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>Progress</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader className="bg-gradient-primary text-primary-foreground">
            <div className="flex items-center gap-3">
              <SectionIcon className="h-6 w-6" />
              <div>
                <CardTitle className="text-xl">{question.section}</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {question.section === "Interest Scale" && "Evaluating your interest in decision sciences"}
                  {question.section === "Personality Compatibility" && "Assessing personality traits for decision-making"}
                  {question.section === "Cognitive Style" && "Understanding your problem-solving approach"}
                  {question.section === "General Aptitude" && "Testing logical reasoning and analysis"}
                  {question.section === "Prerequisite Knowledge" && "Checking foundational knowledge"}
                  {question.section === "Will" && "Measuring persistence and commitment"}
                  {question.section === "Interest" && "Gauging genuine interest in the field"}
                  {question.section === "Skill" && "Assessing current technical abilities"}
                  {question.section === "Cognitive Readiness" && "Testing analytical thinking capacity"}
                  {question.section === "Ability to Learn" && "Evaluating learning adaptability"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                {question.question}
              </h3>

              <RadioGroup
                value={selectedAnswer}
                onValueChange={handleAnswerChange}
                className="space-y-4"
              >
                {question.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label
                      htmlFor={option.value}
                      className="flex-1 text-base cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="bg-gradient-primary hover:shadow-primary"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;