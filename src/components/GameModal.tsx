import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { shuffle } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
  courseName: string;
}

export const GameModal = ({ isOpen, onClose, courseId, courseName }: GameModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // In a real app, these would come from an API based on the courseId
    const sampleQuestions: Question[] = [
      {
        id: 1,
        question: "What's the first step in creating a monthly budget?",
        options: [
          "Start spending less",
          "Calculate total income",
          "List all expenses",
          "Set financial goals"
        ],
        correctAnswer: "Calculate total income",
        explanation: "Understanding your total income is crucial as it forms the foundation of your budget planning."
      },
      {
        id: 2,
        question: "Which of these is a good emergency fund target?",
        options: [
          "1 month of expenses",
          "3-6 months of expenses",
          "1 week of expenses",
          "1 year of expenses"
        ],
        correctAnswer: "3-6 months of expenses",
        explanation: "3-6 months of expenses provides adequate protection against most financial emergencies while being realistic to achieve."
      },
      {
        id: 3,
        question: "What's the 50/30/20 budgeting rule?",
        options: [
          "50% savings, 30% needs, 20% wants",
          "50% needs, 30% wants, 20% savings",
          "50% wants, 30% savings, 20% needs",
          "50% needs, 30% savings, 20% wants"
        ],
        correctAnswer: "50% needs, 30% wants, 20% savings",
        explanation: "The 50/30/20 rule suggests allocating 50% of income to needs, 30% to wants, and 20% to savings and debt repayment."
      }
    ];

    setQuestions(shuffle(sampleQuestions));
  }, [courseId]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{courseName} Quiz</span>
            <Badge variant="secondary">
              Question {currentQuestion + 1}/{questions.length}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <Progress value={progress} className="mb-6" />

          {questions.length > 0 && (
            <div className="space-y-6">
              <div className="text-lg font-medium">
                {questions[currentQuestion].question}
              </div>

              <div className="grid gap-3">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option}
                    variant={
                      selectedAnswer
                        ? option === questions[currentQuestion].correctAnswer
                          ? "default"
                          : option === selectedAnswer
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    className="w-full justify-start text-left"
                    onClick={() => !selectedAnswer && handleAnswer(option)}
                    disabled={!!selectedAnswer}
                  >
                    {option}
                  </Button>
                ))}
              </div>

              {showExplanation && (
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === questions[currentQuestion].correctAnswer
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}>
                  <p className="font-medium mb-2">
                    {selectedAnswer === questions[currentQuestion].correctAnswer
                      ? "Correct! 🎉"
                      : "Not quite right 🤔"}
                  </p>
                  <p>{questions[currentQuestion].explanation}</p>
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  Score: {score}/{questions.length}
                </div>
                {showExplanation && currentQuestion < questions.length - 1 && (
                  <Button onClick={handleNext}>Next Question</Button>
                )}
                {showExplanation && currentQuestion === questions.length - 1 && (
                  <Button onClick={onClose}>Finish Quiz</Button>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};