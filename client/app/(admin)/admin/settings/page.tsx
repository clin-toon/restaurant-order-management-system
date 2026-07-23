"use client";

import {
  Settings,
  User,
  Bell,
  Shield,
  ChevronRight,
  Camera,
  Store,
  Globe,
  Lock,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import { NAV_TABS } from "@/data/admin-data";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-stone-50">
        <h3 className="text-sm font-bold text-stone-900">{title}</h3>
        <p className="text-xs text-stone-400 mt-0.5">{description}</p>
      </div>
      <div className="divide-y divide-stone-50">{children}</div>
    </div>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 px-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-stone-800">{label}</p>
        {description && (
          <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

// ── Toggle switch (UI only) ────────────────────────────────────────────────────
function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  return (
    <div
      className={`w-9 h-5 rounded-full relative cursor-pointer ${defaultOn ? "bg-stone-900" : "bg-stone-200"}`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${defaultOn ? "left-4" : "left-0.5"}`}
      />
    </div>
  );
}

// ── Text input ─────────────────────────────────────────────────────────────────
function SettingInput({
  value,
  placeholder,
}: {
  value?: string;
  placeholder?: string;
}) {
  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      className="h-9 w-52 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition"
    />
  );
}

// ── Select ─────────────────────────────────────────────────────────────────────
function SettingSelect({
  options,
  defaultValue,
}: {
  options: string[];
  defaultValue?: string;
}) {
  return (
    <select
      defaultValue={defaultValue}
      className="h-9 w-44 px-3 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-700 outline-none focus:border-stone-400 focus:ring-2 focus:ring-stone-100 transition appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-stone-50 p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center">
            <Settings size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-stone-900 tracking-tight">
              Settings
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Manage your account and restaurant preferences
            </p>
          </div>
        </div>

        <div className="flex gap-6 items-start">
          {/* ── Right content ── */}
          <div className="flex-1 flex flex-col gap-5">
            {/* ── Profile ── */}
            <div id="profile">
              <Section
                title="Profile"
                description="Your personal account information"
              >
                {/* Avatar */}
                <div className="px-6 py-5 flex items-center gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-200">
                      <div className="w-full h-full bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center text-white text-xl font-black">
                        A
                      </div>
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-stone-900 rounded-full flex items-center justify-center shadow-md hover:bg-stone-700 transition-colors">
                      <Camera size={10} className="text-white" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      Admin User
                    </p>
                    <p className="text-xs text-stone-400">admin@eatly.com.np</p>
                    <button className="mt-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                      Change photo
                    </button>
                  </div>
                </div>

                <SettingRow label="Full Name">
                  <SettingInput value="Admin User" />
                </SettingRow>

                <SettingRow
                  label="Email Address"
                  description="Used for login and notifications"
                >
                  <SettingInput value="admin@eatly.com.np" />
                </SettingRow>

                <SettingRow label="Phone Number">
                  <SettingInput value="+977 98-41234567" />
                </SettingRow>

                <SettingRow label="Language">
                  <SettingSelect
                    options={["English", "Nepali"]}
                    defaultValue="English"
                  />
                </SettingRow>

                <div className="px-6 py-4 flex justify-end">
                  <button className="h-9 px-5 rounded-xl bg-stone-900 hover:bg-stone-700 text-white text-xs font-bold transition-colors">
                    Save Changes
                  </button>
                </div>
              </Section>
            </div>

            {/* ── Restaurant ── */}
            <div id="restaurant">
              <Section
                title="Restaurant"
                description="Details about your restaurant"
              >
                <SettingRow label="Restaurant Name">
                  <SettingInput value="Eatly" />
                </SettingRow>

                <SettingRow
                  label="Address"
                  description="Your physical location"
                >
                  <SettingInput value="Thamel, Kathmandu" />
                </SettingRow>

                <SettingRow label="Timezone">
                  <SettingSelect
                    options={["Asia/Kathmandu", "UTC", "Asia/Kolkata"]}
                    defaultValue="Asia/Kathmandu"
                  />
                </SettingRow>

                <SettingRow label="Currency">
                  <SettingSelect
                    options={["NPR (Rs)", "USD ($)", "INR (₹)"]}
                    defaultValue="NPR (Rs)"
                  />
                </SettingRow>

                <SettingRow
                  label="Restaurant Open"
                  description="Toggle to mark restaurant as open or closed"
                >
                  <Toggle defaultOn />
                </SettingRow>

                <SettingRow
                  label="Accept Online Orders"
                  description="Allow customers to place orders online"
                >
                  <Toggle defaultOn />
                </SettingRow>

                <div className="px-6 py-4 flex justify-end">
                  <button className="h-9 px-5 rounded-xl bg-stone-900 hover:bg-stone-700 text-white text-xs font-bold transition-colors">
                    Save Changes
                  </button>
                </div>
              </Section>
            </div>

            {/* ── Notifications ── */}
            <div id="notifications">
              <Section
                title="Notifications"
                description="Choose what you want to be notified about"
              >
                <SettingRow
                  label="New Orders"
                  description="Get notified when a new order arrives"
                >
                  <Toggle defaultOn />
                </SettingRow>

                <SettingRow
                  label="Order Status Updates"
                  description="Notify when order status changes"
                >
                  <Toggle defaultOn />
                </SettingRow>

                <SettingRow
                  label="New Customer Signup"
                  description="Alert when a new customer registers"
                >
                  <Toggle />
                </SettingRow>

                <SettingRow
                  label="Low Stock Alerts"
                  description="Notify when menu items are unavailable"
                >
                  <Toggle defaultOn />
                </SettingRow>

                <SettingRow
                  label="Weekly Summary"
                  description="Receive a weekly performance report"
                >
                  <Toggle />
                </SettingRow>

                <SettingRow label="Notification Sound">
                  <SettingSelect
                    options={["Default", "Chime", "Bell", "None"]}
                    defaultValue="Default"
                  />
                </SettingRow>
              </Section>
            </div>

            {/* ── Security ── */}
            <div id="security">
              <Section
                title="Security"
                description="Manage your account security settings"
              >
                <SettingRow
                  label="Change Password"
                  description="Update your login password"
                >
                  <button className="h-9 px-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 hover:border-stone-300 transition-colors flex items-center gap-2">
                    <Lock size={12} />
                    Update Password
                  </button>
                </SettingRow>

                <SettingRow
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-semibold text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
                      Not enabled
                    </span>
                    <button className="h-9 px-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors flex items-center gap-2">
                      <Smartphone size={12} />
                      Enable 2FA
                    </button>
                  </div>
                </SettingRow>

                <SettingRow
                  label="Active Sessions"
                  description="Logged in from 1 device"
                >
                  <button className="h-9 px-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors flex items-center gap-2">
                    <Globe size={12} />
                    View Sessions
                  </button>
                </SettingRow>

                <div className="px-6 py-4">
                  <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                    <div>
                      <p className="text-sm font-semibold text-red-700">
                        Danger Zone
                      </p>
                      <p className="text-xs text-red-400 mt-0.5">
                        Permanently delete your admin account
                      </p>
                    </div>
                    <button className="h-9 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
