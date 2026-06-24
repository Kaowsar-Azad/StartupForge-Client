"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const founderLinks = [
  { href: "/dashboard/founder", label: "Overview" },
  { href: "/dashboard/founder/my-startup", label: "My Startup" },
  { href: "/dashboard/founder/add-opportunity", label: "Add Opportunity" },
  { href: "/dashboard/founder/manage-opportunities", label: "Manage Opportunities" },
  { href: "/dashboard/founder/applications", label: "Applications" },
];

const collaboratorLinks = [
  { href: "/dashboard/collaborator", label: "Overview" },
  { href: "/dashboard/collaborator/my-applications", label: "My Applications" },
  { href: "/dashboard/collaborator/profile", label: "Profile" },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview" },
  { href: "/dashboard/admin/users", label: "Manage Users" },
  { href: "/dashboard/admin/startups", label: "Manage Startups" },
  { href: "/dashboard/admin/transactions", label: "Transactions" },
];

export default function DashboardSidebar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const links =
    user?.role === "admin"
      ? adminLinks
      : user?.role === "founder"
      ? founderLinks
      : collaboratorLinks;

  return (
    <aside className="dashboard-sidebar">
      {/* TODO: Implement full sidebar UI */}
      <div className="sidebar-user">
        <img src={user?.image || "/default-avatar.png"} alt={user?.name} />
        <p>{user?.name}</p>
        <span className="badge">{user?.role}</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
