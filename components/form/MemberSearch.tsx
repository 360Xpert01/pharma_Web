"use client";

import React, { useState } from "react";
import { Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button/button";

export interface SelectedMember {
  id: string;
  firstName: string;
  lastName: string;
  pulseCode: string;
  email: string;
  profilePicture?: string;
}

interface MemberSearchProps {
  allMembers: any[];
  selectedMembers: SelectedMember[];
  onMembersChange: (members: SelectedMember[]) => void;
  loading?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: string; // ✅ validation error
  onSearchChange?: (q: string) => void;
}

export default function MemberSearch({
  allMembers,
  selectedMembers,
  onMembersChange,
  loading = false,
  placeholder = "Search sales representative...",
  label = "Assign Members",
  className = "",
  error = "",
  onSearchChange,
}: MemberSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const hasError = !!error;

  const filteredMembers = allMembers.filter(
    (user) =>
      !selectedMembers.find((m) => m.id === user.id) &&
      (`${user.firstName || ""} ${user.lastName || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        (user.pulseCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.email || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectMember = (user: any) => {
    const newMember: SelectedMember = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      pulseCode: user.pulseCode,
      email: user.email,
      profilePicture: user.profilePicture,
    };

    if (!selectedMembers.find((m) => m.id === newMember.id)) {
      onMembersChange([...selectedMembers, newMember]);
    }

    setSearchQuery("");
    setShowSearchResults(false);
  };

  const handleRemoveMember = (memberId: string) => {
    onMembersChange(selectedMembers.filter((m) => m.id !== memberId));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div>
        {label && <h2 className="text-2xl font-bold text-(--gray-9) mb-4">{label}</h2>}

        {/* ✅ INPUT + ERROR WRAPPER */}
        <div className="max-w-md">
          {/* Input container */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
                onSearchChange?.(e.target.value);
              }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              placeholder={loading ? "Loading sales reps..." : placeholder}
              disabled={loading}
              aria-invalid={hasError}
              className={`w-full h-12 px-4 py-3 pl-12 rounded-8 outline-none text-(--gray-5)
                disabled:bg-(--gray-1) disabled:cursor-not-allowed
                border ${
                  hasError
                    ? "border-(--destructive) focus:ring-2 focus:ring-(--destructive) focus:border-(--destructive)"
                    : "border-(--gray-3) focus:ring-2 focus:ring-(--primary) focus:border-(--primary)"
                }`}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-(--gray-4)" />
          </div>

          {/* ✅ Error BELOW input (no layout break) */}
          {hasError && <p className="mt-1 t-sm t-err">{error}</p>}

          {/* Dropdown */}
          {showSearchResults && !loading && (
            <div className="relative">
              <div className="absolute z-10 w-full mt-2 bg-(--light) border border-(--gray-2) rounded-8 shadow-soft max-h-64 overflow-y-auto">
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleSelectMember(user)}
                      className="p-4 hover:bg-(--muted) cursor-pointer border-b border-(--gray-1) last:border-0 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-(--gray-9)">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-(--gray-5)">{user.pulseCode}</p>
                        </div>
                        <span className="px-2 py-1 bg-(--muted) text-(--primary) text-xs font-medium rounded-8">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-(--gray-5)">No sales reps found</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {selectedMembers.map((member) => (
              <div key={member.id} className="p-3 bg-(--gray-1) rounded-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-8 bg-(--gray-3) overflow-hidden flex-shrink-0">
                  {member.profilePicture ? (
                    <Image
                      src={member.profilePicture}
                      alt={`${member.firstName} ${member.lastName}`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-(--gray-5) font-bold text-sm">
                      {member.firstName?.charAt(0)}
                      {member.lastName?.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <p className="font-semibold text-(--gray-9) text-sm">
                    {member.firstName} {member.lastName}
                  </p>
                  <p className="text-xs text-(--gray-5)">{member.pulseCode}</p>
                </div>

                <Button
                  size="icon-sm"
                  variant="ghost"
                  onClick={() => handleRemoveMember(member.id)}
                  className="bg-(--destructive-0) text-(--destructive) hover:bg-(--destructive-1) ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
