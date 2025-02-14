import { render, screen, fireEvent } from "@testing-library/react";
import ConsultationForm from "./ConsultationForm";
import "@testing-library/jest-dom";

describe("ConsultationForm", () => {
    test("renders the first question", () => {
        render(<ConsultationForm />);
        expect(screen.getByText("Do you have a known allergy to Genovian Pears?")).toBeInTheDocument();
    });

    test("advances to the next question on answering", () => {
        render(<ConsultationForm />);
        fireEvent.click(screen.getByText("Yes"));
        expect(screen.getByText("Have you experienced an allergic reaction in the past 6 months?")).toBeInTheDocument();
    });

    test("displays 'SUCCESS' message after last question", () => {
        render(<ConsultationForm />);
        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getByText("Yes"));
        }
        expect(screen.getByText("SUCCESS! Your consultation is complete.")).toBeInTheDocument();
    });

    test("renders consultation history", () => {
        render(<ConsultationForm />);
        fireEvent.click(screen.getByText("Yes"));
        expect(screen.getByText("Consultation History")).toBeInTheDocument();
        expect(screen.getByText("Do you have a known allergy to Genovian Pears?: Yes")).toBeInTheDocument();
    });

    test("disables edit buttons after submission", () => {
        render(<ConsultationForm />);
        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getByText("Yes"));
        }
        expect(screen.getByText("SUCCESS! Your consultation is complete.")).toBeInTheDocument();
        const editButtons = screen.getAllByText("Edit");
        editButtons.forEach((button) => {
            expect(button).toBeDisabled();
        });
    });
});
