import { IconType } from "react-icons";
import {
  LuCalculator,
  LuCheck,
  LuFileText,
  LuGift,
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
  LuTerminal,
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
  MdOutlineRoomPreferences,
} from "react-icons/md";

interface SideMenuItem {
  label: string;
  icon: IconType;
  children?: (SideMenuItem & { href: string })[];
}

export const dashboardItems: SideMenuItem[] = [
  {
    label: "Account",
    icon: LuUser,
    children: [{ label: "Profile", icon: LuUserPlus, href: "" }],
  },
  {
    label: "Security",
    icon: LuShield,
    children: [
      { label: "Password", icon: MdOutlinePassword, href: "" },
      { label: "Devices", icon: MdDevices, href: "" },
    ],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Preferences", icon: MdOutlineRoomPreferences, href: "" },
      { label: "Terms", icon: LuFileText, href: "" },
      { label: "Conditions & Policies", icon: LuShield, href: "" },
    ],
  },
];

export const businessItems: SideMenuItem[] = [
  {
    label: "Customers",
    icon: LuUsers,
    children: [
      { label: "Customer List", icon: LuUsers, href: "" },
      { label: "Reviews", icon: LuStar, href: "" },
    ],
  },
  {
    label: "Products",
    icon: LuShoppingBag,
    children: [
      {
        label: "Add Product",
        icon: LuPlus,
        href: "/dashboard/business/products/new",
      },
      {
        label: "Inventory",
        icon: LuPackage,
        href: "/dashboard/business/products",
      },
      {
        label: "Categories",
        icon: LuList,
        href: "/dashboard/business/product-categories",
      },
      {
        label: "Sizes",
        icon: LuRuler,
        href: "/dashboard/business/product-sizes",
      },
    ],
  },
  {
    label: "Vendors",
    icon: LuStore,
    children: [
      { label: "Vendor List", icon: LuUsers, href: "" },
      { label: "Vendor Inventory", icon: LuPackage, href: "" },
      { label: "Vendor Sales", icon: LuFileText, href: "" },
    ],
  },
  {
    label: "Partners",
    icon: LuHandshake,
    children: [
      { label: "Partners List", icon: LuUsers, href: "" },
      { label: "Partners Sales", icon: LuFileText, href: "" },
    ],
  },

  {
    label: "Finance",
    icon: LuLandmark,
    children: [
      { label: "Sales Record", icon: LuFileText, href: "" },
      { label: "Staff Salary", icon: LuWallet, href: "" },
      { label: "Expenses", icon: LuTrendingDown, href: "" },
      { label: "Revenue", icon: LuTrendingUp, href: "" },
      { label: "Tax Calculation", icon: LuCalculator, href: "" },
    ],
  },
  {
    label: "Dispute Resolution",
    icon: LuScale,
    children: [
      { label: "Customers Chats", icon: LuMessageSquare, href: "" },
      { label: "Products exchange", icon: LuRefreshCw, href: "" },
      { label: "Customers Refund", icon: LuUndo, href: "" },
      { label: "Sales Reconciliation", icon: LuCheck, href: "" },
    ],
  },
  {
    label: "Marketing & Promos",
    icon: LuTicketPercent,
    children: [
      { label: "Promotions", icon: LuMegaphone, href: "" },
      { label: "Pop up", icon: LuLayoutGrid, href: "" },
      { label: "Promo Banners", icon: LuImage, href: "" },
      { label: "Hero Banner", icon: LuImage, href: "" },
    ],
  },
  {
    label: "Loyalty & Rewards",
    icon: LuGift,
    children: [
      { label: "Loyalty", icon: LuHeart, href: "" },
      { label: "Vouchers", icon: LuTicket, href: "" },
      { label: "Set Coupon", icon: LuTag, href: "" },
    ],
  },
  {
    label: "Staff",
    icon: LuUserPlus,
    children: [{ label: "Staff List", icon: LuUser, href: "" }],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Logistics", icon: LuTruck, href: "" },
      { label: "VAT", icon: LuPercent, href: "" },
      { label: "Terms", icon: LuFileText, href: "" },
      { label: "Conditions & Policies", icon: LuShield, href: "" },
      { label: "UI config", icon: LuPalette, href: "" },
    ],
  },
];

export const storeItems: SideMenuItem[] = [
  {
    label: "Point of Sale",
    icon: LuScanLine,
    children: [{ label: "POS", icon: LuTerminal, href: "" }],
  },
  {
    label: "Finance",
    icon: LuLandmark,
    children: [
      { label: "Sales Record", icon: LuFileText, href: "" },
      { label: "Staff Salary", icon: LuWallet, href: "" },
      { label: "Expenses", icon: LuTrendingDown, href: "" },
      { label: "Revenue", icon: LuTrendingUp, href: "" },
      { label: "Tax Calculation", icon: LuCalculator, href: "" },
    ],
  },
  {
    label: "Staff",
    icon: LuUserPlus,
    children: [{ label: "Staff List", icon: LuUser, href: "" }],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Logistics", icon: LuTruck, href: "" },
      { label: "VAT", icon: LuPercent, href: "" },
      { label: "Terms", icon: LuFileText, href: "" },
      { label: "Conditions & Policies", icon: LuShield, href: "" },
      { label: "UI config", icon: LuPalette, href: "" },
    ],
  },
];
