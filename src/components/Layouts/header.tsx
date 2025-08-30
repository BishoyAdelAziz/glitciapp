"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/app/(Profile)/services/api";
import { getFirstLetter } from "@/utils/functions";

interface Route {
  id: number;
  label: string;
  link: string;
}

const Routes: Route[] = [
  { id: 1, label: "overview", link: "/overview" },
  { id: 2, label: "projects", link: "/projects" },
  { id: 3, label: "clients", link: "/clients" },
  { id: 4, label: "employees", link: "/employees" },
  { id: 5, label: "Services", link: "/services" },
  { id: 6, label: "finance", link: "/finance" },
];

// Role ring colors
const getRingColor = (role: string) => {
  switch (role) {
    case "admin":
      return "ring-yellow-400"; // Gold
    case "moderator":
      return "ring-gray-400"; // Silver
    case "employee":
      return "ring-amber-700"; // Bronze
    default:
      return "ring-gray-300";
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useQuery({
    queryKey: ["my-profile"],
    queryFn: getMyProfile,
  });
  const userInfo = data?.data.data;

  // Color Mode - Initialize with undefined and update in useEffect
  const [isLight, setIsLight] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Only run on client side
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    setIsLight(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => setIsLight(event.matches);
    mediaQuery.addEventListener("change", handler);

    return () => {
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  // Close slider on outside click
  const sliderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Fixed header */}
      <header className="flex items-center justify-between md:justify-evenly bg-gray-100 dark:bg-zinc-800 px-4 py-1 shadow-md fixed w-full z-50 top-0 left-0">
        <div>
          <Link href="/" aria-label="Home">
            {isLight !== undefined && (
              <Image
                src={
                  isLight ? "/icons/Logo Black.png" : "/icons/Logo White.png"
                }
                width={100}
                height={100}
                alt="App Icon"
                priority
              />
            )}
          </Link>
        </div>
        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center justify-center space-x-9">
          {Routes.map((route) => (
            <Link
              key={route.id}
              href={route.link}
              className="capitalize relative text-md hover:border-b-2 hover:border-b-[#BE2726] border-spacing-y-4"
            >
              {route.label}
              <div className="w-4 h-4 rounded-full bg-[#BE2726] absolute -top-2 -right-4 flex items-center justify-center">
                <p className="text-center text-xs py-1 text-white  ">2</p>
              </div>
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Login button for desktop */}
          {!userInfo && (
            <Link
              href="/login"
              className="hidden sm:inline-block rounded-[30px] bg-[#BE2726] px-6 py-2 text-white"
            >
              Login
            </Link>
          )}

          {/* User circle for desktop */}
          {userInfo && (
            <div
              className={`hidden sm:flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white p-4 text-xl font-semibold text-[#BE2726] ring-4 ${getRingColor(
                userInfo.role
              )}`}
              title={`${userInfo.name} (${userInfo.role})`}
              aria-label="User profile"
              onClick={() => setIsOpen(true)}
            >
              {getFirstLetter(userInfo.name)}
            </div>
          )}

          {/* Burger icon for mobile */}
          <button
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="h-8 w-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Side slider on the right */}
      <aside
        ref={sliderRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out sm:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile menu"
      >
        {/* User card */}
        {userInfo && (
          <div className="flex items-center gap-4 border-b border-gray-200 p-4">
            <div
              className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white p-4 text-3xl font-semibold text-[#BE2726] ring-4 ${getRingColor(
                userInfo.role
              )}`}
              aria-label="User avatar"
            >
              {getFirstLetter(userInfo.name)}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-gray-900">
                {userInfo.email}
              </span>
              <span className="capitalize text-sm text-gray-600">
                {userInfo.role}
              </span>
            </div>
          </div>
        )}

        {/* Navigation links */}
        <nav className="flex flex-col gap-4 p-4">
          {Routes.map((route) => (
            <Link
              key={route.id}
              href={route.link}
              className="capitalize rounded px-3 py-2 text-gray-800 hover:bg-[#BE2726] hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              {route.label}
            </Link>
          ))}

          {/* Login button for mobile */}
          {!userInfo && (
            <Link
              href="/login"
              className="mt-4 rounded bg-[#BE2726] px-4 py-2 text-center text-white"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </nav>
      </aside>

      {/* Spacer to offset fixed header height */}
      <div className="h-20 sm:hidden"></div>
    </>
  );
}
