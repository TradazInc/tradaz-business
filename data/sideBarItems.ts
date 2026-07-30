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
  children?: (SideMenuItem & { path: string })[];
}

export const dashboardItems: SideMenuItem[] = [
  {
    label: "Account",
    icon: LuUser,
    children: [{ label: "Profile", icon: LuUserPlus, path: "" }],
  },
  {
    label: "Security",
    icon: LuShield,
    children: [
      { label: "Password", icon: MdOutlinePassword, path: "" },
      { label: "Devices", icon: MdDevices, path: "" },
    ],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Preferences", icon: MdOutlineRoomPreferences, path: "" },
      { label: "Terms", icon: LuFileText, path: "" },
      { label: "Conditions & Policies", icon: LuShield, path: "" },
    ],
  },
];

export const businessItems: SideMenuItem[] = [
  {
    label: "Customers",
    icon: LuUsers,
    children: [
      { label: "Customer List", icon: LuUsers, path: "" },
      { label: "Reviews", icon: LuStar, path: "" },
    ],
  },
  {
    label: "Products",
    icon: LuShoppingBag,
    children: [
      {
        label: "Add Product",
        icon: LuPlus,
        path: "/products/new",
      },
      {
        label: "Inventory",
        icon: LuPackage,
        path: "/products",
      },
      {
        label: "Categories",
        icon: LuList,
        path: "/product-categories",
      },
      {
        label: "Sizes",
        icon: LuRuler,
        path: "/product-sizes",
      },
    ],
  },
  {
    label: "Vendors",
    icon: LuStore,
    children: [
      { label: "Vendor List", icon: LuUsers, path: "" },
      { label: "Vendor Inventory", icon: LuPackage, path: "" },
      { label: "Vendor Sales", icon: LuFileText, path: "" },
    ],
  },
  {
    label: "Partners",
    icon: LuHandshake,
    children: [
      { label: "Partners List", icon: LuUsers, path: "" },
      { label: "Partners Sales", icon: LuFileText, path: "" },
    ],
  },

  {
    label: "Finance",
    icon: LuLandmark,
    children: [
      { label: "Sales Record", icon: LuFileText, path: "" },
      { label: "Staff Salary", icon: LuWallet, path: "" },
      { label: "Expenses", icon: LuTrendingDown, path: "" },
      { label: "Revenue", icon: LuTrendingUp, path: "" },
      { label: "Tax Calculation", icon: LuCalculator, path: "" },
    ],
  },
  {
    label: "Dispute Resolution",
    icon: LuScale,
    children: [
      { label: "Customers Chats", icon: LuMessageSquare, path: "" },
      { label: "Products exchange", icon: LuRefreshCw, path: "" },
      { label: "Customers Refund", icon: LuUndo, path: "" },
      { label: "Sales Reconciliation", icon: LuCheck, path: "" },
    ],
  },
  {
    label: "Marketing & Promos",
    icon: LuTicketPercent,
    children: [
      { label: "Promotions", icon: LuMegaphone, path: "" },
      { label: "Pop up", icon: LuLayoutGrid, path: "" },
      { label: "Promo Banners", icon: LuImage, path: "" },
      { label: "Hero Banner", icon: LuImage, path: "" },
    ],
  },
  {
    label: "Loyalty & Rewards",
    icon: LuGift,
    children: [
      { label: "Loyalty", icon: LuHeart, path: "" },
      { label: "Vouchers", icon: LuTicket, path: "" },
      { label: "Set Coupon", icon: LuTag, path: "" },
    ],
  },
  {
    label: "Staff",
    icon: LuUserPlus,
    children: [{ label: "Staff List", icon: LuUser, path: "" }],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Logistics", icon: LuTruck, path: "" },
      { label: "VAT", icon: LuPercent, path: "" },
      { label: "Terms", icon: LuFileText, path: "" },
      { label: "Conditions & Policies", icon: LuShield, path: "" },
      { label: "UI config", icon: LuPalette, path: "" },
    ],
  },
];

export const storeItems: SideMenuItem[] = [
  {
    label: "Point of Sale",
    icon: LuScanLine,
    children: [{ label: "POS", icon: LuTerminal, path: "" }],
  },
  {
    label: "Finance",
    icon: LuLandmark,
    children: [
      { label: "Sales Record", icon: LuFileText, path: "" },
      { label: "Staff Salary", icon: LuWallet, path: "" },
      { label: "Expenses", icon: LuTrendingDown, path: "" },
      { label: "Revenue", icon: LuTrendingUp, path: "" },
      { label: "Tax Calculation", icon: LuCalculator, path: "" },
    ],
  },
  {
    label: "Staff",
    icon: LuUserPlus,
    children: [{ label: "Staff List", icon: LuUser, path: "" }],
  },
  {
    label: "Settings",
    icon: LuSettings,
    children: [
      { label: "Logistics", icon: LuTruck, path: "" },
      { label: "VAT", icon: LuPercent, path: "" },
      { label: "Terms", icon: LuFileText, path: "" },
      { label: "Conditions & Policies", icon: LuShield, path: "" },
      { label: "UI config", icon: LuPalette, path: "" },
    ],
  },
];
