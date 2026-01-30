import { render, screen } from "@testing-library/react";
import Card from "@/app/components/Card/card";

describe("Card", () => {
  describe("positive scenarios", () => {
    it("renders label and count", () => {
      render(
        <Card icon="/icons/users.svg" label="Users" count={100} />
      );
      expect(screen.getByText("Users")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
    });

    it("formats large count with locale string", () => {
      render(
        <Card icon="/icons/users.svg" label="Active Users" count={12453} />
      );
      expect(screen.getByText("12,453")).toBeInTheDocument();
    });

    it("renders with zero count", () => {
      render(
        <Card icon="/icons/loans.svg" label="Loans" count={0} />
      );
      expect(screen.getByText("Loans")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("renders image with correct src and alt", () => {
      render(
        <Card icon="/icons/users.svg" label="Users" count={10} />
      );
      const img = screen.getByRole("img", { name: "icon" });
      expect(img).toHaveAttribute("src", expect.stringContaining("users.svg"));
    });
  });

  describe("negative scenarios", () => {
    it("does not render unrelated text", () => {
      render(
        <Card icon="/icons/users.svg" label="Users" count={5} />
      );
      expect(screen.queryByText("Guarantors")).not.toBeInTheDocument();
    });
  });
});
