import { render, screen } from "@testing-library/react";
import { DetailsSection } from "@/app/components/Tabs/detail-section";
import type { DetailSection as DetailSectionType } from "@/app/components/Tabs/detail-section";

describe("DetailsSection", () => {
  const sections: DetailSectionType[] = [
    {
      title: "Personal Information",
      items: [
        { label: "Full Name", value: "John Doe" },
        { label: "Email", value: "john@example.com" },
      ],
    },
    {
      title: "Education",
      items: [
        { label: "Level", value: "B.Sc" },
      ],
    },
  ];

  describe("positive scenarios", () => {
    it("renders all section titles", () => {
      render(<DetailsSection sections={sections} />);
      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Education")).toBeInTheDocument();
    });

    it("renders all item labels and values", () => {
      render(<DetailsSection sections={sections} />);
      expect(screen.getByText("Full Name")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Email")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("Level")).toBeInTheDocument();
      expect(screen.getByText("B.Sc")).toBeInTheDocument();
    });

    it("renders nothing when sections is empty", () => {
      const { container } = render(<DetailsSection sections={[]} />);
      expect(container.firstChild).toBeInTheDocument();
      expect(screen.queryByText("Personal Information")).not.toBeInTheDocument();
    });
  });

  describe("negative scenarios", () => {
    it("does not render section not in props", () => {
      render(<DetailsSection sections={sections} />);
      expect(screen.queryByText("Guarantors")).not.toBeInTheDocument();
    });

    it("handles section with empty items", () => {
      const withEmpty: DetailSectionType[] = [
        { title: "Empty Section", items: [] },
      ];
      render(<DetailsSection sections={withEmpty} />);
      expect(screen.getByText("Empty Section")).toBeInTheDocument();
    });
  });
});
