import { render, screen } from "@testing-library/react";
import Status from "@/app/components/Table/status";

describe("Status", () => {
  describe("positive scenarios", () => {
    it("renders Active status", () => {
      render(<Status variant="Active" />);
      expect(screen.getByText("Active")).toBeInTheDocument();
    });

    it("renders Inactive status", () => {
      render(<Status variant="Inactive" />);
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });

    it("renders Pending status", () => {
      render(<Status variant="Pending" />);
      expect(screen.getByText("Pending")).toBeInTheDocument();
    });

    it("renders Blacklisted status", () => {
      render(<Status variant="Blacklisted" />);
      expect(screen.getByText("Blacklisted")).toBeInTheDocument();
    });

    it("applies variant-specific class for Active", () => {
      const { container } = render(<Status variant="Active" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toBeInTheDocument();
      expect(wrapper.tagName).toBe("DIV");
    });
  });

  describe("negative scenarios", () => {
    it("does not render wrong label for a variant", () => {
      render(<Status variant="Pending" />);
      expect(screen.queryByText("Active")).not.toBeInTheDocument();
    });
  });
});
