import {
  User,
  UserRole,
  Floor,
  Room,
  RoomType,
  RoomStatus,
  RoomAllocation,
  RentHistory,
  Transaction,
  TransactionType,
  PaymentMethod,
  MealTiming,
  MealType,
  DailyMenu,
  DayOfWeek,
  MealToken,
  Complaint,
  ComplaintStatus,
  DiscussionPost,
  PaymentRequest,
} from "./types";

// Current logged in user (for demo purposes)
export const currentUser: User = {
  id: "user-001",
  name: "Rahim Ahmed",
  email: "rahim.ahmed@example.com",
  phone: "+880 1712-345678",
  role: UserRole.TENANT,
  isVerified: true,
  avatarUrl: "/placeholder-user.jpg",
  createdAt: "2024-01-15T10:00:00Z",
  roomId: "room-101",
};

// Mock Users
export const mockUsers: User[] = [
  currentUser,
  {
    id: "user-002",
    name: "Karim Hassan",
    email: "karim.hassan@example.com",
    phone: "+880 1812-456789",
    role: UserRole.TENANT,
    isVerified: true,
    avatarUrl: "/placeholder-user.jpg",
    createdAt: "2024-02-10T09:30:00Z",
    roomId: "room-102",
  },
  {
    id: "user-003",
    name: "Fatima Begum",
    email: "fatima.begum@example.com",
    phone: "+880 1912-567890",
    role: UserRole.TENANT,
    isVerified: false,
    createdAt: "2024-03-05T14:20:00Z",
  },
  {
    id: "user-004",
    name: "Abdul Jabbar",
    email: "abdul.jabbar@example.com",
    phone: "+880 1612-678901",
    role: UserRole.TENANT,
    isVerified: true,
    avatarUrl: "/placeholder-user.jpg",
    createdAt: "2024-01-20T11:45:00Z",
    roomId: "room-201",
  },
  {
    id: "user-005",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1512-789012",
    role: UserRole.TENANT,
    isVerified: true,
    createdAt: "2024-02-28T16:00:00Z",
    roomId: "room-202",
  },
  {
    id: "admin-001",
    name: "Mohammad Ali",
    email: "admin@hostel.com",
    phone: "+880 1712-111222",
    role: UserRole.ADMIN,
    isVerified: true,
    avatarUrl: "/placeholder-user.jpg",
    createdAt: "2023-06-01T08:00:00Z",
  },
  {
    id: "admin-002",
    name: "Ayesha Khan",
    email: "ayesha.admin@hostel.com",
    phone: "+880 1812-222333",
    role: UserRole.ADMIN,
    isVerified: true,
    createdAt: "2023-08-15T09:00:00Z",
  },
];

// Mock Floors
export const mockFloors: Floor[] = [
  { id: "floor-1", name: "Ground Floor", floorNumber: 0, description: "Reception and common areas" },
  { id: "floor-2", name: "First Floor", floorNumber: 1, description: "Single and double rooms" },
  { id: "floor-3", name: "Second Floor", floorNumber: 2, description: "Double and triple rooms" },
  { id: "floor-4", name: "Third Floor", floorNumber: 3, description: "Dormitory rooms" },
];

// Mock Rooms
export const mockRooms: Room[] = [
  {
    id: "room-101",
    roomNumber: "101",
    floorId: "floor-2",
    floorName: "First Floor",
    roomType: RoomType.SINGLE,
    capacity: 1,
    occupancy: 1,
    rentAmount: 8000,
    status: RoomStatus.OCCUPIED,
    amenities: ["WiFi", "AC", "Attached Bathroom"],
  },
  {
    id: "room-102",
    roomNumber: "102",
    floorId: "floor-2",
    floorName: "First Floor",
    roomType: RoomType.SINGLE,
    capacity: 1,
    occupancy: 1,
    rentAmount: 8000,
    status: RoomStatus.OCCUPIED,
    amenities: ["WiFi", "AC", "Attached Bathroom"],
  },
  {
    id: "room-103",
    roomNumber: "103",
    floorId: "floor-2",
    floorName: "First Floor",
    roomType: RoomType.DOUBLE,
    capacity: 2,
    occupancy: 0,
    rentAmount: 6000,
    status: RoomStatus.AVAILABLE,
    amenities: ["WiFi", "Fan", "Shared Bathroom"],
  },
  {
    id: "room-201",
    roomNumber: "201",
    floorId: "floor-3",
    floorName: "Second Floor",
    roomType: RoomType.DOUBLE,
    capacity: 2,
    occupancy: 1,
    rentAmount: 6000,
    status: RoomStatus.OCCUPIED,
    amenities: ["WiFi", "Fan", "Attached Bathroom"],
  },
  {
    id: "room-202",
    roomNumber: "202",
    floorId: "floor-3",
    floorName: "Second Floor",
    roomType: RoomType.TRIPLE,
    capacity: 3,
    occupancy: 1,
    rentAmount: 5000,
    status: RoomStatus.OCCUPIED,
    amenities: ["WiFi", "Fan", "Shared Bathroom"],
  },
  {
    id: "room-301",
    roomNumber: "301",
    floorId: "floor-4",
    floorName: "Third Floor",
    roomType: RoomType.DORMITORY,
    capacity: 6,
    occupancy: 4,
    rentAmount: 3500,
    status: RoomStatus.OCCUPIED,
    amenities: ["WiFi", "Fan", "Shared Bathroom", "Locker"],
  },
  {
    id: "room-302",
    roomNumber: "302",
    floorId: "floor-4",
    floorName: "Third Floor",
    roomType: RoomType.DORMITORY,
    capacity: 6,
    occupancy: 0,
    rentAmount: 3500,
    status: RoomStatus.MAINTENANCE,
    amenities: ["WiFi", "Fan", "Shared Bathroom", "Locker"],
  },
];

// Mock Room Allocations
export const mockRoomAllocations: RoomAllocation[] = [
  {
    id: "alloc-001",
    roomId: "room-101",
    userId: "user-001",
    userName: "Rahim Ahmed",
    roomNumber: "101",
    allocatedAt: "2024-01-15T10:00:00Z",
    isActive: true,
  },
  {
    id: "alloc-002",
    roomId: "room-102",
    userId: "user-002",
    userName: "Karim Hassan",
    roomNumber: "102",
    allocatedAt: "2024-02-10T09:30:00Z",
    isActive: true,
  },
  {
    id: "alloc-003",
    roomId: "room-201",
    userId: "user-004",
    userName: "Abdul Jabbar",
    roomNumber: "201",
    allocatedAt: "2024-01-20T11:45:00Z",
    isActive: true,
  },
  {
    id: "alloc-004",
    roomId: "room-202",
    userId: "user-005",
    userName: "Nusrat Jahan",
    roomNumber: "202",
    allocatedAt: "2024-02-28T16:00:00Z",
    isActive: true,
  },
];

// Mock Rent History
export const mockRentHistory: RentHistory[] = [
  {
    id: "rent-001",
    userId: "user-001",
    roomId: "room-101",
    amount: 8000,
    month: "January",
    year: 2024,
    isPaid: true,
    paidAt: "2024-01-05T10:00:00Z",
    paymentMethod: PaymentMethod.BKASH,
  },
  {
    id: "rent-002",
    userId: "user-001",
    roomId: "room-101",
    amount: 8000,
    month: "February",
    year: 2024,
    isPaid: true,
    paidAt: "2024-02-03T14:30:00Z",
    paymentMethod: PaymentMethod.NAGAD,
  },
  {
    id: "rent-003",
    userId: "user-001",
    roomId: "room-101",
    amount: 8000,
    month: "March",
    year: 2024,
    isPaid: true,
    paidAt: "2024-03-07T09:15:00Z",
    paymentMethod: PaymentMethod.ONLINE,
  },
  {
    id: "rent-004",
    userId: "user-001",
    roomId: "room-101",
    amount: 8000,
    month: "April",
    year: 2024,
    isPaid: false,
  },
];

// Mock Transactions
export const mockTransactions: Transaction[] = [
  {
    id: "txn-001",
    userId: "user-001",
    userName: "Rahim Ahmed",
    type: TransactionType.CREDIT,
    amount: 8000,
    description: "Room Rent - January 2024",
    paymentMethod: PaymentMethod.BKASH,
    createdAt: "2024-01-05T10:00:00Z",
    reference: "BKS123456789",
  },
  {
    id: "txn-002",
    userId: "user-001",
    userName: "Rahim Ahmed",
    type: TransactionType.CREDIT,
    amount: 8000,
    description: "Room Rent - February 2024",
    paymentMethod: PaymentMethod.NAGAD,
    createdAt: "2024-02-03T14:30:00Z",
    reference: "NGD987654321",
  },
  {
    id: "txn-003",
    userId: "user-002",
    userName: "Karim Hassan",
    type: TransactionType.CREDIT,
    amount: 8000,
    description: "Room Rent - February 2024",
    paymentMethod: PaymentMethod.ROCKET,
    createdAt: "2024-02-05T11:20:00Z",
    reference: "RKT456789123",
  },
  {
    id: "txn-004",
    userId: "user-001",
    userName: "Rahim Ahmed",
    type: TransactionType.CREDIT,
    amount: 500,
    description: "Meal Tokens - 10 Breakfast",
    paymentMethod: PaymentMethod.BKASH,
    createdAt: "2024-03-01T08:00:00Z",
    reference: "BKS111222333",
  },
  {
    id: "txn-005",
    userId: "user-004",
    userName: "Abdul Jabbar",
    type: TransactionType.CREDIT,
    amount: 6000,
    description: "Room Rent - March 2024",
    paymentMethod: PaymentMethod.ONLINE,
    createdAt: "2024-03-02T15:45:00Z",
    reference: "ONL789456123",
  },
  {
    id: "txn-006",
    userId: "admin-001",
    userName: "Mohammad Ali",
    type: TransactionType.DEBIT,
    amount: 15000,
    description: "Utility Bill Payment - March 2024",
    paymentMethod: PaymentMethod.ONLINE,
    createdAt: "2024-03-10T10:00:00Z",
    reference: "UTL456123789",
  },
];

// Mock Meal Timings
export const mockMealTimings: MealTiming[] = [
  { id: "timing-1", mealType: MealType.BREAKFAST, startTime: "07:00", endTime: "09:00" },
  { id: "timing-2", mealType: MealType.LUNCH, startTime: "12:30", endTime: "14:30" },
  { id: "timing-3", mealType: MealType.DINNER, startTime: "19:00", endTime: "21:00" },
];

// Mock Daily Menus
export const mockDailyMenus: DailyMenu[] = [
  {
    id: "menu-sun-breakfast",
    dayOfWeek: DayOfWeek.SUNDAY,
    mealType: MealType.BREAKFAST,
    items: [
      { id: "item-1", name: "Paratha", description: "Layered flatbread" },
      { id: "item-2", name: "Egg Curry", description: "Spiced egg curry" },
      { id: "item-3", name: "Tea", description: "Hot milk tea" },
    ],
    isActive: true,
  },
  {
    id: "menu-sun-lunch",
    dayOfWeek: DayOfWeek.SUNDAY,
    mealType: MealType.LUNCH,
    items: [
      { id: "item-4", name: "Rice", description: "Steamed basmati rice" },
      { id: "item-5", name: "Chicken Curry", description: "Traditional chicken curry" },
      { id: "item-6", name: "Dal", description: "Yellow lentil soup" },
      { id: "item-7", name: "Salad", description: "Fresh vegetable salad" },
    ],
    isActive: true,
  },
  {
    id: "menu-sun-dinner",
    dayOfWeek: DayOfWeek.SUNDAY,
    mealType: MealType.DINNER,
    items: [
      { id: "item-8", name: "Rice", description: "Steamed basmati rice" },
      { id: "item-9", name: "Fish Curry", description: "Bengali style fish curry" },
      { id: "item-10", name: "Vegetables", description: "Mixed vegetable stir fry" },
    ],
    isActive: true,
  },
  {
    id: "menu-mon-breakfast",
    dayOfWeek: DayOfWeek.MONDAY,
    mealType: MealType.BREAKFAST,
    items: [
      { id: "item-11", name: "Toast & Butter", description: "Toasted bread with butter" },
      { id: "item-12", name: "Omelette", description: "Vegetable omelette" },
      { id: "item-13", name: "Banana", description: "Fresh banana" },
    ],
    isActive: true,
  },
  {
    id: "menu-mon-lunch",
    dayOfWeek: DayOfWeek.MONDAY,
    mealType: MealType.LUNCH,
    items: [
      { id: "item-14", name: "Rice", description: "Steamed basmati rice" },
      { id: "item-15", name: "Beef Bhuna", description: "Slow-cooked spiced beef" },
      { id: "item-16", name: "Dal", description: "Red lentil soup" },
    ],
    isActive: true,
  },
  {
    id: "menu-mon-dinner",
    dayOfWeek: DayOfWeek.MONDAY,
    mealType: MealType.DINNER,
    items: [
      { id: "item-17", name: "Khichuri", description: "Rice and lentil porridge" },
      { id: "item-18", name: "Egg Bhaji", description: "Spiced scrambled eggs" },
      { id: "item-19", name: "Pickle", description: "Mango pickle" },
    ],
    isActive: true,
  },
  // Add more days as needed...
  {
    id: "menu-tue-breakfast",
    dayOfWeek: DayOfWeek.TUESDAY,
    mealType: MealType.BREAKFAST,
    items: [
      { id: "item-20", name: "Puri", description: "Deep-fried bread" },
      { id: "item-21", name: "Halwa", description: "Semolina pudding" },
      { id: "item-22", name: "Tea", description: "Hot milk tea" },
    ],
    isActive: true,
  },
  {
    id: "menu-tue-lunch",
    dayOfWeek: DayOfWeek.TUESDAY,
    mealType: MealType.LUNCH,
    items: [
      { id: "item-23", name: "Biryani", description: "Aromatic spiced rice with chicken" },
      { id: "item-24", name: "Raita", description: "Yogurt with cucumber" },
      { id: "item-25", name: "Salad", description: "Fresh vegetable salad" },
    ],
    isActive: true,
  },
];

// Mock Meal Tokens
export const mockMealTokens: MealToken[] = [
  {
    id: "token-001",
    userId: "user-001",
    mealType: MealType.BREAKFAST,
    date: "2024-03-15",
    isUsed: true,
    purchasedAt: "2024-03-01T08:00:00Z",
    price: 50,
  },
  {
    id: "token-002",
    userId: "user-001",
    mealType: MealType.LUNCH,
    date: "2024-03-15",
    isUsed: true,
    purchasedAt: "2024-03-01T08:00:00Z",
    price: 80,
  },
  {
    id: "token-003",
    userId: "user-001",
    mealType: MealType.DINNER,
    date: "2024-03-15",
    isUsed: false,
    purchasedAt: "2024-03-01T08:00:00Z",
    price: 80,
  },
  {
    id: "token-004",
    userId: "user-001",
    mealType: MealType.BREAKFAST,
    date: "2024-03-16",
    isUsed: false,
    purchasedAt: "2024-03-01T08:00:00Z",
    price: 50,
  },
  {
    id: "token-005",
    userId: "user-001",
    mealType: MealType.LUNCH,
    date: "2024-03-16",
    isUsed: false,
    purchasedAt: "2024-03-01T08:00:00Z",
    price: 80,
  },
];

// Mock Complaints
export const mockComplaints: Complaint[] = [
  {
    id: "complaint-001",
    userId: "user-001",
    userName: "Rahim Ahmed",
    title: "AC Not Working",
    description: "The air conditioner in Room 101 has stopped working since yesterday. It makes a strange noise but doesn't cool the room.",
    status: ComplaintStatus.IN_PROGRESS,
    createdAt: "2024-03-10T14:30:00Z",
    updatedAt: "2024-03-11T09:00:00Z",
    adminResponse: "We have scheduled a technician visit for tomorrow.",
  },
  {
    id: "complaint-002",
    userId: "user-002",
    userName: "Karim Hassan",
    title: "WiFi Connectivity Issues",
    description: "The WiFi signal is very weak in Room 102. I cannot attend my online classes properly.",
    status: ComplaintStatus.PENDING,
    createdAt: "2024-03-12T10:15:00Z",
    updatedAt: "2024-03-12T10:15:00Z",
  },
  {
    id: "complaint-003",
    userId: "user-004",
    userName: "Abdul Jabbar",
    title: "Water Leakage in Bathroom",
    description: "There is a water leakage from the ceiling of the bathroom in Room 201. It gets worse when someone uses the bathroom above.",
    status: ComplaintStatus.RESOLVED,
    createdAt: "2024-03-05T08:45:00Z",
    updatedAt: "2024-03-08T16:30:00Z",
    adminResponse: "The plumbing issue has been fixed. Please let us know if the problem persists.",
  },
  {
    id: "complaint-004",
    userId: "user-005",
    userName: "Nusrat Jahan",
    title: "Noisy Neighbors",
    description: "The residents in the adjacent room play loud music late at night, disturbing my sleep.",
    status: ComplaintStatus.REJECTED,
    createdAt: "2024-03-01T22:00:00Z",
    updatedAt: "2024-03-03T10:00:00Z",
    adminResponse: "We have spoken to the residents and they have agreed to keep the volume down after 10 PM.",
  },
];

// Mock Discussion Posts
export const mockDiscussionPosts: DiscussionPost[] = [
  {
    id: "post-001",
    userId: "user-001",
    userName: "Rahim Ahmed",
    userAvatar: "/placeholder-user.jpg",
    content: "Is anyone interested in forming a study group for the upcoming exams? We could use the common room on the ground floor.",
    createdAt: "2024-03-14T18:30:00Z",
    likes: 5,
    replies: [
      {
        id: "reply-001",
        userId: "user-002",
        userName: "Karim Hassan",
        userAvatar: "/placeholder-user.jpg",
        content: "I'm interested! What subjects are you focusing on?",
        createdAt: "2024-03-14T19:00:00Z",
      },
      {
        id: "reply-002",
        userId: "user-004",
        userName: "Abdul Jabbar",
        content: "Count me in too. How about we meet this Saturday at 4 PM?",
        createdAt: "2024-03-14T19:30:00Z",
      },
    ],
  },
  {
    id: "post-002",
    userId: "user-005",
    userName: "Nusrat Jahan",
    content: "The new meal menu for this week looks great! Really appreciate the variety. Thank you to the kitchen staff! 👏",
    createdAt: "2024-03-13T12:15:00Z",
    likes: 12,
    replies: [
      {
        id: "reply-003",
        userId: "user-001",
        userName: "Rahim Ahmed",
        userAvatar: "/placeholder-user.jpg",
        content: "Agreed! The biryani on Tuesday was amazing!",
        createdAt: "2024-03-13T13:00:00Z",
      },
    ],
  },
  {
    id: "post-003",
    userId: "user-002",
    userName: "Karim Hassan",
    userAvatar: "/placeholder-user.jpg",
    content: "Has anyone seen my blue umbrella? I think I left it in the common room yesterday evening.",
    createdAt: "2024-03-12T09:45:00Z",
    likes: 2,
    replies: [],
  },
];

// Mock Payment Requests
export const mockPaymentRequests: PaymentRequest[] = [
  {
    id: "req-001",
    userId: "user-001",
    userName: "Rahim Ahmed",
    amount: 8000,
    description: "Room Rent - April 2024",
    dueDate: "2024-04-05",
    isPaid: false,
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "req-002",
    userId: "user-002",
    userName: "Karim Hassan",
    amount: 8000,
    description: "Room Rent - April 2024",
    dueDate: "2024-04-05",
    isPaid: false,
    createdAt: "2024-03-25T10:00:00Z",
  },
  {
    id: "req-003",
    userId: "user-004",
    userName: "Abdul Jabbar",
    amount: 6000,
    description: "Room Rent - April 2024",
    dueDate: "2024-04-05",
    isPaid: false,
    createdAt: "2024-03-25T10:00:00Z",
  },
];

// Dashboard Statistics (for Admin)
export const adminDashboardStats = {
  totalUsers: mockUsers.filter((u) => u.role === UserRole.TENANT).length,
  verifiedUsers: mockUsers.filter((u) => u.role === UserRole.TENANT && u.isVerified).length,
  totalRooms: mockRooms.length,
  occupiedRooms: mockRooms.filter((r) => r.status === RoomStatus.OCCUPIED).length,
  availableRooms: mockRooms.filter((r) => r.status === RoomStatus.AVAILABLE).length,
  pendingComplaints: mockComplaints.filter((c) => c.status === ComplaintStatus.PENDING).length,
  totalRevenue: mockTransactions
    .filter((t) => t.type === TransactionType.CREDIT)
    .reduce((sum, t) => sum + t.amount, 0),
  totalExpenses: mockTransactions
    .filter((t) => t.type === TransactionType.DEBIT)
    .reduce((sum, t) => sum + t.amount, 0),
};

// Helper function to get current day's menu
export function getTodayMenu(): DailyMenu[] {
  const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const today = days[new Date().getDay()] as DayOfWeek;
  return mockDailyMenus.filter((menu) => menu.dayOfWeek === today);
}

// Helper function to get user's room
export function getUserRoom(userId: string): Room | undefined {
  const user = mockUsers.find((u) => u.id === userId);
  if (!user?.roomId) return undefined;
  return mockRooms.find((r) => r.id === user.roomId);
}

// Helper function to get rent due
export function getRentDue(userId: string): RentHistory | undefined {
  return mockRentHistory.find((r) => r.userId === userId && !r.isPaid);
}
