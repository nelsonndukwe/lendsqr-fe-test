import {
  handlePagination,
  getPaginationRange,
  formatGeneralDetails,
} from "@/helpers";
import { User } from "@/types";

const mockUser: User = {
  id: "1",
  fullName: "Test User",
  organization: "Irorun",
  dateJoined: "Jan 01, 2020",
  username: "testuser",
  password: "password",
  email: "test@example.com",
  phoneNumber: "08012345678",
  status: "Active",
  personalInformation: {
    fullName: "Test User",
    phoneNumber: "08012345678",
    emailAddress: "test@example.com",
    bvn: "12345678901",
    gender: "Male",
    maritalStatus: "Single",
    children: "1",
    typeOfResidence: "Owned Apartment",
  },
  educationAndEmployment: {
    levelOfEducation: "B.Sc",
    employmentStatus: "Employed",
    sectorOfEmployment: "Technology",
    durationOfEmployment: "2 years",
    officeEmail: "@lendsqr.com",
    monthlyIncome: { min: 100000, max: 200000 },
    loanRepayment: 15000,
  },
  socials: {
    twitter: "@test",
    facebook: "Test",
    instagram: "@test",
  },
  guarantors: [
    {
      fullName: "Guarantor One",
      phoneNumber: "08011111111",
      emailAddress: "g1@example.com",
      relationship: "Brother",
    },
  ],
};

describe("handlePagination", () => {
  const users = Array.from({ length: 25 }, (_, i) => ({
    ...mockUser,
    id: String(i),
    username: `user${i}`,
  }));

  describe("positive scenarios", () => {
    it("returns the first page when page=1 and limit=8", () => {
      const result = handlePagination(1, 8, users);
      expect(result).toHaveLength(8);
      expect(result[0].id).toBe("0");
      expect(result[7].id).toBe("7");
    });

    it("returns the second page when page=2 and limit=8", () => {
      const result = handlePagination(2, 8, users);
      expect(result).toHaveLength(8);
      expect(result[0].id).toBe("8");
      expect(result[7].id).toBe("15");
    });

    it("returns remaining items on last partial page", () => {
      const result = handlePagination(4, 8, users);
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("24");
    });

    it("returns empty array when page is beyond data", () => {
      const result = handlePagination(10, 8, users);
      expect(result).toHaveLength(0);
    });

    it("returns full list when limit is larger than array length", () => {
      const result = handlePagination(1, 100, users);
      expect(result).toHaveLength(25);
    });
  });

  describe("negative scenarios", () => {
    it("returns empty array when users array is empty", () => {
      const result = handlePagination(1, 8, []);
      expect(result).toHaveLength(0);
    });

    it("returns empty array when page is 0 (invalid)", () => {
      const result = handlePagination(0, 8, users);
      expect(result).toHaveLength(0);
    });

    it("returns empty array when limit is 0", () => {
      const result = handlePagination(1, 0, users);
      expect(result).toHaveLength(0);
    });
  });
});

describe("getPaginationRange", () => {
  describe("positive scenarios", () => {
    it("returns [1] when totalPages is 1", () => {
      const result = getPaginationRange(1, 1);
      expect(result).toEqual([1]);
    });

    it("returns [1, 2] when totalPages is 2", () => {
      const result = getPaginationRange(1, 2);
      expect(result).toContain(1);
      expect(result).toContain(2);
    });

    it("includes first page, current range, and last page for many pages", () => {
      const result = getPaginationRange(5, 10, 1);
      expect(result[0]).toBe(1);
      expect(result).toContain(5);
      expect(result[result.length - 1]).toBe(10);
    });

    it("includes ellipsis when range is large", () => {
      const result = getPaginationRange(5, 20, 1);
      expect(result).toContain("...");
    });

    it("respects sort asc (numbers in ascending order)", () => {
      const result = getPaginationRange(3, 5, 1, "asc");
      const numbers = result.filter((p): p is number => typeof p === "number");
      expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
    });
  });

  describe("negative scenarios", () => {
    it("handles currentPage 0 and totalPages 1", () => {
      const result = getPaginationRange(0, 1);
      expect(Array.isArray(result)).toBe(true);
    });

    it("handles totalPages 0", () => {
      const result = getPaginationRange(1, 0);
      expect(Array.isArray(result)).toBe(true);
    });
  });
});

describe("formatGeneralDetails", () => {
  describe("positive scenarios", () => {
    it("returns empty array when user is undefined", () => {
      const result = formatGeneralDetails(undefined);
      expect(result).toEqual([]);
    });

    it("returns 4 sections for a valid user", () => {
      const result = formatGeneralDetails(mockUser);
      expect(result).toHaveLength(4);
      expect(result[0].title).toBe("Personal Information");
      expect(result[1].title).toBe("Education and Employment");
      expect(result[2].title).toBe("Socials");
      expect(result[3].title).toBe("Guarantors");
    });

    it("formats personal information items correctly", () => {
      const result = formatGeneralDetails(mockUser);
      const personal = result[0];
      expect(personal.items).toContainEqual({
        label: "Full Name",
        value: "Test User",
      });
      expect(personal.items).toContainEqual({
        label: "BVN",
        value: "12345678901",
      });
    });

    it("formats monthly income as min - max string", () => {
      const result = formatGeneralDetails(mockUser);
      const education = result[1];
      const monthlyIncome = education.items.find(
        (i) => i.label === "Monthly Income"
      );
      expect(monthlyIncome?.value).toBe("100000 - 200000");
    });

    it("flattens guarantors into items", () => {
      const result = formatGeneralDetails(mockUser);
      const guarantors = result[3];
      expect(guarantors.items.length).toBeGreaterThan(0);
      expect(guarantors.items).toContainEqual({
        label: "Full Name",
        value: "Guarantor One",
      });
    });
  });

  describe("negative scenarios", () => {
    it("returns empty array when user is null (typed as undefined)", () => {
      const result = formatGeneralDetails(undefined);
      expect(result).toEqual([]);
    });
  });
});
