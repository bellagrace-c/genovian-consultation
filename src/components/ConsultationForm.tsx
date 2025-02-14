import React, { useState } from "react";
import classNames from "classnames";
import "./ConsultationForm.scss";
import medexpress from "../assets/medexpress.png";
import {questions} from "../utils/consultationQuestions.ts";
import ConsultationHistory from "./ConsultationHistory.tsx";

const submitConsultation = (answers: Record<string, boolean>) => {
    console.log("Collected Consultation Data:", answers);
};

const ConsultationForm: React.FC = () => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);
    const [history, setHistory] = useState<{ question: string; answer: boolean }[]>([]);

    const handleAnswer = (answer: boolean) => {
        const newAnswers = { ...answers, [questions[step]]: answer };
        setAnswers(newAnswers);

        const updatedHistory = [...history];
        const existingIndex = updatedHistory.findIndex((entry) => entry.question === questions[step]);

        if (existingIndex !== -1) {
            updatedHistory[existingIndex] = { question: questions[step], answer };
        } else {
            updatedHistory.push({ question: questions[step], answer });
        }

        setHistory(updatedHistory);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            submitConsultation(newAnswers);
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
                {history.length > 0 && (
                    <ConsultationHistory consultationHistory={history} onEdit={editAnswer} isSubmitted={submitted} />
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
