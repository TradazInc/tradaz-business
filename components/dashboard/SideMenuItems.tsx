import React from "react";
import { AiOutlineAccountBook } from "react-icons/ai";
import {
  LuCalculator,
  LuCheck,
  LuFileText,
  LuHandshake,
  LuHeart,
  LuImage,
  LuLandmark,
  LuLayoutGrid,
  LuList,
  LuMegaphone,
  LuMessageSquare,
  LuPackage,
  LuPalette,
  LuPercent,
  LuPlus,
  LuRefreshCw,
  LuRuler,
  LuScale,
  LuScanLine,
  LuSettings,
  LuShield,
  LuShoppingBag,
  LuStar,
  LuStore,
  LuTag,
  LuTicket,
  LuTicketPercent,
  LuTrendingDown,
  LuTrendingUp,
  LuTruck,
  LuUndo,
  LuUser,
  LuUserPlus,
  LuUsers,
  LuWallet,
} from "react-icons/lu";
import {
  MdDevices,
  MdOutlinePassword,
  MdOutlinePointOfSale,
  MdOutlineRoomPreferences,
  MdOutlineShoppingCartCheckout,
} from "react-icons/md";

interface SideMenuItem {
  label: string;
  icon: React.ReactNode;
  children?: (SideMenuItem & { path: string })[];
}

export const dashboardItems: SideMenuItem[] = [
  {
    label: "Account & Security",
    icon: <LuUser />,
    children: [
      { label: "Profile", icon: <LuUserPlus />, path: "" },
      { label: "Password", icon: <MdOutlinePassword />, path: "" },
      { label: "Active Devices", icon: <MdDevices />, path: "" },
    ],
  },
  {
    label: "Preferences & Legal",
    icon: <LuSettings />,
    children: [
      {
        label: "App Preferences",
        icon: <MdOutlineRoomPreferences />,
        path: "",
      },
      { label: "Terms of Service", icon: <LuFileText />, path: "" },
      { label: "Privacy Policies", icon: <LuShield />, path: "" },
    ],
  },
];

export const businessItems: SideMenuItem[] = [
  {
    label: "Catalog & Inventory",
    icon: <LuShoppingBag />,
    children: [
      { label: "Add Product", icon: <LuPlus />, path: "/products/new" },
      { label: "Store Inventory", icon: <LuPackage />, path: "/products" },
      { label: "Vendor Inventory", icon: <LuStore />, path: "" },
      { label: "Categories", icon: <LuList />, path: "/product-categories" },
      { label: "Sizes", icon: <LuRuler />, path: "/product-sizes" },
    ],
  },
  {
    label: "Directory & CRM",
    icon: <LuUsers />,
    children: [
      { label: "Customers", icon: <LuUsers />, path: "/customers" },
      { label: "Customer Reviews", icon: <LuStar />, path: "" },
      { label: "Vendors", icon: <LuStore />, path: "/vendors" },
      { label: "Partners", icon: <LuHandshake />, path: "/partners" },
      { label: "Staff Members", icon: <LuUser />, path: "/staff" },
    ],
  },
  {
    label: "Finance & Sales",
    icon: <LuLandmark />,
    children: [
      { label: "Sales Record", icon: <LuFileText />, path: "/sales-record" },
      { label: "Vendor Sales", icon: <LuStore />, path: "" },
      { label: "Partner Sales", icon: <LuHandshake />, path: "" },
      { label: "Revenue", icon: <LuTrendingUp />, path: "/revenue" },
      { label: "Expenses", icon: <LuTrendingDown />, path: "/expenses" },
      { label: "Staff Payroll", icon: <LuWallet />, path: "" },
      { label: "Tax Calculations", icon: <LuCalculator />, path: "" },
      {
        label: "Subaccounts",
        icon: <AiOutlineAccountBook />,
        path: "/subaccounts",
      },
    ],
  },
  {
    label: "Support & Disputes",
    icon: <LuScale />,
    children: [
      { label: "Customer Chats", icon: <LuMessageSquare />, path: "" },
      { label: "Product Exchanges", icon: <LuRefreshCw />, path: "" },
      { label: "Refund Requests", icon: <LuUndo />, path: "" },
      { label: "Sales Reconciliation", icon: <LuCheck />, path: "" },
    ],
  },
  {
    label: "Marketing & Engagement",
    icon: <LuMegaphone />,
    children: [
      { label: "Promotional Campaigns", icon: <LuTicketPercent />, path: "" },
      { label: "Loyalty Points", icon: <LuHeart />, path: "/loyalty-points" },
      { label: "Discount Coupons", icon: <LuTag />, path: "/coupons" },
      { label: "Gift Vouchers", icon: <LuTicket />, path: "" },
      { label: "Promo Banners", icon: <LuImage />, path: "" },
      { label: "Hero Banner", icon: <LuImage />, path: "" },
      { label: "Pop-up Modals", icon: <LuLayoutGrid />, path: "" },
    ],
  },
  {
    label: "Configuration",
    icon: <LuSettings />,
    children: [
      { label: "Logistics & Shipping", icon: <LuTruck />, path: "" },
      { label: "VAT Settings", icon: <LuPercent />, path: "" },
      { label: "UI Configuration", icon: <LuPalette />, path: "" },
      { label: "Terms", icon: <LuFileText />, path: "" },
      { label: "Conditions & Policies", icon: <LuShield />, path: "" },
    ],
  },
];

export const storeItems: SideMenuItem[] = [
  {
    label: "Point of Sale",
    icon: <LuScanLine />,
    children: [
      {
        label: "Terminal (POS)",
        icon: <MdOutlinePointOfSale />,
        path: "/point-of-sale",
      },
      {
        label: "Active Carts",
        icon: <MdOutlineShoppingCartCheckout />,
        path: "/carts",
      },
    ],
  },
  {
    label: "Operations & Finance",
    icon: <LuLandmark />,
    children: [
      { label: "Sales Record", icon: <LuFileText />, path: "/sales-record" },
      { label: "Revenue", icon: <LuTrendingUp />, path: "" },
      { label: "Expenses", icon: <LuTrendingDown />, path: "" },
      { label: "Staff Payroll", icon: <LuWallet />, path: "" },
      { label: "Tax Breakdown", icon: <LuCalculator />, path: "" },
    ],
  },
  {
    label: "Store Administration",
    icon: <LuSettings />,
    children: [
      { label: "Staff Members", icon: <LuUserPlus />, path: "/staff" },
      { label: "Logistics & Shipping", icon: <LuTruck />, path: "" },
      { label: "VAT Settings", icon: <LuPercent />, path: "" },
      { label: "UI Configuration", icon: <LuPalette />, path: "" },
      { label: "Terms", icon: <LuFileText />, path: "" },
      { label: "Conditions & Policies", icon: <LuShield />, path: "" },
    ],
  },
];
