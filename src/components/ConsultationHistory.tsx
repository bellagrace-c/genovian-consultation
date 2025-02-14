import React from "react";
import classNames from "classnames";

interface ConsultationHistoryEntry {
    question: string;
    answer: boolean;
}

interface ConsultationHistoryProps {
    consultationHistory: ConsultationHistoryEntry[];
    onEdit: (index: number) => void;
    isSubmitted: boolean;
}

const ConsultationHistory: React.FC<ConsultationHistoryProps> = ({ consultationHistory, onEdit, isSubmitted }) => {
    return (
        <div className="history-container">
            <h3>Consultation History</h3>
            <ul>
                {consultationHistory.map((entry, index) => (
                    <li key={index}>
                        <span>{entry.question}: {entry.answer ? "Yes" : "No"}</span>
                        <button
                            className={classNames("edit-button", { "disabled": isSubmitted })}
                            onClick={() => onEdit(index)}
                            disabled={isSubmitted}
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ConsultationHistory;
