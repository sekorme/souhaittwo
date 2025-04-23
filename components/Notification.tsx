'use client'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar,Badge, User} from "@heroui/react";
import {Bell } from "lucide-react";

export default function Notification() {
    return (
        <div className="" data-aos={"fade-in"}>
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <div className={"bg-brand-100/20 p-1 rounded-full mt-2"}>
                      <Badge color="success" content="25">
                          <Bell color={"#00D748"} size={20}/>
                      </Badge>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">zoey@example.com</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                    <DropdownItem key="analytics">Analytics</DropdownItem>
                    <DropdownItem key="system">System</DropdownItem>
                    <DropdownItem key="configurations">Configurations</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger">
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

        </div>
    );
}
