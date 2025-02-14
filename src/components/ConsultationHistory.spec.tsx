import { render, screen, fireEvent } from "@testing-library/react";
import ConsultationHistory from "./ConsultationHistory";

const mockHistory = [
    { question: "Do you have a known allergy to Genovian Pears?", answer: true },
    { question: "Have you experienced an allergic reaction in the past 6 months?", answer: false },
];

describe("ConsultationHistory", () => {
    test("renders history items correctly", () => {
        render(<ConsultationHistory consultationHistory={mockHistory} onEdit={jest.fn()} isSubmitted={false} />);

        expect(screen.getByText("Consultation History")).toBeInTheDocument();
        expect(screen.getByText("Do you have a known allergy to Genovian Pears?: Yes")).toBeInTheDocument();
        expect(screen.getByText("Have you experienced an allergic reaction in the past 6 months?: No")).toBeInTheDocument();
    });

    test("calls onEdit when edit button is clicked", () => {
        const onEditMock = jest.fn();
        render(<ConsultationHistory consultationHistory={mockHistory} onEdit={onEditMock} isSubmitted={false} />);

        fireEvent.click(screen.getAllByText("Edit")[0]);
        expect(onEditMock).toHaveBeenCalledWith(0);
    });

    test("disables edit buttons when consultation is submitted", () => {
        render(<ConsultationHistory consultationHistory={mockHistory} onEdit={jest.fn()} isSubmitted={true} />);

        const editButtons = screen.getAllByText("Edit");
        editButtons.forEach((button) => {
            expect(button).toBeDisabled();
        });
    });
});
