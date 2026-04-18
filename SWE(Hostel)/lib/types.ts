// Enums based on backend specifications

export enum UserRole {
  TENANT = "TENANT",
  ADMIN = "ADMIN",
}

export enum PaymentMethod {
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  ROCKET = "ROCKET",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

export enum DayOfWeek {
  SUNDAY = "SUNDAY",
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
}

export enum ComplaintStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
}

export enum TransactionType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TRIPLE = "TRIPLE",
  DORMITORY = "DORMITORY",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
}

// Interfaces

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
  createdAt: string;
  roomId?: string;
}

export interface Floor {
  id: string;
  name: string;
  floorNumber: number;
  description?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  floorId: string;
  floorName: string;
  roomType: RoomType;
  capacity: number;
  occupancy: number;
  rentAmount: number;
  status: RoomStatus;
  amenities: string[];
}

export interface RoomAllocation {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  roomNumber: string;
  allocatedAt: string;
  isActive: boolean;
}

export interface RentHistory {
  id: string;
  userId: string;
  roomId: string;
  amount: number;
  month: string;
  year: number;
  isPaid: boolean;
  paidAt?: string;
  paymentMethod?: PaymentMethod;
}

export interface Transaction {
  id: string;
  userId: string;
  userName: string;
  type: TransactionType;
  amount: number;
  description: string;
  paymentMethod: PaymentMethod;
  createdAt: string;
  reference?: string;
}

export interface MealTiming {
  id: string;
  mealType: MealType;
  startTime: string;
  endTime: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
}

export interface DailyMenu {
  id: string;
  dayOfWeek: DayOfWeek;
  mealType: MealType;
  items: MenuItem[];
  isActive: boolean;
}

export interface MealToken {
  id: string;
  userId: string;
  mealType: MealType;
  date: string;
  isUsed: boolean;
  purchasedAt: string;
  price: number;
}

export interface Complaint {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
}

export interface DiscussionPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  replies: DiscussionReply[];
}

export interface DiscussionReply {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface PaymentRequest {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  description: string;
  dueDate: string;
  isPaid: boolean;
  createdAt: string;
}
