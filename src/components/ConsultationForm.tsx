import React, { useState } from "react";
import classNames from "classnames";
import "./ConsultationForm.scss";
import medexpress from "../assets/medexpress.png";
import { questions } from "../utils/consultationQuestions.ts";
import ConsultationHistory from "./ConsultationHistory.tsx";

const submitConsultation = (answersHistory: { question: string; answer: boolean }[]) => {
    console.log("Collected Consultation Data:", answersHistory);
};

const ConsultationForm: React.FC = () => {
    const [step, setStep] = useState(0);
    //Assumption being the answers are yes or no questions
    //Could be extended to include differently typed answer
    const [answersHistory, setAnswersHistory] = useState<{ question: string; answer: boolean }[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (answer: boolean) => {
        const updatedHistory = [...answersHistory];
        const existingIndex = updatedHistory.findIndex((entry) => entry.question === questions[step]);

        if (existingIndex !== -1) {
            updatedHistory[existingIndex] = { question: questions[step], answer };
        } else {
            updatedHistory.push({ question: questions[step], answer });
        }

        setAnswersHistory(updatedHistory);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitConsultation(updatedHistory);
            setSubmitted(true);
        }
    };

    const editAnswer = (index: number) => {
        if (!submitted) {
            setStep(index);
        }
    };

    return (
        <div className="consultation-container">
            <header className="header">
                <img src={medexpress} alt="MedExpress Logo" className="logo" />
            </header>

            <main className="main">
                {!submitted ? (
                    <>
                        <p className="question-text">{questions[step]}</p>
                        <div className="button-group">
                            <button
                                className={classNames("button", "yes-button")}
                                onClick={() => handleAnswer(true)}
                            >
                                Yes
                            </button>
                            <button
                                className={classNames("button", "no-button")}
                                onClick={() => handleAnswer(false)}
                            >
                                No
                            </button>
                        </div>
                    </>
                ) : (
                    <p className="question-text">SUCCESS! Your consultation is complete.</p>
                )}
                <div className="question-progress">Question {step+1}/{questions.length}</div>
                {history.length > 0 && (
                    <ConsultationHistory consultationHistory={answersHistory} onEdit={editAnswer} isSubmitted={submitted} />
                )}
            </main>

            <footer className="footer">
                <p>&copy; 2025 MedExpress. All rights reserved.</p>
                <p>Contact us: support@medexpress.genovia</p>
            </footer>
        </div>
    );
};

export default ConsultationForm;