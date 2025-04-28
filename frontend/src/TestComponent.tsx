// src/components/TestComponent.tsx
import React from "react";
import { User } from "@/types"; // This uses the alias from tsconfig.json

const TestComponent: React.FC = () => {
  const user: User = {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};

export default TestComponent;
