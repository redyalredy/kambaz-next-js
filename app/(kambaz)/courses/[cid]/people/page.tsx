"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";

export default function PeoplePage() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams<{ cid: string }>();

  const fetchUsers = async () => {
    if (!cid) return;
    const users = await coursesClient.findUsersForCourse(cid);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>People</h3>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}