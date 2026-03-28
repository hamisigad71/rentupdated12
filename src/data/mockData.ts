// Ported mock data from source
export interface Building {
  id: string;
  name: string;
  address: string;
  units: number;
  occupiedUnits: number;
  yearBuilt: number;
  image: string;
  description?: string;
  amenities?: string[];
}

// ... (rest of the interfaces from source)
export interface Unit { id: string; buildingId: string; number: string; type: string; rent: number; status: "vacant" | "occupied"; tenantId?: string; floor: number; }
export interface Tenant { id: string; name: string; email: string; phone: string; idNumber: string; unitId: string; roomNumber?: string; moveInDate: string; rent: number; paidAmount: number; arrears: number; status: "active" | "inactive"; }
export interface Payment { id: string; tenantId: string; tenantName: string; unitId: string; amount: number; date: string; status: "completed" | "pending" | "overdue"; month: string; }
export interface Complaint { id: string; tenantId: string; tenantName: string; unitId: string; title: string; description: string; category: string; status: "pending" | "in-progress" | "resolved"; createdDate: string; priority: "low" | "medium" | "high"; }

export const mockBuildings: Building[] = [
  {
    id: "bld-001",
    name: "Sunrise Apartments",
    address: "123 Main Street, Downtown",
    units: 24,
    occupiedUnits: 20,
    yearBuilt: 2015,
    image: "https://www.themoonapartments.com/wp-content/uploads/2024/06/Furnished-Apartment-Building-The-Moon-Serenity-Furnished-Apartments-Lymack-Suites-Fourways-Junction-Estate-Northern-Bypass-Road.webp",
    amenities: ["High Speed Fiber", "24/7 Security", "Gym & Pool"],
  },
  {
    id: "bld-002",
    name: "Green Gardens Complex",
    address: "456 Park Avenue, Midtown",
    units: 32,
    occupiedUnits: 28,
    yearBuilt: 2018,
    image: "https://q-xx.bstatic.com/xdata/images/hotel/1280x964/324133368.webp?k=e5255c83d7a3d78b1a1092361df6816cd702fab12ac75e62babfe92ff8708ddf&o=",
    amenities: ["Backup Generator", "Solar Water"],
  },
];

export const mockUnits: Unit[] = [
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `unit-${(i + 1).toString().padStart(3, '0')}`,
    buildingId: i < 5 ? "bld-001" : "bld-002",
    number: `A${(i + 1)}`,
    type: "2BR Apartment",
    rent: 20000 + (i * 1000),
    status: i % 3 === 0 ? "vacant" : "occupied",
    floor: Math.floor(i / 3) + 1,
  }))
] as any;

export const mockTenants: Tenant[] = [
  { id: "tenant-001", name: "John Doe", email: "john@example.com", phone: "0712345678", idNumber: "12345678", unitId: "unit-001", moveInDate: "2024-01-10", rent: 20000, paidAmount: 20000, arrears: 0, status: "active" },
  { id: "tenant-002", name: "Jane Smith", email: "jane@example.com", phone: "0722345678", idNumber: "22345678", unitId: "unit-002", moveInDate: "2024-01-15", rent: 21000, paidAmount: 15000, arrears: 6000, status: "active" },
  { id: "tenant-003", name: "Alice Johnson", email: "alice@example.com", phone: "0732345678", idNumber: "32345678", unitId: "unit-003", moveInDate: "2024-02-01", rent: 22000, paidAmount: 0, arrears: 22000, status: "active" },
  { id: "tenant-004", name: "Michael Brown", email: "michael@example.com", phone: "0742345678", idNumber: "42345678", unitId: "unit-004", moveInDate: "2023-11-20", rent: 18000, paidAmount: 18000, arrears: 0, status: "active" },
  { id: "tenant-005", name: "Sarah Wilson", email: "sarah@example.com", phone: "0752345678", idNumber: "52345678", unitId: "unit-005", moveInDate: "2023-12-05", rent: 19500, paidAmount: 19500, arrears: 0, status: "active" },
  { id: "tenant-006", name: "David Miller", email: "david@example.com", phone: "0762345678", idNumber: "62345678", unitId: "unit-006", moveInDate: "2024-03-01", rent: 25000, paidAmount: 25000, arrears: 0, status: "active" },
];

export const mockPayments: Payment[] = [
  { id: "pay-001", tenantId: "tenant-001", tenantName: "John Doe", unitId: "unit-001", amount: 20000, date: "2024-02-01", status: "completed", month: "February 2024" },
  { id: "pay-002", tenantId: "tenant-002", tenantName: "Jane Smith", unitId: "unit-002", amount: 15000, date: "2024-02-02", status: "completed", month: "February 2024" },
  { id: "pay-003", tenantId: "tenant-004", tenantName: "Michael Brown", unitId: "unit-004", amount: 18000, date: "2024-02-01", status: "completed", month: "February 2024" },
  { id: "pay-004", tenantId: "tenant-005", tenantName: "Sarah Wilson", unitId: "unit-005", amount: 19500, date: "2024-02-03", status: "completed", month: "February 2024" },
  { id: "pay-005", tenantId: "tenant-001", tenantName: "John Doe", unitId: "unit-001", amount: 20000, date: "2024-01-01", status: "completed", month: "January 2024" },
  { id: "pay-006", tenantId: "tenant-002", tenantName: "Jane Smith", unitId: "unit-002", amount: 21000, date: "2024-01-02", status: "completed", month: "January 2024" },
];

export const mockComplaints: Complaint[] = [
  { id: "comp-001", tenantId: "tenant-001", tenantName: "John Doe", unitId: "unit-001", title: "Leaky Faucet", description: "The kitchen faucet is leaking.", category: "Plumbing", status: "resolved", createdDate: "2024-02-08", priority: "medium" },
  { id: "comp-002", tenantId: "tenant-002", tenantName: "Jane Smith", unitId: "unit-002", title: "Broken Light", description: "The living room light fixture is broken.", category: "Electrical", status: "in-progress", createdDate: "2024-03-10", priority: "low" },
  { id: "comp-003", tenantId: "tenant-003", tenantName: "Alice Johnson", unitId: "unit-003", title: "AC Not Working", description: "The air conditioning unit is not blowing cold air.", category: "HVAC", status: "pending", createdDate: "2024-03-15", priority: "high" },
];

export const revenueHistory = [
  { month: "Oct 23", revenue: 850000, target: 800000 },
  { month: "Nov 23", revenue: 920000, target: 800000 },
  { month: "Dec 23", revenue: 980000, target: 900000 },
  { month: "Jan 24", revenue: 1100000, target: 950000 },
  { month: "Feb 24", revenue: 1250000, target: 1000000 },
  { month: "Mar 24", revenue: 1320000, target: 1100000 },
];

export const occupancyTrends = [
  { name: "Sunrise Apts", occupied: 20, vacant: 4 },
  { name: "Green Gardens", occupied: 28, vacant: 4 },
  { name: "Skyline Towers", occupied: 45, vacant: 5 },
  { name: "Park View", occupied: 12, vacant: 3 },
];

export const getLandlordStats = () => {
  return {
    totalBuildings: 12,
    totalUnits: 126,
    occupiedUnits: 112,
    vacantUnits: 14,
    monthlyIncome: 1250000,
    tenantsInArrears: 5,
    totalArrears: 68000,
    activeComplaints: 8,
  };
};
