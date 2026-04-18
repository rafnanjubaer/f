import Link from "next/link";
import { Building2, User, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-6">
        <div className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">Smart Digital Hostel</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Welcome to Smart Digital Hostel Ecosystem
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            A comprehensive hostel management system designed to simplify room allocation, 
            payments, meal management, and community interaction for both tenants and administrators.
          </p>
        </div>

        {/* Portal Selection Cards */}
        <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {/* Tenant Portal Card */}
          <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Tenant Portal</CardTitle>
              <CardDescription className="text-base">
                Access your room details, pay rent, check meal menus, and connect with the community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  View room and rent information
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Make payments via bKash, Nagad, Rocket
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Check daily meal menus and buy tokens
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Submit complaints and join discussions
                </li>
              </ul>
              <Button asChild className="w-full group-hover:bg-primary/90">
                <Link href="/tenant">
                  Enter Tenant Portal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Admin Portal Card */}
          <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Admin Portal</CardTitle>
              <CardDescription className="text-base">
                Manage users, rooms, finances, meals, and handle tenant complaints efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  User verification and role management
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Room allocation and availability tracking
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Financial reports and transaction history
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Meal setup and complaint management
                </li>
              </ul>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/admin">
                  Enter Admin Portal
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Overview */}
        <div className="mx-auto mt-24 max-w-4xl">
          <h2 className="text-center text-2xl font-semibold">System Features</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Room Management", desc: "Floors, room types, and smart allocation" },
              { title: "Payment Gateway", desc: "bKash, Nagad, Rocket, Online & Offline" },
              { title: "Meal System", desc: "Daily menus and token management" },
              { title: "Complaint Handling", desc: "Submit, track, and resolve issues" },
              { title: "Community Board", desc: "Discussions and announcements" },
              { title: "Financial Reports", desc: "Track credits, debits, and history" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-card p-4 text-card-foreground"
              >
                <h3 className="font-medium">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Smart Digital Hostel Ecosystem. All rights reserved.</p>
          <p className="mt-1">Frontend Demo - Backend Integration Ready</p>
        </div>
      </footer>
    </div>
  );
}
