// import { render, screen, fireEvent } from "@testing-library/react";
// import LoginForm from "@/components/LoginForm";

// describe("Auth Flow (e2e)", () => {
//   it("logs in with correct credentials", () => {
//     render(<LoginForm />);

//     fireEvent.change(screen.getByPlaceholderText(/email/i), {
//       target: { value: "test@example.com" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/password/i), {
//       target: { value: "secret" },
//     });
//     fireEvent.click(screen.getByRole("button", { name: /login/i }));

//     expect(screen.getByText(/welcome/i)).toBeInTheDocument();
//   });
// });
