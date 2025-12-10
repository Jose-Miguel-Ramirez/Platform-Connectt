import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { QuizQuestion } from "@/lib/mock-data-extended";
import { Trophy, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  courseTitle: string;
}

export function QuizModal({ isOpen, onClose, questions, courseTitle }: QuizModalProps) {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIdx];

  const handleSelect = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: parseInt(val) }));
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Calculate Score
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correctOption) correctCount++;
      });
      setScore(correctCount);
      setIsSubmitted(true);
    }
  };

  const reset = () => {
    setIsSubmitted(false);
    setCurrentQuestionIdx(0);
    setAnswers({});
    setScore(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && reset()}>
      <DialogContent className="sm:max-w-[500px]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle>Evaluación: {courseTitle}</DialogTitle>
              <DialogDescription>
                Pregunta {currentQuestionIdx + 1} de {questions.length}
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <h3 className="font-medium text-lg mb-4">{currentQuestion.question}</h3>
              <RadioGroup value={answers[currentQuestion.id]?.toString()} onValueChange={handleSelect}>
                {currentQuestion.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50 cursor-pointer">
                    <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                    <Label htmlFor={`opt-${idx}`} className="cursor-pointer flex-1">{opt}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={reset}>Cancelar</Button>
              <Button onClick={handleNext} disabled={answers[currentQuestion.id] === undefined}>
                {currentQuestionIdx === questions.length - 1 ? "Finalizar" : "Siguiente"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="text-center py-8 animate-in zoom-in-95">
            <div className="flex justify-center mb-4">
              {score === questions.length ? (
                <div className="bg-yellow-100 p-4 rounded-full">
                  <Trophy className="h-12 w-12 text-yellow-600" />
                </div>
              ) : (
                <div className="bg-muted p-4 rounded-full">
                  <AlertCircle className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold font-serif mb-2">
              {score === questions.length ? "¡Felicidades!" : "Buen intento"}
            </h2>
            <p className="text-muted-foreground mb-6">
              Has respondido correctamente {score} de {questions.length} preguntas.
            </p>
            
            {score === questions.length && (
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg mb-6 text-sm">
                <p className="font-semibold text-primary">¡Certificado Desbloqueado!</p>
                <p className="text-muted-foreground">Se ha enviado una copia a tu perfil.</p>
              </div>
            )}

            <Button onClick={reset} className="w-full">
              {score === questions.length ? "Volver al Dashboard" : "Intentar de nuevo"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
