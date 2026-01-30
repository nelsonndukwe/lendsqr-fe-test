import { getUsers } from "@/app/actions/sign-in";
import apiClient from "@/lib/api-client";
import { User } from "@/types";

jest.mock("@/lib/api-client");

const mockApiClient = apiClient as jest.Mocked<typeof apiClient>;

const mockUsers: User[] = [
  {
    id: "1",
    fullName: "Test User",
    organization: "Irorun",
    dateJoined: "Jan 01, 2020",
    username: "testuser",
    password: "pass",
    email: "test@example.com",
    phoneNumber: "08012345678",
    status: "Active",
    personalInformation: {
      fullName: "Test User",
      phoneNumber: "08012345678",
      emailAddress: "test@example.com",
      bvn: "123",
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
    socials: { twitter: "@t", facebook: "F", instagram: "@i" },
    guarantors: [],
  },
];

describe("getUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("positive scenarios", () => {
    it("returns users array when API responds successfully", async () => {
      mockApiClient.get.mockResolvedValueOnce({ data: mockUsers });

      const result = await getUsers();

      expect(mockApiClient.get).toHaveBeenCalledWith("/users");
      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe("test@example.com");
    });

    it("returns empty array when API returns empty data", async () => {
      mockApiClient.get.mockResolvedValueOnce({ data: [] });

      const result = await getUsers();

      expect(result).toEqual([]);
    });
  });

  describe("negative scenarios", () => {
    it("throws when API request fails", async () => {
      mockApiClient.get.mockRejectedValueOnce(new Error("Network error"));

      await expect(getUsers()).rejects.toThrow("Network error");
      expect(mockApiClient.get).toHaveBeenCalledWith("/users");
    });

    it("throws when API returns 401/403 (rejected by interceptor)", async () => {
      const err = Object.assign(new Error("Unauthorized"), {
        response: { status: 401 },
      });
      mockApiClient.get.mockRejectedValueOnce(err);

      await expect(getUsers()).rejects.toMatchObject({
        response: { status: 401 },
      });
    });
  });
});
